import React, { useState } from 'react';
import { User, Award, Settings, Sparkles, Check, Moon, ShieldAlert, Compass } from 'lucide-react';
import { UserProfile, loadAchievements, saveUserProfile } from '../utils/userStore';
import { ZODIAC_SIGNS, getZodiacById } from '../data/zodiacData';
import { CITIES_DATABASE } from '../data/citiesData';
import { cosmicAudio } from '../utils/soundEffects';

interface Props {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  galaxyMode: boolean;
  setGalaxyMode: (val: boolean) => void;
}

export const ProfileView: React.FC<Props> = ({
  userProfile,
  onUpdateProfile,
  galaxyMode,
  setGalaxyMode,
}) => {
  const [nickname, setNickname] = useState(userProfile.nickname);
  const [birthDate, setBirthDate] = useState(userProfile.birthDate);
  const [birthTime, setBirthTime] = useState(userProfile.birthTime);
  const [birthCity, setBirthCity] = useState(userProfile.birthCity);
  const [selectedZodiacId, setSelectedZodiacId] = useState(userProfile.zodiacId);
  const [isSaved, setIsSaved] = useState(false);

  const achievements = loadAchievements();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const currentZodiac = getZodiacById(selectedZodiacId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      nickname,
      birthDate,
      birthTime,
      birthCity,
      zodiacId: selectedZodiacId,
      darkGalaxyMode: galaxyMode,
    };
    saveUserProfile(updated);
    onUpdateProfile(updated);
    setIsSaved(true);
    cosmicAudio.playCelebration();
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-cosmic text-white">
          Profil Penjelajah Kosmik
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Kelola data kelahiran, pantau lencana pencapaian astrologi, dan sesuaikan preferensi tampilan aplikasi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Card & Achievements (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1b0d3e] via-[#14082e] to-[#0d0720] border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-bold border shadow-lg shrink-0"
              style={{
                backgroundColor: `${currentZodiac.accentColor}25`,
                borderColor: `${currentZodiac.accentColor}60`,
                color: currentZodiac.accentColor,
              }}
            >
              {currentZodiac.symbol}
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif-cosmic text-white">
                  {userProfile.nickname || 'Penjelajah Bintang'}
                </h2>
                <span className="text-xs text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 font-medium">
                  Zodiak {currentZodiac.name}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Lahir pada {userProfile.birthDate} pukul {userProfile.birthTime} WIB · {userProfile.birthCity}
              </p>
              <div className="text-xs text-amber-200/90 italic pt-1">
                "{currentZodiac.tagline}"
              </div>
            </div>
          </div>

          {/* Achievement Badges Showcase */}
          <div className="p-6 rounded-3xl bg-[#110826]/90 border border-purple-800/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-serif-cosmic text-white">
                  Lencana Kosmik (Achievements)
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-amber-300">
                {unlockedCount} / {achievements.length} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    badge.unlocked
                      ? 'bg-purple-950/40 border-amber-500/40 text-slate-200'
                      : 'bg-black/20 border-slate-800/60 opacity-50 text-slate-400'
                  }`}
                >
                  <div className="text-2xl p-2 rounded-xl bg-purple-900/30 border border-purple-700/40 shrink-0">
                    {badge.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">
                      {badge.title}
                    </span>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {badge.description}
                    </p>
                    <span className="text-[10px] text-amber-300/80 block mt-1">
                      {badge.unlocked ? (badge.unlockedAt || 'Diraih') : badge.criteria}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Edit Profile Form (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#110826]/90 border border-purple-800/40 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Pengaturan & Edit Data Diri</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            {/* Nama */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Nama Panggilan:</label>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Tanggal Lahir:</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Waktu Lahir */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Waktu Lahir:</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Kota Lahir */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Kota Kelahiran:</label>
              <select
                value={birthCity}
                onChange={(e) => setBirthCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400"
              >
                {CITIES_DATABASE.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Manual Zodiac Sign Selection */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Zodiak Utama:</label>
              <select
                value={selectedZodiacId}
                onChange={(e) => setSelectedZodiacId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400"
              >
                {ZODIAC_SIGNS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.symbol} {s.name} ({s.dates})
                  </option>
                ))}
              </select>
            </div>

            {/* Dark Galaxy Mode Toggle */}
            <div className="pt-2 flex items-center justify-between p-3 rounded-2xl bg-purple-950/30 border border-purple-900/40">
              <div className="space-y-0.5">
                <span className="text-slate-200 font-semibold block">Mode Galaksi Gelap</span>
                <span className="text-[11px] text-slate-400">Efek bintang berkelap-kelip & nebula kosmik</span>
              </div>
              <button
                type="button"
                onClick={() => setGalaxyMode(!galaxyMode)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  galaxyMode ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                    galaxyMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Data Berhasil Disimpan!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Simpan Perubahan Profil</span>
                </>
              )}
            </button>
          </form>

          {/* App Info & Disclaimer */}
          <div className="pt-4 border-t border-purple-900/40 text-[11px] text-slate-400 space-y-2">
            <div className="font-semibold text-slate-300">Tentang AstroVerse ✨</div>
            <p className="leading-relaxed">
              AstroVerse dirancang sebagai media hiburan, eksplorasi kepribadian, dan sarana refleksi batin yang menyenangkan dan estetis.
            </p>
            <div className="flex items-start gap-1.5 text-amber-300/80">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Astrologi tidak mengklaim kepastian masa depan. Kehidupanmu ditentukan oleh keputusan dan tindakan nyata yang kamu ambil setiap hari.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
