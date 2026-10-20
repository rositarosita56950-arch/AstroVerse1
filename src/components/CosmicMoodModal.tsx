import React, { useState } from 'react';
import { X, Sparkles, Coffee, Gem, Heart, CheckCircle2 } from 'lucide-react';
import { cosmicAudio } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MOODS = [
  {
    id: 'bright_star',
    emoji: '⭐',
    label: 'Bintang Terang',
    subtext: 'Penuh optimisme, semangat, & percaya diri',
    crystal: 'Citrine & Sunstone',
    tea: 'Teh Chamomile dengan Madu',
    practice: 'Tulis 3 hal yang membuatmu bangga pada dirimu sendiri hari ini, lalu bagikan senyum hangat pada orang sekitar.',
    affirmation: 'Cahaya batinku bersinar alami tanpa perlu membandingkan diri dengan bintang lain di angkasa.',
    badgeColor: 'border-amber-400/50 bg-amber-500/15 text-amber-200',
  },
  {
    id: 'calm_moon',
    emoji: '🌙',
    label: 'Tenang Seperti Bulan',
    subtext: 'Damai, reflektif, & menikmati kesendirian',
    crystal: 'Moonstone & Selenite',
    tea: 'Teh Peppermint Hangat',
    practice: 'Matikan gawai selama 30 menit. Duduklah di dekat jendela atau baca buku fiksi yang menenangkan jiwamu.',
    affirmation: 'Keheningan bukanlah kekosongan, melainkan ruang suci di mana kedamaian sejati berakar.',
    badgeColor: 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200',
  },
  {
    id: 'nebula_storm',
    emoji: '🌀',
    label: 'Badai Nebula',
    subtext: 'Banyak pikiran (overthinking), gelisah, atau penat',
    crystal: 'Black Tourmaline & Smoky Quartz',
    tea: 'Teh Jahe Hangat dengan Serai',
    practice: 'Tarik napas 4 detik, tahan 4 detik, hembuskan perlahan 6 detik. Berjalanlah tanpa alas kaki di atas rumput atau lantai dingin.',
    affirmation: 'Aku tidak harus mengendalikan semua gelombang kehidupan. Cukuplah aku menjaga perahuku tetap mengapung.',
    badgeColor: 'border-purple-400/50 bg-purple-500/15 text-purple-200',
  },
  {
    id: 'fire_passion',
    emoji: '🔥',
    label: 'Kobaran Api',
    subtext: 'Berapi-api, ingin segera menuntaskan tugas besar',
    crystal: 'Carnelian & Red Jasper',
    tea: 'Teh Hijau / Matcha',
    practice: 'Gunakan teknik Pomodoro 25 menit fokus penuh untuk tugas terpentingmu sebelum energinya terdistraksi hal kecil.',
    affirmation: 'Gairahku adalah bahan bakar yang kuarahkan dengan bijak menuju karya yang bernilai.',
    badgeColor: 'border-rose-400/50 bg-rose-500/15 text-rose-200',
  },
  {
    id: 'deep_ocean',
    emoji: '🌊',
    label: 'Samudra Dalam',
    subtext: 'Emosional, sangat sensitif, butuh pelukan hangat',
    crystal: 'Rose Quartz & Aquamarine',
    tea: 'Teh Lavender Lembut',
    practice: 'Beri izin pada dirimu untuk merasakan emosi tanpa menghakiminya. Menangis atau beristirahat adalah tanda kejujuran jiwa.',
    affirmation: 'Emosiku valid dan mengalir seperti ombak yang akan surut kembali menjadi ketenangan.',
    badgeColor: 'border-blue-400/50 bg-blue-500/15 text-blue-200',
  },
  {
    id: 'fresh_breeze',
    emoji: '🍃',
    label: 'Udara Segar',
    subtext: 'Rasa ingin tahu tinggi, ingin eksplorasi hal baru',
    crystal: 'Fluorite & Clear Quartz',
    tea: 'Infused Water Lemon & Mint',
    practice: 'Pelajari satu topik baru di luar bidangmu selama 15 menit atau mulailah bertukar pikiran dengan kawan lama.',
    affirmation: 'Pikiranku jernih, terbuka, dan siap menerima pemahaman baru yang memperluas jiwaku.',
    badgeColor: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200',
  },
];

export const CosmicMoodModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedMoodId, setSelectedMoodId] = useState('bright_star');

  if (!isOpen) return null;

  const currentMood = MOODS.find((m) => m.id === selectedMoodId) || MOODS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#180e36] to-[#0c071d] border border-purple-800/40 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-300 tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Cosmic Mood Check-In</span>
        </div>
        <h3 className="text-xl font-bold font-serif-cosmic text-white">
          Bagaimana Suasana Hatimu Hari Ini?
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Pilih getaran emosionalmu saat ini untuk mendapatkan panduan refleksi selaras semesta.
        </p>

        {/* Mood Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
          {MOODS.map((mood) => {
            const isSelected = mood.id === selectedMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => {
                  setSelectedMoodId(mood.id);
                  cosmicAudio.playChime('mid');
                }}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-semibold text-slate-200">{mood.label}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{mood.subtext}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Mood Recommendations Box */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <span className="text-lg">{currentMood.emoji}</span>
              Saran Refleksi Kosmik Untukmu
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${currentMood.badgeColor}`}>
              {currentMood.label}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <Gem className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Kristal / Batu Penyeimbang: </span>
                <span className="font-semibold text-slate-200">{currentMood.crystal}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Coffee className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Minuman Penenang: </span>
                <span className="font-semibold text-slate-200">{currentMood.tea}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Aktivitas Sadar (Mindful Action): </span>
                <p className="text-slate-200 mt-0.5">{currentMood.practice}</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-900/30 border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Afirmasi Penyelaras Jiwa:
            </div>
            <p className="text-xs text-slate-200 italic">"{currentMood.affirmation}"</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20"
        >
          Selesai Refleksi
        </button>
      </div>
    </div>
  );
};
