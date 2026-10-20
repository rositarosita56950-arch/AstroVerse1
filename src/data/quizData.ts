import { QuizQuestion } from '../types';

export const ZODIAC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Zodiak manakah yang memiliki simbol kalajengking dan dinaungi oleh Pluto serta Mars?',
    options: ['Aries', 'Scorpio', 'Taurus', 'Sagitarius'],
    correctIndex: 1,
    explanation: 'Scorpio dilambangkan oleh Kalajengking, dikenal memiliki kedalaman emosi, tekad kuat, dan intuisi tajam.',
    category: 'Simbol Zodiak',
  },
  {
    id: 2,
    question: 'Manakah di bawah ini yang merupakan zodiak berelemen Tanah (Earth)?',
    options: ['Leo, Aries, Sagitarius', 'Taurus, Virgo, Capricorn', 'Gemini, Libra, Aquarius', 'Cancer, Scorpio, Pisces'],
    correctIndex: 1,
    explanation: 'Taurus, Virgo, dan Capricorn adalah trio elemen Tanah yang dikenal praktis, setia, dan berorientasi hasil nyata.',
    category: 'Elemen Kosmik',
  },
  {
    id: 3,
    question: 'Dalam konsep "The Big Three", apakah arti dari Rising Sign (Ascendant)?',
    options: [
      'Planet terjauh dari tata surya',
      'Kesan pertama atau topeng sosial yang kamu tampilkan ke dunia luar',
      'Keberuntungan finansial di masa tua',
      'Hari lahir berdasarkan kalender lunar'
    ],
    correctIndex: 1,
    explanation: 'Ascendant (Rising Sign) adalah tanda zodiak yang terbit di ufuk timur saat jam kelahiranmu, melambangkan pembawaan diri dan kesan pertama.',
    category: 'Peta Kelahiran',
  },
  {
    id: 4,
    question: 'Benda langit manakah yang secara tradisional menaungi zodiak Cancer?',
    options: ['Matahari', 'Bulan (Moon)', 'Venus', 'Saturnus'],
    correctIndex: 1,
    explanation: 'Cancer dinaungi oleh Bulan, yang mencerminkan sifat sensitif, mengayomi, dan kedalaman intuisi.',
    category: 'Planet Penguasa',
  },
  {
    id: 5,
    question: 'Fenomena astronomis ketika orbit Bumi melintasi debu komet disebut:',
    options: ['Retrograde planet', 'Hujan Meteor (Meteor Shower)', 'Gerhana Total', 'Solstis'],
    correctIndex: 1,
    explanation: 'Hujan meteor terjadi ketika serpihan debu komet atau asteroid terbakar di atmosfer Bumi dengan kecepatan tinggi.',
    category: 'Fakta Astronomi',
  },
  {
    id: 6,
    question: 'Berapakah jumlah Rumah (Houses) dalam satu lingkaran penuh birth chart astrologi?',
    options: ['8 Rumah', '10 Rumah', '12 Rumah', '24 Rumah'],
    correctIndex: 2,
    explanation: 'Ada tepat 12 Rumah astrologi yang mewakili berbagai bidang kehidupan manusia, dari identitas hingga spiritualitas.',
    category: 'Peta Kelahiran',
  },
  {
    id: 7,
    question: 'Apa arti dari modalitas "Kardinal" dalam astrologi?',
    options: [
      'Zodiak yang memulai musim baru dan memiliki dorongan inisiatif tinggi',
      'Zodiak yang tidak bisa berubah selamanya',
      'Zodiak yang hanya muncul saat gerhana',
      'Zodiak yang tidak memiliki planet penguasa'
    ],
    correctIndex: 0,
    explanation: 'Tanda Kardinal (Aries, Cancer, Libra, Capricorn) menandai awal pergantian 4 musim dan memiliki energi inisiator.',
    category: 'Modalitas',
  },
  {
    id: 8,
    question: 'Planet apakah yang melambangkan keindahan, gaya mencintai, nilai estetika, dan keharmonisan?',
    options: ['Mars', 'Venus', 'Merkurius', 'Jupiter'],
    correctIndex: 1,
    explanation: 'Venus diasosiasikan dengan cinta, daya tarik estetika, seni, dan kenyamanan relasi antarpribadi.',
    category: 'Planet Penguasa',
  },
  {
    id: 9,
    question: 'Fase Bulan apakah yang melambangkan titik kulminasi energi penuh dan penerangan wawasan batin?',
    options: ['Bulan Baru (New Moon)', 'Bulan Purnama (Full Moon)', 'Kuartir Ketiga', 'Sabit Tua'],
    correctIndex: 1,
    explanation: 'Bulan Purnama (Full Moon) terjadi saat Bulan memantulkan 100% sinar Matahari, simbol puncak energi dan rasa syukur.',
    category: 'Fase Bulan',
  },
  {
    id: 10,
    question: 'Bagaimanakah sikap yang paling bijak dan sehat dalam membaca ramalan zodiak harian?',
    options: [
      'Mempercayainya sebagai vonis takdir mutlak tanpa usaha',
      'Menjadikannya sebagai bahan refleksi positif dan hiburan yang menyenangkan dengan akal sehat',
      'Menghindari teman yang berbeda elemen zodiak',
      'Membuat keputusan medis hanya berdasarkan zodiak'
    ],
    correctIndex: 1,
    explanation: 'Tepat! Astrologi terbaik adalah yang memberdayakan diri, mengasah kesadaran, dan dinikmati dengan nalar yang sehat.',
    category: 'Etika Astrologi',
  },
];
