import { DailyHoroscope } from '../types';

// Curated daily readings generator with date variations (today, yesterday, tomorrow)
export function getDailyHoroscope(zodiacId: string, dayOffset: number = 0): DailyHoroscope {
  const seed = (zodiacId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + dayOffset * 17) % 100;

  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const dateStr = date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const READINGS_BY_SIGN: Record<string, {
    mood: string;
    keywords: string[];
    friendship: string;
    career: string;
    finance: string;
    advice: string;
    luckyTime: string;
    cosmicColor: string;
  }> = {
    aries: {
      mood: 'Semangat membara dan penuh gairah untuk menyelesaikan hal yang tertunda. Ada dorongan kuat untuk mengambil inisiatif mandiri.',
      keywords: ['Bersemangat', 'Tegas', 'Inisiatif'],
      friendship: 'Teman-teman mengagumi kejujuranmu hari ini. Luangkan waktu untuk ngobrol santai tanpa memaksakan agenda pribadi.',
      career: 'Fokusmu sangat tajam di paruh pertama hari. Waktu yang tepat untuk mengajukan usulan baru atau memulai tugas yang paling menantang.',
      finance: 'Hindari pembelian impulsif karena keinginan sesaat. Evaluasi kebutuhan esensial sebelum bertransaksi secara online.',
      advice: 'Tarik napas dalam sebelum merespons pesan yang memancing emosi. Keberanian sejati terletak pada ketenangan batin.',
      luckyTime: '09:30 - 11:15 WIB',
      cosmicColor: 'Merah Koral',
    },
    taurus: {
      mood: 'Ketenangan batin yang mantap. Kamu merasa lebih nyaman berada di lingkungan yang familiar, rapi, dan menenangkan.',
      keywords: ['Tenang', 'Konsisten', 'Grounded'],
      friendship: 'Percakapan dari hati ke hati dengan sahabat lama membawa rasa hangat dan memulihkan energi emosionalmu.',
      career: 'Keahlianmu menyusun langkah bertahap sangat dihargai rekan tim. Pekerjaan detail dapat terselesaikan dengan rapi.',
      finance: 'Kondisi finansial berada di jalur aman. Rencana menabung atau investasi yang telah kamu mulai memperlihatkan progres stabil.',
      advice: 'Nikmati secangkir minuman hangat dan jangan terburu-buru. Kecepatan terbaik adalah langkah yang konsisten.',
      luckyTime: '14:00 - 15:45 WIB',
      cosmicColor: 'Hijau Sage',
    },
    gemini: {
      mood: 'Rasa ingin tahu yang menggelitik dan pikiran yang lincah melompat antar ide-ide segar. Hari yang menyenangkan untuk berdiskusi.',
      keywords: ['Inspiratif', 'Cepat', 'Komunikatif'],
      friendship: 'Kamu menjadi pencair suasana dalam grup pertemanan. Pesan jenaka atau meme yang kamu bagikan sukses menghibur sahabat.',
      career: 'Bagus untuk brainstorming, menulis ide presentasi, dan riset informasi baru. Tetapkan satu prioritas agar tidak terdistraksi.',
      finance: 'Ada peluang kecil untuk menambah wawasan literasi finansial. Pelajari cara mengelola pos pengeluaran harian.',
      advice: 'Tuliskan ide-ide cemerlangmu ke dalam catatan sebelum menguap. Satu ide yang dieksekusi lebih berharga daripada sepuluh ide di angan.',
      luckyTime: '10:00 - 12:00 WIB',
      cosmicColor: 'Kuning Amber',
    },
    cancer: {
      mood: 'Intuisimu sangat peka hari ini. Kamu mampu merasakan atmosfer perasaan orang terdekat bahkan sebelum mereka berbicara.',
      keywords: ['Intuitif', 'Peka', 'Hangat'],
      friendship: 'Seseorang mungkin membutuhkan telinga yang mau mendengarkan tanpa menghakimi. Kehangatan empatimu menjadi penyejuk hati mereka.',
      career: 'Lingkungan kerja yang suportif membuat produktivitasmu melonjak. Percayai kata hatimu saat mengambil keputusan kreatif.',
      finance: 'Gunakan kebijaksanaan dalam alokasi anggaran rumah tangga atau kebutuhan pribadi. Tahan godaan belanja hiburan berlebih.',
      advice: 'Luangkan waktu untuk merawat diri sendiri (self-care). Kamu tidak bisa menuangkan air dari teko yang sedang kosong.',
      luckyTime: '18:30 - 20:00 WIB',
      cosmicColor: 'Putih Perak',
    },
    leo: {
      mood: 'Penuh optimisme dan percaya diri. Energimu seperti cahaya matahari yang menularkan kegembiraan kepada orang-orang di sekitarmu.',
      keywords: ['Bercahaya', 'Karisma', 'Optimis'],
      friendship: 'Waktu yang tepat untuk mengumpulkan teman-teman dalam suasana akrab. Kemurahan hatimu membuat lingkaran sosialmu kian solid.',
      career: 'Panggung kreativitas terbuka lebar. Jangan ragu mempresentasikan hasil karyamu; apresiasi positif siap menyambutmu.',
      finance: 'Ada peluang rezeki tak terduga atau apresiasi atas kerja kerasmu. Tetap sisihkan sebagian untuk cadangan darurat.',
      advice: 'Jadilah pemimpin yang mengangkat orang lain bersama-sama. Kilau sejati terpancar saat kamu membantu orang lain bersinar.',
      luckyTime: '13:00 - 14:30 WIB',
      cosmicColor: 'Emas Surya',
    },
    virgo: {
      mood: 'Pikiran terstruktur dan jernih. Kamu menikmati proses merapikan sesuatu yang berantakan menjadi sistematis dan efisien.',
      keywords: ['Produktif', 'Rapi', 'Fokus'],
      friendship: 'Bantuan praktis yang kamu berikan kepada sahabat sangat bermakna. Mereka menghargai ketulusan dan perhatian detailmu.',
      career: 'Efisiensi kerja berada di titik tertinggi. Tugas analisis data, pemeriksaan dokumen, atau penyusunan jadwal berjalan mulus.',
      finance: 'Perhitungan anggaranmu sangat cermat. Momen tepat untuk mengecek langganan digital yang sudah tidak terpakai.',
      advice: 'Ingatlah bahwa "cukup baik" seringkali sudah lebih dari sempurna. Lepaskan ekspektasi perfeksionisme yang membebani pundakmu.',
      luckyTime: '08:00 - 09:45 WIB',
      cosmicColor: 'Navy Indah',
    },
    libra: {
      mood: 'Mendambakan kedamaian dan estetika. Kamu tergerak untuk mempercantik ruang kerjamu atau mendengarkan musik yang menenangkan.',
      keywords: ['Harmonis', 'Estetik', 'Diplomatis'],
      friendship: 'Kamu menjadi penengah yang adil dalam sebuah perbedaan pendapat antar teman. Kebijaksanaanmu menyejukkan situasi.',
      career: 'Kolaborasi tim berjalan sangat lancar. Kemampuan negosiasi dan diplomasi santunmu membuahkan kesepakatan yang menguntungkan.',
      finance: 'Timbang baik-baik sebelum membeli barang dekoratif atau fesyen. Pastikan kegunaannya sebanding dengan nilainya.',
      advice: 'Dengarkan suara hatimu sendiri sebelum mencari persetujuan dari orang lain. Keputusan terbaik lahir dari ketenangan pribadimu.',
      luckyTime: '16:00 - 17:30 WIB',
      cosmicColor: 'Pink Mawar',
    },
    scorpio: {
      mood: 'Intens, mendalam, dan fokus tinggi. Kamu enggan membuang energi untuk hal-hal dangkal dan lebih suka menuntaskan hal penting.',
      keywords: ['Mendalam', 'Magnetis', 'Fokus'],
      friendship: 'Pertemanan sejati diuji oleh kesetiaan, dan kamu membuktikannya hari ini. Rahasia yang dipercayakan padamu terjaga aman.',
      career: 'Daya analisis riset dan pemecahan masalah rumit sangat tajam. Masalah yang membingungkan orang lain dapat kamu selesaikan.',
      finance: 'Pikiran strategis membantumu melihat peluang investasi atau pengelolaan tabungan jangka panjang dengan bijak.',
      advice: 'Lepaskan beban masa lalu yang tak lagi berguna bagimu. Transformasi indah dimulai saat kamu berani melepaskan genggaman lama.',
      luckyTime: '20:00 - 22:00 WIB',
      cosmicColor: 'Merah Marun',
    },
    sagittarius: {
      mood: 'Bebas, bersemangat petualang, dan penuh tawa. Ada dorongan kuat untuk mempelajari hal baru atau merencanakan perjalanan.',
      keywords: ['Petualang', 'Bebas', 'Optimis'],
      friendship: 'Keceriaanmu mengundang senyum teman-teman. Cerita menarik yang kamu bagikan membuka diskusi seru penuh inspirasi.',
      career: 'Bagus untuk proyek lintas disiplin, belajar bahasa asing, atau mengembangkan wawasan baru. Jangan abaikan aturan main dasarnya.',
      finance: 'Keuangan relatif stabil, namun hindari bersikap terlalu longgar dalam pengeluaran hobi atau rekreasi.',
      advice: 'Nikmati proses perjalanan, bukan hanya tujuan akhirnya. Setiap momen hari ini membawa pelajaran hidup berharga.',
      luckyTime: '11:00 - 13:00 WIB',
      cosmicColor: 'Ungu Dirgantara',
    },
    capricorn: {
      mood: 'Disiplin, tenang, dan memiliki komitmen tinggi terhadap tujuan jangka panjang yang sudah dirancang sebelumnya.',
      keywords: ['Tangguh', 'Disiplin', 'Terarah'],
      friendship: 'Sahabat melihatmu sebagai pilar kekuatan yang kokoh. Kata-kata nasehat realistismu sangat membantu teman yang sedang galau.',
      career: 'Ketekunanmu membuahkan hasil nyata. Langkah-langkah strategis yang kamu ambil semakin mendekatkanmu pada pencapaian penting.',
      finance: 'Kondisi finansial terkontrol dengan baik berkat kedisiplinan anggaran. Pertahankan prinsip belanja sadar (mindful spending).',
      advice: 'Jangan lupa untuk beristirahat dan memberi selamat pada dirimu sendiri atas seberapa jauh kamu telah berjuang.',
      luckyTime: '07:30 - 09:00 WIB',
      cosmicColor: 'Abu-Abu Arang',
    },
    aquarius: {
      mood: 'Visioner dan penuh inspirasi unik. Kamu memandang segala sesuatu dari sudut pandang segar yang jarang terpikirkan orang lain.',
      keywords: ['Visioner', 'Inovatif', 'Orisinal'],
      friendship: 'Kamu terdorong menghubungkan diri dengan komunitas atau teman yang memiliki visi masa depan dan kepedulian sosial serupa.',
      career: 'Waktu yang sangat baik untuk inovasi teknologi, otomatisasi pekerjaan, atau memecahkan sistem kerja yang sudah usang.',
      finance: 'Pertimbangkan untuk mengeksplorasi instrumen keuangan modern dengan tetap mempelajari risikonya secara objektif.',
      advice: 'Pertahankan keunikan caramu berpikir. Dunia membutuhkan sudut pandang otentik yang berani melangkah berbeda.',
      luckyTime: '15:00 - 16:45 WIB',
      cosmicColor: 'Biru Neon',
    },
    pisces: {
      mood: 'Imajinatif, puitis, dan penuh kelembutan hati. Seni, musik, atau tulisan reflektif menjadi pelabuhan ternyaman untuk jiwamu.',
      keywords: ['Puitis', 'Empatis', 'Imajinatif'],
      friendship: 'Kehadiranmu menghadirkan ketenangan bagi siapa pun yang bersamamu. Sikap pemaafmu mempererat ikatan persahabatan.',
      career: 'Proyek seni, desain visual, penulisan narasi, atau tugas sosial kemanusiaan mendapatkan sentuhan magis dari imajinasimu.',
      finance: 'Tetap rasional dalam mengambil keputusan keuangan. Jangan biarkan rasa sungkan membuatmu meminjamkan uang di luar batas kemampuan.',
      advice: 'Beri batasan yang sehat untuk energimu. Menjaga kedamaian batin sendiri adalah langkah awal untuk membantu semesta.',
      luckyTime: '21:00 - 22:30 WIB',
      cosmicColor: 'Hijau Laut (Seafoam)',
    },
  };

  const reading = READINGS_BY_SIGN[zodiacId.toLowerCase()] || READINGS_BY_SIGN.aries;

  // Pseudo-random but consistent scores based on seed
  const focus = 70 + (seed * 3) % 28;
  const intuition = 68 + ((seed + 15) * 5) % 30;
  const creativity = 72 + ((seed + 30) * 7) % 26;
  const social = 65 + ((seed + 45) * 4) % 32;

  return {
    zodiacId,
    dateStr,
    mood: reading.mood,
    moodKeywords: reading.keywords,
    friendshipAndSocial: reading.friendship,
    educationAndCareer: reading.career,
    finances: reading.finance,
    positiveAdvice: reading.advice,
    energyScores: {
      focus,
      intuition,
      creativity,
      social,
    },
    luckyTime: reading.luckyTime,
    cosmicColor: reading.cosmicColor,
  };
}
