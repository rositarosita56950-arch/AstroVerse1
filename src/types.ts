export type ElementType = 'Api' | 'Tanah' | 'Udara' | 'Air';

export type ModalityType = 'Kardinal' | 'Tetap' | 'Berubah';

export interface UserProfile {
  nickname: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  zodiacId: string;
  darkGalaxyMode: boolean;
}

export interface ZodiacSign {
  id: string;
  name: string;
  latinName: string;
  symbol: string;
  unicodeSymbol: string;
  dates: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  element: ElementType;
  modality: ModalityType;
  rulingPlanet: string;
  rulingPlanetSymbol: string;
  polarity: 'Maskulin (Yang)' | 'Feminin (Yin)';
  tagline: string;
  overview: string;
  strengths: string[];
  challenges: string[];
  socialStyle: string;
  communicationStyle: string;
  careerWorkStyle: string;
  luckyNumbers: number[];
  luckyColors: string[];
  crystals: string[];
  compatibleSigns: string[];
  accentColor: string;
  elementColor: string;
}

export interface PlanetaryPosition {
  name: string;
  symbol: string;
  sign: string;
  degree: number;
  minute: number;
  house: number;
  meaning: string;
  archetype: string;
  description: string;
}

export interface AspectData {
  planet1: string;
  planet2: string;
  aspectType: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile';
  symbol: string;
  angle: number;
  orb: number;
  nature: 'Harmonis' | 'Dinamis / Tantangan' | 'Netral / Penguat';
  interpretation: string;
}

export interface BirthChartResult {
  name: string;
  birthDate: string;
  birthTime: string;
  city: string;
  latitude: number;
  longitude: number;
  sunSign: string;
  sunDegree: number;
  moonSign: string;
  moonDegree: number;
  moonPhaseName: string;
  moonPhasePercent: number;
  risingSign: string; // Ascendant
  risingDegree: number;
  planets: PlanetaryPosition[];
  houses: { houseNumber: number; sign: string; cuspDegree: number; theme: string }[];
  aspects: AspectData[];
  elementBalance: {
    Api: number;
    Tanah: number;
    Udara: number;
    Air: number;
  };
  dominantElement: ElementType;
}

export interface DailyHoroscope {
  zodiacId: string;
  dateStr: string;
  mood: string;
  moodKeywords: string[];
  friendshipAndSocial: string;
  educationAndCareer: string;
  finances: string;
  positiveAdvice: string;
  energyScores: {
    focus: number;
    intuition: number;
    creativity: number;
    social: number;
  };
  luckyTime: string;
  cosmicColor: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  timestamp: number;
  moodEmoji: string;
  moodName: string;
  feelingsText: string;
  experiencesAndGoals: string;
  positiveAffirmation: string;
  cosmicTags: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  criteria: string;
}

export interface LearningChapter {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    cosmicTip?: string;
  }[];
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    feedback: string;
  };
}

export interface CalendarCosmicEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'astronomical' | 'astrological';
  category: 'Moon Phase' | 'Planet Ingress' | 'Retrograde' | 'Meteor Shower' | 'Equinox/Solstice';
  description: string;
  scientificFact?: string;
  astrologicalReflection?: string;
}
