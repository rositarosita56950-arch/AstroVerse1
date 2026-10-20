import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI client with standard User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback curated astrology knowledge answers if offline/no key
const FALLBACK_ASTROLOGY_ANSWERS: Record<string, string> = {
  mercury: `Merkurius (Mercury) dalam astrologi melambangkan cara kita berpikir, berkomunikasi, memproses informasi, dan belajar. Saat Merkurius berada di elemen Udara (Gemini, Libra, Aquarius), komunikasi cenderung cepat dan logis. Di elemen Air (Cancer, Scorpio, Pisces), pemikiran lebih intuitif dan empatik. Di elemen Api (Aries, Leo, Sagitarius), ide-ide muncul spontan dan bersemangat. Di elemen Tanah (Taurus, Virgo, Capricorn), cara berpikir praktis, terstruktur, dan realistis.`,
  sun_moon_rising: `Tiga Pilar Utama (The Big Three) dalam Birth Chart:
1. Sun Sign (Matahari): Esensi inti diri, ego sadar, tujuan hidup, dan bagaimana kamu memancarkan energimu.
2. Moon Sign (Bulan): Dunia batin emosional, insting bawah sadar, kebutuhan rasa aman, dan bagaimana kamu memproses perasaan terdalam.
3. Ascendant / Rising Sign: "Pintu gerbang" atau kesan pertama yang kamu tampilkan ke dunia luar, serta cara pandangmu menghadapi lingkungan baru.`,
  houses: `12 Rumah Astrologi (Houses) merepresentasikan 12 panggung kehidupan:
- Rumah 1: Identitas diri & penampilan fisik.
- Rumah 2: Finansial, nilai pribadi, dan kepemilikan.
- Rumah 3: Komunikasi, saudara, dan lingkungan sekitar.
- Rumah 4: Rumah, keluarga batin, dan akar fondasi.
- Rumah 5: Kreativitas, asmara, kegembiraan, dan ekspresi.
- Rumah 6: Rutinitas harian, kesehatan, dan dedikasi kerja.
- Rumah 7: Kemitraan, pernikahan, dan hubungan relasi 1-on-1.
- Rumah 8: Transformasi, misteri, dan investasi bersama.
- Rumah 9: Filsafat, pendidikan tinggi, petualangan, & perjalanan jauh.
- Rumah 10: Karir, reputasi sosial, dan pencapaian puncak.
- Rumah 11: Pertemanan, komunitas, visi masa depan, dan impian kolektif.
- Rumah 12: Spiritualitas, alam bawah sadar, penyembuhan, dan isolasi positif.`,
  elements: `Empat Elemen Kosmik:
🔥 Api (Aries, Leo, Sagitarius): Gairah, keberanian, spontanitas, dan dorongan bertindak.
🌍 Tanah (Taurus, Virgo, Capricorn): Stabilitas, ketekunan, pragmatisme, dan perwujudan nyata.
💨 Udara (Gemini, Libra, Aquarius): Intelektual, sosial, ide inovatif, dan objektivitas.
💧 Air (Cancer, Scorpio, Pisces): Emosi, intuisi mendalam, empati, dan kepekaan seni.`,
  moon_phase: `Fase Bulan memiliki pengaruh simbolik dalam refleksi diri:
- New Moon (Bulan Baru): Waktu menanam niat, memulai babak baru, dan bermeditasi.
- Waxing Moon (Bulan Membesar): Fase aksi, membangun momentum, dan menyerap pembelajaran baru.
- Full Moon (Bulan Purnama): Puncak energi, iluminasi wawasan batin, dan saat bersyukur atau merayakan hasil.
- Waning Moon (Bulan Mengecil): Waktu melepaskan beban pikiran, detoks emosi, dan istirahat pemulihan.`,
};

// AI Astrology Guide Endpoint
app.post('/api/gemini/astrology-guide', async (req, res) => {
  try {
    const { prompt, userZodiac, userBirthData, topic } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      // Graceful rich fallback
      const lower = prompt.toLowerCase();
      let fallbackText = '';
      if (lower.includes('merkurius') || lower.includes('mercury') || lower.includes('komunikasi')) {
        fallbackText = FALLBACK_ASTROLOGY_ANSWERS.mercury;
      } else if (lower.includes('big three') || lower.includes('sun') || lower.includes('moon') || lower.includes('rising') || lower.includes('ascendant')) {
        fallbackText = FALLBACK_ASTROLOGY_ANSWERS.sun_moon_rising;
      } else if (lower.includes('rumah') || lower.includes('house')) {
        fallbackText = FALLBACK_ASTROLOGY_ANSWERS.houses;
      } else if (lower.includes('elemen') || lower.includes('api') || lower.includes('air') || lower.includes('tanah') || lower.includes('udara')) {
        fallbackText = FALLBACK_ASTROLOGY_ANSWERS.elements;
      } else if (lower.includes('bulan') || lower.includes('moon') || lower.includes('purnama')) {
        fallbackText = FALLBACK_ASTROLOGY_ANSWERS.moon_phase;
      } else {
        fallbackText = `Salam kosmik! Mengenai "${prompt}": Dalam kacamata astrologi modern, energi planet dan zodiak bekerja sebagai cermin simbolis dari psikologi manusia. ` +
          (userZodiac ? `Bagi kamu dengan energi zodiak ${userZodiac}, ` : '') +
          `ini adalah momen yang tepat untuk menyelaraskan niat dengan tindakan nyata. Fokuslah pada pengembangan potensi diri, menjaga keseimbangan emosi, dan tetap berpegang pada akal sehat. Ingatlah bahwa bintang menginspirasi, namun kamulah kapten dari takdirmu sendiri. ✨`;
      }

      return res.json({
        reply: fallbackText,
        source: 'curated_cosmic_guide',
      });
    }

    const systemInstruction = `Kamu adalah "Aura", pemandu astrologi virtual cerdas dari aplikasi AstroVerse — Explore Your Cosmic Story.
Bahasa: Bahasa Indonesia yang hangat, bersahabat, estetik, cerdas, dan mudah dipahami.
Prinsip utama:
1. Jelaskan simbolisme astrologi secara mendidik, psikologis, dan memberdayakan (empowering).
2. Tegaskan bahwa astrologi adalah tradisi simbolis dan sarana refleksi diri/hiburan, bukan ramalan mutlak atau pengganti keputusan medis/finansial/psikologis profesional.
3. Jika pengguna menyebut zodiak atau data kelahiran mereka, berikan sentuhan relevan yang hangat.
4. Jaga respon tetap padat, menarik, menggunakan paragraf ringkas atau poin-poin yang mudah dibaca di ponsel.`;

    const userContextStr = userZodiac
      ? `\nContext Pengguna: Zodiak=${userZodiac}, ${userBirthData ? `Lahir=${userBirthData.birthDate || ''} di ${userBirthData.birthCity || ''}` : ''}`
      : '';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${prompt}${userContextStr}${topic ? ` (Topik: ${topic})` : ''}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Maaf, energi kosmik sedang tenang saat ini. Silakan tanyakan hal lain seputar astrologi!';

    return res.json({
      reply,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error generating astrology response:', error);
    return res.status(200).json({
      reply: 'Bintang-bintang menyampaikan pesan refleksi: Luangkan waktu sejenak untuk mendengarkan intuisimu hari ini. Setiap tantangan adalah gerbang pembelajaran batinmu. ✨',
      source: 'fallback_error',
    });
  }
});

// Setup Vite or static serving
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ AstroVerse Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
