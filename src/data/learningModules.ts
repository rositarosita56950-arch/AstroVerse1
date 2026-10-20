import { LearningChapter } from '../types';

export const LEARNING_MODULES: LearningChapter[] = [
  {
    id: 'ch1',
    title: '1. Pengertian & Sejarah Ringkas Astrologi',
    subtitle: 'Bahasa simbolis tertua peradaban manusia untuk memahami ritme alam',
    readTime: '4 menit baca',
    sections: [
      {
        heading: 'Apa Sebenarnya Astrologi Itu?',
        content: 'Astrologi adalah sistem pemaknaan simbolis tertua di dunia yang mengamati korelasi antara pergerakan benda-benda langit dengan siklus psikologis, peristiwa, dan ritme alam di Bumi. Kata astrologi berasal dari bahasa Yunani "astron" (bintang) dan "logos" (ilmu atau wacana). Astrologi tidak beranggapan bahwa planet secara fisik menembakkan sinar yang mengendalikan manusia, melainkan bekerja seperti jam kosmik — penunjuk waktu yang mencerminkan fase-fase kesadaran kita.',
        bulletPoints: [
          'Berawal lebih dari 4.000 tahun lalu di Mesopotamia Kuno dan Babilonia.',
          'Dikembangkan secara sistematis di Alexandria, Mesir pada era Helenistik (karya Claudius Ptolemy).',
          'Dalam psikologi modern oleh Carl Gustav Jung, astrologi diakui sebagai kumpulan arketipe psikologis bawah sadar manusia.',
        ],
        cosmicTip: 'Ingat prinsip hermetis kuno: "As above, so below; as within, so without" — apa yang terjadi di angkasa adalah cerminan dari apa yang terjadi di dalam batin manusia.',
      },
      {
        heading: 'Astrologi dalam Perspektif Modern',
        content: 'Di era kontemporer, astrologi dipelajari sebagai alat refleksi diri (self-reflection), eksplorasi kepribadian, dan seni bercerita kosmik (cosmic storytelling). Astrologi modern menolak fatalisme atau vonis takdir kaku; setiap individu memiliki kehendak bebas (free will) dan kesadaran untuk memilih bagaimana mengekspresikan potensi dirinya.',
      },
    ],
    quickQuiz: {
      question: 'Psikolog terkenal manakah yang memandang simbol astrologi sebagai arketipe bawah sadar manusia?',
      options: ['Sigmund Freud', 'Carl Gustav Jung', 'B.F. Skinner', 'Ivan Pavlov'],
      correctIndex: 1,
      feedback: 'Tepat sekali! Carl Jung banyak meneliti sinkronisitas dan simbol astrologi sebagai representasi arketipe jiwa manusia.',
    },
  },
  {
    id: 'ch2',
    title: '2. Perbedaan Krusial: Astrologi vs Astronomi',
    subtitle: 'Menjaga kejernihan antara sains empiris dan bahasa simbolis tradisi',
    readTime: '5 menit baca',
    sections: [
      {
        heading: 'Sains Empiris vs Bahasa Simbolis Filosofis',
        content: 'Penting bagi setiap penjelajah semesta untuk memahami batas jelas antara Astronomi dan Astrologi agar tidak terjadi salah kaprah. Astronomi adalah cabang sains alam murni berbasis metode ilmiah empiris, pengukuran fisika, matematika, teleskopik, dan verifikasi eksperimental.',
        bulletPoints: [
          'Astronomi: Meneliti massa planet, komposisi kimia bintang, gravitasi, jarak tahun cahaya, lubang hitam, dan evolusi galaksi.',
          'Astrologi: Sistem pemaknaan simbolis dan tradisi budaya yang mengartikan metafora benda langit untuk eksplorasi psikologis dan makna kehidupan manusia.',
          'Pemisahan Sejarah: Hingga abad ke-17 (era Kepler dan Galileo), keduanya pernah berjalan berdampingan sebelum akhirnya terpisah secara tegas di era Revolusi Ilmiah.',
        ],
        cosmicTip: 'AstroVerse selalu menyajikan fakta ilmiah astronomi secara akurat terpisah dari interpretasi simbolik astrologi demi kejujuran intelektual.',
      },
    ],
    quickQuiz: {
      question: 'Manakah pernyataan yang paling tepat membedakan Astronomi dan Astrologi?',
      options: [
        'Astronomi dan astrologi adalah hal yang persis sama',
        'Astronomi adalah sains empiris benda langit, sedangkan astrologi adalah sistem interpretasi simbolis',
        'Astrologi menggunakan teleskop Hubble, sedangkan astronomi menggunakan kartu',
        'Astronomi hanya ada di zaman kuno, astrologi adalah cabang sains baru'
      ],
      correctIndex: 1,
      feedback: 'Benar! Astronomi mengukur hukum fisika alam semesta, sedangkan astrologi menggunakan posisi langit sebagai bahasa simbolis makna.',
    },
  },
  {
    id: 'ch3',
    title: '3. 12 Zodiak & Empat Elemen Kosmik',
    subtitle: 'Pondasi energi kehidupan: Api, Tanah, Udara, dan Air',
    readTime: '6 menit baca',
    sections: [
      {
        heading: 'Empat Elemen (Triplicity)',
        content: 'Kedua belas zodiak dibagi ke dalam 4 elemen utama yang mencerminkan sifat dasar temperamen manusia:',
        bulletPoints: [
          '🔥 Elemen Api (Aries, Leo, Sagitarius): Spontan, energetik, penuh gairah, berani, dan berorientasi aksi langsung.',
          '🌍 Elemen Tanah (Taurus, Virgo, Capricorn): Praktis, stabil, sabar, terencana, dan mewujudkan hasil konkret.',
          '💨 Elemen Udara (Gemini, Libra, Aquarius): Intelektual, sosial, komunikatif, objektif, dan kaya konsep ide baru.',
          '💧 Elemen Air (Cancer, Scorpio, Pisces): Emosional, empatik, intuitif, imajinatif, dan menyelami kedalaman batin.',
        ],
      },
      {
        heading: 'Tiga Kualitas / Modalitas (Quadruplicity)',
        content: 'Selain elemen, tiap zodiak digolongkan ke dalam 3 modalitas yang menggambarkan dinamika cara mereka bergerak dalam waktu:',
        bulletPoints: [
          'Kardinal (Aries, Cancer, Libra, Capricorn): Penggerak awal, inisiator musim, pencetus ide, dan pemimpin pembuka jalan.',
          'Tetap / Fixed (Taurus, Leo, Scorpio, Aquarius): Penjaga konsistensi, tekad kuat, setia, dan menyempurnakan hal yang sudah berjalan.',
          'Berubah / Mutable (Gemini, Virgo, Sagitarius, Pisces): Fleksibel, mudah beradaptasi, penutup siklus musim, dan komunikator perubahan.',
        ],
      },
    ],
    quickQuiz: {
      question: 'Zodiak manakah di bawah ini yang seluruhnya termasuk dalam kelompok Elemen Udara?',
      options: [
        'Aries, Leo, Sagitarius',
        'Taurus, Virgo, Capricorn',
        'Gemini, Libra, Aquarius',
        'Cancer, Scorpio, Pisces'
      ],
      correctIndex: 2,
      feedback: 'Luar biasa! Gemini, Libra, dan Aquarius adalah trio zodiak elemen Udara yang dikenal cerdas dan komunikatif.',
    },
  },
  {
    id: 'ch4',
    title: '4. Simbol & Makna Planet dalam Astrologi',
    subtitle: 'Aktor-aktor panggung kesadaran batin manusia',
    readTime: '5 menit baca',
    sections: [
      {
        heading: 'Planet Personal (Inner Planets)',
        content: 'Dalam astrologi, "planet" merujuk pada benda langit yang tampak bergerak di sabuk zodiak. Planet personal bergerak paling cepat dan menggambarkan kepribadian sehari-hari:',
        bulletPoints: [
          '☉ Matahari: Identitas inti, ego sadar, vitalitas, dan tujuan utama hidup.',
          '☽ Bulan: Dunia emosional, insting rasa aman, memori masa kecil, dan reaksi spontan.',
          '☿ Merkurius: Cara berbicara, berpikir, mengolah data, dan gaya belajar.',
          '♀ Venus: Gaya mencintai, daya tarik estetika, nilai hidup, dan harmoni sosial.',
          '♂ Mars: Dorongan gairah, keberanian, stamina fisik, dan cara menyalurkan kemarahan.',
        ],
      },
      {
        heading: 'Planet Sosial & Generasi (Outer Planets)',
        content: 'Jupiter dan Saturnus mengajarkan pertumbuhan sosial dan disiplin, sedangkan Uranus, Neptunus, dan Pluto mewakili kesadaran kolektif antar-generasi.',
      },
    ],
    quickQuiz: {
      question: 'Planet apakah yang melambangkan cara kita berpikir, belajar, dan berkomunikasi?',
      options: ['Venus', 'Mars', 'Merkurius', 'Saturnus'],
      correctIndex: 2,
      feedback: 'Tepat! Merkurius (Mercury) sang utusan bersayap adalah simbol pikiran dan komunikasi.',
    },
  },
  {
    id: 'ch5',
    title: '5. Mengenal 12 Rumah Astrologi (The Twelve Houses)',
    subtitle: 'Panggung kehidupan tempat planet mengekspresikan perannya',
    readTime: '6 menit baca',
    sections: [
      {
        heading: 'Apa Itu Rumah (House) dalam Astrologi?',
        content: 'Jika Zodiak adalah "BAGAIMANA" suatu energi bekerja, dan Planet adalah "APA / SIAPA" yang berakting, maka Rumah (House) adalah "DI MANA" panggung peristiwa itu berlangsung. Roda zodiak 360 derajat dibagi menjadi 12 rumah berdasarkan rotasi Bumi 24 jam.',
        bulletPoints: [
          'Rumah 1 (Ascendant): Diri sendiri, aura fisik, dan langkah awal.',
          'Rumah 4 (Imum Coeli): Rumah keluarga, batin terdalam, dan privasi.',
          'Rumah 7 (Descendant): Hubungan intim 1-on-1, pasangan, dan kontrak kerja.',
          'Rumah 10 (Midheaven): Puncak karir, reputasi publik, dan kontribusi sosial.',
        ],
      },
    ],
    quickQuiz: {
      question: 'Rumah astrologi berapakah yang menjadi panggung bagi karir, pencapaian tertinggi, dan reputasi publik?',
      options: ['Rumah 1', 'Rumah 4', 'Rumah 7', 'Rumah 10'],
      correctIndex: 3,
      feedback: 'Tepat sekali! Rumah ke-10 (Midheaven / MC) adalah panggung karir dan reputasi publik.',
    },
  },
  {
    id: 'ch6',
    title: '6. Aspek Planet: Dialog Antar Bintang',
    subtitle: 'Sudut geometris yang menciptakan harmoni dan tantangan dinamis',
    readTime: '5 menit baca',
    sections: [
      {
        heading: 'Bahasa Geometri Sudut di Angkasa',
        content: 'Aspek adalah sudut derajat tertentu antara dua planet di lingkaran 360 derajat. Aspek menggambarkan apakah dua bagian dari jiwa kita saling mendukung dengan mudah atau saling menantang untuk bertumbuh.',
        bulletPoints: [
          '☌ Konjungsi (0°): Kedua planet menyatu erat dan saling memperkuat sifatnya.',
          '△ Trine (120°): Sudut paling harmonis, bakat alami mengalir tanpa hambatan.',
          '⚹ Sekstil (60°): Peluang terbuka yang membutuhkan sedikit inisiatif untuk diraih.',
          '□ Square (90°): Ketegangan internal yang memacu kerja keras dan kedewasaan.',
          '☍ Oposisi (180°): Menuntut seni menyeimbangkan dua kutub yang saling berhadapan.',
        ],
      },
    ],
    quickQuiz: {
      question: 'Sudut 120 derajat dalam astrologi disebut sebagai aspek apa?',
      options: ['Square', 'Trine', 'Oposisi', 'Konjungsi'],
      correctIndex: 1,
      feedback: 'Tepat! Trine (120°) adalah aspek geometris segitiga yang melambangkan keharmonisan dan bakat alami.',
    },
  },
  {
    id: 'ch7',
    title: '7. Cara Membaca Birth Chart Sendiri untuk Pemula',
    subtitle: 'Langkah praktis merangkai potongan puzzle peta kelahiranmu',
    readTime: '6 menit baca',
    sections: [
      {
        heading: 'Tiga Serangkai: The Big Three',
        content: 'Bagi pemula, membaca seluruh birth chart sekaligus bisa terasa membingungkan. Mulailah dari The Big Three yang membentuk 80% fondasi karakter kepribadianmu:',
        bulletPoints: [
          'Langkah 1: Temukan Sun Sign (Matahari) — inilah esensi jati diri sadarmu, apa yang membuatmu merasa hidup.',
          'Langkah 2: Temukan Moon Sign (Bulan) — inilah batin emosionalmu saat sendirian di kamar, apa yang kamu butuhkan untuk merasa aman.',
          'Langkah 3: Temukan Rising Sign (Ascendant) — inilah gaya pembawaanmu saat pertama kali bertemu orang baru atau memasuki ruangan baru.',
        ],
        cosmicTip: 'Jika kamu memiliki Sun di Leo namun Moon di Cancer dan Rising di Virgo, kamu akan terlihat rapi dan teliti di luar (Virgo), hangat dan berkarisma saat sudah akrab (Leo), dan memiliki hati yang sangat peka penuh kasih (Cancer).',
      },
    ],
    quickQuiz: {
      question: 'Manakah dari The Big Three yang melambangkan dunia emosional batin dan kebutuhan rasa aman?',
      options: ['Sun Sign', 'Moon Sign', 'Rising Sign', 'Midheaven'],
      correctIndex: 1,
      feedback: 'Hebat! Moon Sign (Zodiak Bulan) adalah penjaga dunia batin, emosi, dan naluri kita.',
    },
  },
];
