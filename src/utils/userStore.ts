import { AchievementBadge, JournalEntry } from '../types';
import { getZodiacByDate } from '../data/zodiacData';

export interface UserProfile {
  nickname: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthCity: string;
  zodiacId: string;
  darkGalaxyMode: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  nickname: 'Penjelajah Bintang',
  birthDate: '2001-07-28',
  birthTime: '10:30',
  birthCity: 'Jakarta (WIB)',
  zodiacId: 'leo',
  darkGalaxyMode: true,
};

const DEFAULT_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'stargazer',
    title: 'Penatap Bintang (Stargazer)',
    description: 'Menjejakkan langkah pertama di AstroVerse.',
    icon: '✨',
    unlocked: true,
    unlockedAt: 'Hari ini',
    criteria: 'Buka aplikasi AstroVerse.',
  },
  {
    id: 'chart_master',
    title: 'Arsitek Peta Lahir (Chart Master)',
    description: 'Menghitung dan membedah Peta Kelahiran (Birth Chart) pribadi.',
    icon: '☸️',
    unlocked: false,
    criteria: 'Hitung birth chart menggunakan waktu dan koordinat kota lahir.',
  },
  {
    id: 'oracle_seeker',
    title: 'Pencari Petunjuk (Daily Oracle)',
    description: 'Membuka dan merenungkan Kartu Kosmik Harian.',
    icon: '🃏',
    unlocked: false,
    criteria: 'Buka kartu afirmasi harian.',
  },
  {
    id: 'cosmic_matchmaker',
    title: 'Penyelaras Harmoni (Cosmic Match)',
    description: 'Menganalisis kecocokan sinergi antara dua zodiak.',
    icon: '🔮',
    unlocked: false,
    criteria: 'Cek kecocokan zodiak di tab Jelajah.',
  },
  {
    id: 'journal_pioneer',
    title: 'Pencatat Kosmik (Journal Keeper)',
    description: 'Menuliskan refleksi batin pertama di Jurnal Kosmik.',
    icon: '📖',
    unlocked: false,
    criteria: 'Simpan 1 catatan pengalaman atau afirmasi di jurnal.',
  },
  {
    id: 'quiz_prodigy',
    title: 'Ahli Zodiak (Quiz Master)',
    description: 'Menjawab kuis pengetahuan zodiak dengan gemilang.',
    icon: '🏆',
    unlocked: false,
    criteria: 'Selesaikan kuis 10 pertanyaan zodiak.',
  },
  {
    id: 'academy_scholar',
    title: 'Cendekia Kosmik (Academy Scholar)',
    description: 'Mempelajari modul edukasi astrologi dan astronomi.',
    icon: '🎓',
    unlocked: false,
    criteria: 'Baca bab edukasi di Akademi Astrologi.',
  },
  {
    id: 'aura_converser',
    title: 'Sahabat Aura AI (AI Dialogue)',
    description: 'Berdiskusi dan berkonsultasi dengan Asisten Kosmik Aura.',
    icon: '🤖',
    unlocked: false,
    criteria: 'Ajukan pertanyaan ke Aura AI Guide.',
  },
];

const PROFILE_KEY = 'astroverse_user_profile';
const JOURNAL_KEY = 'astroverse_journal_entries';
const ACHIEVEMENTS_KEY = 'astroverse_achievements';

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error loading profile', e);
  }
  return DEFAULT_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    // Automatically recalculate zodiac sign if birth date is updated
    if (profile.birthDate) {
      const parts = profile.birthDate.split('-');
      if (parts.length === 3) {
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        if (m && d) {
          const z = getZodiacByDate(m, d);
          profile.zodiacId = z.id;
        }
      }
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function loadJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading journal', e);
  }
  return [
    {
      id: 'demo-1',
      date: '19 Oktober 2026',
      timestamp: Date.now() - 86400000,
      moodEmoji: '🌟',
      moodName: 'Bintang Bersinar (Penuh Percaya Diri)',
      feelingsText: 'Hari ini merasa sangat termotivasi memulai proyek kreatif baru. Pikiran terasa segar dan mengalir tanpa beban.',
      experiencesAndGoals: 'Menyelesaikan riset awal dan berbicara dengan teman seputar kolaborasi desain.',
      positiveAffirmation: 'Aku percaya pada potensi diriku dan melangkah dengan keberanian yang tenang.',
      cosmicTags: ['Kreativitas', 'Fokus', 'Optimis'],
    },
  ];
}

export function saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry[] {
  const current = loadJournalEntries();
  const newEntry: JournalEntry = {
    ...entry,
    id: 'entry-' + Date.now(),
    timestamp: Date.now(),
  };
  const updated = [newEntry, ...current];
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    unlockAchievement('journal_pioneer');
  } catch (e) {
    console.error('Error saving journal entry', e);
  }
  return updated;
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const current = loadJournalEntries();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting journal entry', e);
  }
  return updated;
}

export function loadAchievements(): AchievementBadge[] {
  if (typeof window === 'undefined') return DEFAULT_ACHIEVEMENTS;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (raw) {
      const parsed: AchievementBadge[] = JSON.parse(raw);
      // Merge with default list in case new badges were added
      return DEFAULT_ACHIEVEMENTS.map((def) => {
        const found = parsed.find((p) => p.id === def.id);
        return found ? { ...def, ...found } : def;
      });
    }
  } catch (e) {
    console.error('Error loading achievements', e);
  }
  return DEFAULT_ACHIEVEMENTS;
}

export function unlockAchievement(achievementId: string): AchievementBadge[] {
  const current = loadAchievements();
  let hasChange = false;
  const updated = current.map((badge) => {
    if (badge.id === achievementId && !badge.unlocked) {
      hasChange = true;
      return {
        ...badge,
        unlocked: true,
        unlockedAt: 'Baru saja diraih ✨',
      };
    }
    return badge;
  });

  if (hasChange) {
    try {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error updating achievements', e);
    }
  }
  return updated;
}
