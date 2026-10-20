import React, { useState } from 'react';
import { Sparkles, Compass, Moon, Sun, RefreshCw, ArrowRight, Heart, Brain, Users, Wallet, ShieldAlert } from 'lucide-react';
import { getZodiacById } from '../data/zodiacData';
import { getDailyHoroscope } from '../data/horoscopeData';
import { UserProfile } from '../utils/userStore';
import { cosmicAudio } from '../utils/soundEffects';

interface Props {
  userProfile: UserProfile;
  setActiveTab: (tab: string) => void;
  onOpenMoodModal: () => void;
  onOpenCardModal: () => void;
}

const COSMIC_QUOTES = [
  'Bintang-bintang tidak mendikte langkahmu; mereka adalah cermin yang memantulkan keagungan potensimu sendiri.',
  'Di dalam setiap hembusan napasmu, berdenyut materi yang pernah menjadi bagian dari debu bintang purba.',
  'Keheningan malam bukanlah tanda ketiadaan, melainkan saat di mana semesta berbicara dalam bahasa intuisi.',
  'Seperti fase Bulan yang bertumbuh perlahan, kamu tidak perlu tergesa-gesa untuk menjadi utuh.',
  'Ketika kamu menyelaraskan niat baik dengan tindakan nyata, seluruh semesta berkonspirasi membantumu.',
];

export const HomeView: React.FC<Props> = ({
  userProfile,
  setActiveTab,
  onOpenMoodModal,
  onOpenCardModal,
}) => {
  const [dayOffset, setDayOffset] = useState<number>(0); // 0 = Hari Ini, 1 = Besok, -1 = Kemarin
  const [quoteIndex, setQuoteIndex] = useState(0);

  const userZodiac = getZodiacById(userProfile.zodiacId);
  const horoscope = getDailyHoroscope(userZodiac.id, dayOffset);

  // Time-based greeting in Indonesian
  const currentHour = new Date().getHours();
  let timeGreeting = 'Selamat Pagi';
  if (currentHour >= 11 && currentHour < 15) timeGreeting = 'Selamat Siang';
  else if (currentHour >= 15 && currentHour < 19) timeGreeting = 'Selamat Sore';
  else if (currentHour >= 19 || currentHour < 5) timeGreeting = 'Selamat Malam';

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % COSMIC_QUOTES.length);
    cosmicAudio.playChime('mid');
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* 1. Hero Cosmic Greeting Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-800/40 shadow-2xl bg-gradient-to-r from-[#170a36] via-[#12082b] to-[#0a0518]">
        {/* Background Image Scrim */}
        <img
          src="/src/assets/images/astroverse_hero_galaxy_1792470164882.jpg"
          alt="Galaksi Kosmik AstroVerse"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07040f] via-transparent to-black/30" />

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AstroVerse — Explore Your Cosmic Story</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif-cosmic text-white tracking-tight">
              {timeGreeting}, {userProfile.nickname || 'Penjelajah Bintang'} ✨
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Langit hari ini memancarkan getaran reflektif. Selaraskan energi zodiakmu dengan niat
              positif dan nikmati petualangan kosmikmu.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-200">
                <span className="text-base">{userZodiac.symbol}</span>
                <span className="font-semibold">{userZodiac.name}</span>
                <span>({userZodiac.dates})</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-purple-300">Elemen {userZodiac.element}</span>
              <span className="text-slate-500">·</span>
              <span className="text-sky-300">Penguasa {userZodiac.rulingPlanet}</span>
            </div>
          </div>

          {/* Quick Actions Cluster */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={onOpenCardModal}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Kartu Oracle</span>
            </button>
            <button
              onClick={onOpenMoodModal}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-medium text-xs transition-all active:scale-95 whitespace-nowrap shrink-0"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Cosmic Mood</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Daily Motivational Quote Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#110926]/70 border border-purple-900/40 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-xl text-amber-400 mt-0.5">“</span>
          <div>
            <p className="text-xs sm:text-sm text-slate-200 italic font-serif-cosmic">
              {COSMIC_QUOTES[quoteIndex]}
            </p>
            <span className="text-[10px] text-amber-300/80 font-medium tracking-wider uppercase mt-1 block">
              Refleksi Harian Semesta
            </span>
          </div>
        </div>
        <button
          onClick={handleNextQuote}
          title="Kutipan Lainnya"
          className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-purple-900/30 transition-colors shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Daily Horoscope Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-cosmic text-white flex items-center gap-2">
              <span>Ramalan Kosmik Hari Ini</span>
              <span className="text-amber-400 text-base">{userZodiac.symbol}</span>
            </h2>
            <p className="text-xs text-slate-400">
              Energi harian untuk {userZodiac.name} · {horoscope.dateStr}
            </p>
          </div>

          {/* Day Selector Segmented Control (Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-purple-950/60 rounded-xl border border-purple-800/40 self-start sm:self-auto">
            <button
              onClick={() => {
                setDayOffset(-1);
                cosmicAudio.playChime('low');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                dayOffset === -1 ? 'bg-purple-800/80 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Kemarin
            </button>
            <button
              onClick={() => {
                setDayOffset(0);
                cosmicAudio.playChime('mid');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                dayOffset === 0 ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hari Ini
            </button>
            <button
              onClick={() => {
                setDayOffset(1);
                cosmicAudio.playChime('high');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                dayOffset === 1 ? 'bg-purple-800/80 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Besok
            </button>
          </div>
        </div>

        {/* 4 Cards Grid for Horoscope */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Suasana Hati */}
          <div className="p-5 rounded-2xl bg-[#120a2a]/80 border border-purple-800/30 hover:border-purple-600/40 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-purple-400" />
                  Suasana Hati & Batin
                </span>
                <span className="text-[11px] text-amber-300 font-mono">
                  {horoscope.energyScores.intuition}%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{horoscope.mood}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-900/30 text-[10px] text-purple-300">
              {horoscope.moodKeywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/30">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Pertemanan & Relasi */}
          <div className="p-5 rounded-2xl bg-[#120a2a]/80 border border-purple-800/30 hover:border-purple-600/40 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-pink-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-pink-400" />
                  Pertemanan & Sosial
                </span>
                <span className="text-[11px] text-amber-300 font-mono">
                  {horoscope.energyScores.social}%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{horoscope.friendshipAndSocial}</p>
            </div>
            <div className="pt-2 border-t border-purple-900/30 text-[11px] text-slate-400">
              Waktu Selaras: <span className="text-slate-200 font-medium">{horoscope.luckyTime}</span>
            </div>
          </div>

          {/* Card 3: Karir & Belajar */}
          <div className="p-5 rounded-2xl bg-[#120a2a]/80 border border-purple-800/30 hover:border-purple-600/40 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-300 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-sky-400" />
                  Produktivitas & Belajar
                </span>
                <span className="text-[11px] text-amber-300 font-mono">
                  {horoscope.energyScores.focus}%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{horoscope.educationAndCareer}</p>
            </div>
            <div className="pt-2 border-t border-purple-900/30 text-[11px] text-slate-400">
              Kreativitas: <span className="text-slate-200 font-medium">{horoscope.energyScores.creativity}%</span>
            </div>
          </div>

          {/* Card 4: Finansial */}
          <div className="p-5 rounded-2xl bg-[#120a2a]/80 border border-purple-800/30 hover:border-purple-600/40 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  Keuangan & Rezeki
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Stabil</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{horoscope.finances}</p>
            </div>
            <div className="pt-2 border-t border-purple-900/30 text-[11px] text-slate-400">
              Warna Harmonis: <span className="text-amber-300 font-medium">{horoscope.cosmicColor}</span>
            </div>
          </div>
        </div>

        {/* Positive Advice Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-purple-950/40 to-[#120a2a] border border-amber-500/30 flex items-start gap-3.5">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
              Saran Positif Kosmik Hari Ini
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {horoscope.positiveAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Quick Nav Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        <div
          onClick={() => {
            setActiveTab('birth-chart');
            cosmicAudio.playChime('mid');
          }}
          className="p-5 rounded-2xl bg-[#120928]/80 border border-purple-800/40 hover:border-amber-400/50 cursor-pointer transition-all hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-amber-300 text-lg">
              <Moon className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-white font-serif-cosmic">Peta Kelahiran (Birth Chart)</h3>
          <p className="text-xs text-slate-400 mt-1">
            Hitung posisi Matahari, Bulan, dan Ascendant dengan perhitungan astronomis nyata kota lahirmu.
          </p>
        </div>

        <div
          onClick={() => {
            setActiveTab('explore');
            cosmicAudio.playChime('mid');
          }}
          className="p-5 rounded-2xl bg-[#120928]/80 border border-purple-800/40 hover:border-amber-400/50 cursor-pointer transition-all hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-amber-300 text-lg">
              <Compass className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-white font-serif-cosmic">Kecocokan & Akademi Kosmik</h3>
          <p className="text-xs text-slate-400 mt-1">
            Uji sinergi dua zodiak, pelajari modul astrologi vs astronomi, dan buka wawasan baru.
          </p>
        </div>

        <div
          onClick={() => {
            setActiveTab('zodiac');
            cosmicAudio.playChime('mid');
          }}
          className="p-5 rounded-2xl bg-[#120928]/80 border border-purple-800/40 hover:border-amber-400/50 cursor-pointer transition-all hover:-translate-y-1 group sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-amber-300 text-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-white font-serif-cosmic">Katalog 12 Zodiak Lengkap</h3>
          <p className="text-xs text-slate-400 mt-1">
            Telusuri karakteristik, kekuatan, bayangan, gaya komunikasi, dan batu kristal pelindung tiap zodiak.
          </p>
        </div>
      </div>

      {/* 5. Ethical Astrology Disclaimer */}
      <div className="p-4 rounded-xl bg-black/40 border border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Catatan Etika & Refleksi AstroVerse:</strong> Astrologi
          merupakan warisan simbolis budaya untuk refleksi diri, pemahaman diri, dan hiburan inspiratif.
          Astrologi bukan penentu kepastian masa depan atau pengganti keputusan medis, hukum, maupun
          finansial profesional.
        </p>
      </div>
    </div>
  );
};
