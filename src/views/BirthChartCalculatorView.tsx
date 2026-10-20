import React, { useState } from 'react';
import { calculateBirthChart } from '../data/astronomicalCalculator';
import { CITIES_DATABASE, CityInfo } from '../data/citiesData';
import { BirthChartResult, UserProfile } from '../types';
import { BirthChartWheel } from '../components/BirthChartWheel';
import { cosmicAudio } from '../utils/soundEffects';
import { unlockAchievement, saveUserProfile } from '../utils/userStore';
import { Sparkles, Moon, Sun, Compass, MapPin, Clock, Calendar, CheckCircle2, Share2, Award } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const BirthChartCalculatorView: React.FC<Props> = ({ userProfile, onUpdateProfile }) => {
  const [name, setName] = useState(userProfile.nickname || 'Penjelajah Bintang');
  const [birthDate, setBirthDate] = useState(userProfile.birthDate || '2001-07-28');
  const [birthTime, setBirthTime] = useState(userProfile.birthTime || '10:30');
  const [selectedCityName, setSelectedCityName] = useState(userProfile.birthCity || 'Jakarta (WIB)');
  const [chartResult, setChartResult] = useState<BirthChartResult | null>(() => {
    // Pre-calculate initial chart with default user profile
    const defaultCity = CITIES_DATABASE.find((c) => c.name === (userProfile.birthCity || 'Jakarta (WIB)')) || CITIES_DATABASE[0];
    return calculateBirthChart(
      userProfile.nickname || 'Penjelajah Bintang',
      userProfile.birthDate || '2001-07-28',
      userProfile.birthTime || '10:30',
      defaultCity.name,
      defaultCity.latitude,
      defaultCity.longitude,
      defaultCity.timezoneOffsetHours
    );
  });
  const [activeTab, setActiveTab] = useState<'planets' | 'houses' | 'aspects'>('planets');
  const [isCopied, setIsCopied] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const city = CITIES_DATABASE.find((c) => c.name === selectedCityName) || CITIES_DATABASE[0];

    const result = calculateBirthChart(
      name,
      birthDate,
      birthTime,
      city.name,
      city.latitude,
      city.longitude,
      city.timezoneOffsetHours
    );

    setChartResult(result);
    cosmicAudio.playCelebration();
    unlockAchievement('chart_master');

    // Update user profile
    const updatedProfile: UserProfile = {
      ...userProfile,
      nickname: name,
      birthDate: birthDate,
      birthTime: birthTime,
      birthCity: city.name,
    };
    saveUserProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
  };

  const handleShareChart = () => {
    if (!chartResult) return;
    const text = `✨ Peta Kelahiran Kosmik (Birth Chart) AstroVerse ✨\nNama: ${chartResult.name}\nMatahari (Sun): ${chartResult.sunSign} ${chartResult.sunDegree}°\nBulan (Moon): ${chartResult.moonSign} ${chartResult.moonDegree}° (${chartResult.moonPhaseName})\nAscendant (Rising): ${chartResult.risingSign} ${chartResult.risingDegree}°\nElemen Dominan: ${chartResult.dominantElement}\n\nHitung peta kelahiranmu di AstroVerse!`;
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-cosmic text-white">
          Kalkulator Peta Kelahiran (Birth Chart)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Hitung posisi presisi Matahari, Bulan, Ascendant, dan planet tata surya berdasarkan koordinat waktu astronomis saat kamu lahir ke dunia.
        </p>
      </div>

      {/* Input Form & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Container (5 columns on desktop) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#110826]/90 border border-purple-800/40 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Data Kelahiran Pengguna</span>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4 text-xs">
            {/* Nama Panggilan */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <span>Nama Panggilan / Inisial</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Rian, Maya, Alex"
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Tanggal Lahir</span>
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Waktu Lahir */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Waktu Lahir (Jam:Menit)</span>
                </label>
                <span className="text-[10px] text-slate-400 italic">Penting untuk Ascendant</span>
              </div>
              <input
                type="time"
                required
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Kota Kelahiran */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Kota Kelahiran</span>
              </label>
              <select
                value={selectedCityName}
                onChange={(e) => setSelectedCityName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {CITIES_DATABASE.map((c) => (
                  <option key={c.name} value={c.name} className="bg-[#120826] text-white">
                    {c.name} — {c.country} (GMT {c.timezoneOffsetHours >= 0 ? `+${c.timezoneOffsetHours}` : c.timezoneOffsetHours})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Kalkulasi Peta Kelahiran</span>
            </button>
          </form>

          {/* Educational Note */}
          <div className="mt-5 p-3.5 rounded-2xl bg-purple-950/30 border border-purple-900/40 text-[11px] text-slate-400 space-y-1 leading-relaxed">
            <span className="font-semibold text-slate-300 block">Mengapa jam lahir akurat dibutuhkan?</span>
            Bumi berotasi 360° dalam 24 jam (~1° setiap 4 menit). Waktu lahir menentukan tanda zodiak yang persis terbit di ufuk timur (Ascendant) dan urutan kedua belas rumah astrologi.
          </div>
        </div>

        {/* Results Container (7 columns on desktop) */}
        {chartResult && (
          <div className="lg:col-span-7 space-y-6">
            {/* The Big Three Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1c0e40] via-[#150a30] to-[#0c071d] border border-amber-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
                <div>
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                    The Big Three · Pilar Utama Jiwa
                  </span>
                  <h3 className="text-lg font-bold font-serif-cosmic text-white">
                    Peta Bintang: {chartResult.name}
                  </h3>
                </div>
                <button
                  onClick={handleShareChart}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-700/50 text-xs text-slate-200 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Salin Ringkasan</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Sun */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between text-amber-400 text-xs">
                    <span className="flex items-center gap-1 font-semibold">
                      <Sun className="w-3.5 h-3.5" /> Sun Sign
                    </span>
                    <span className="font-mono text-[11px]">{chartResult.sunDegree}°</span>
                  </div>
                  <div className="text-base font-bold text-white font-serif-cosmic">
                    {chartResult.sunSign}
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Ego sadar, jati diri inti, dan vitalitas tujuan hidupmu.
                  </p>
                </div>

                {/* Moon */}
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center justify-between text-cyan-300 text-xs">
                    <span className="flex items-center gap-1 font-semibold">
                      <Moon className="w-3.5 h-3.5" /> Moon Sign
                    </span>
                    <span className="font-mono text-[11px]">{chartResult.moonDegree}°</span>
                  </div>
                  <div className="text-base font-bold text-white font-serif-cosmic">
                    {chartResult.moonSign}
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Dunia emosional batin, insting, dan rasa aman pribadimu.
                  </p>
                </div>

                {/* Ascendant */}
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between text-purple-300 text-xs">
                    <span className="flex items-center gap-1 font-semibold">
                      <Compass className="w-3.5 h-3.5" /> Rising / ASC
                    </span>
                    <span className="font-mono text-[11px]">{chartResult.risingDegree}°</span>
                  </div>
                  <div className="text-base font-bold text-white font-serif-cosmic">
                    {chartResult.risingSign}
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Aura sosial, kesan pertama, dan topeng caramu berinteraksi.
                  </p>
                </div>
              </div>

              {/* Lunar phase info */}
              <div className="text-xs text-slate-300 flex items-center justify-between pt-1">
                <span>Fase Bulan Kelahiran: <strong className="text-amber-200">{chartResult.moonPhaseName}</strong></span>
                <span className="text-slate-400 font-mono text-[11px]">Iluminasi ~{chartResult.moonPhasePercent}%</span>
              </div>
            </div>

            {/* Interactive Birth Chart Wheel */}
            <div className="p-6 rounded-3xl bg-[#110826]/90 border border-purple-800/40 shadow-xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Roda Astrologi Kelahiran 360°
                </span>
                <span className="text-[11px] text-slate-400">
                  {chartResult.city} · {chartResult.birthDate}
                </span>
              </div>
              <BirthChartWheel chart={chartResult} />
            </div>

            {/* Element Balance Breakdown */}
            <div className="p-5 rounded-3xl bg-[#110826]/90 border border-purple-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Keseimbangan 4 Elemen Kosmik</span>
                <span className="text-xs text-amber-300 font-medium">Dominan: Elemen {chartResult.dominantElement}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-amber-400 font-semibold mb-1">🔥 Api ({chartResult.elementBalance.Api})</div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${(chartResult.elementBalance.Api / 11) * 100}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-emerald-400 font-semibold mb-1">🌍 Tanah ({chartResult.elementBalance.Tanah})</div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(chartResult.elementBalance.Tanah / 11) * 100}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30">
                  <div className="text-sky-400 font-semibold mb-1">💨 Udara ({chartResult.elementBalance.Udara})</div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-sky-400 h-1.5 rounded-full" style={{ width: `${(chartResult.elementBalance.Udara / 11) * 100}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <div className="text-cyan-400 font-semibold mb-1">💧 Air ({chartResult.elementBalance.Air})</div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${(chartResult.elementBalance.Air / 11) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Detailed Tables: Planets | Houses | Aspects */}
            <div className="p-5 rounded-3xl bg-[#110826]/90 border border-purple-800/40 space-y-4">
              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-purple-900/50 pb-3">
                <button
                  onClick={() => setActiveTab('planets')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                    activeTab === 'planets'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Daftar Posisi Planet ({chartResult.planets.length})
                </button>
                <button
                  onClick={() => setActiveTab('houses')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                    activeTab === 'houses'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  12 Rumah Astrologi (Houses)
                </button>
                <button
                  onClick={() => setActiveTab('aspects')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                    activeTab === 'aspects'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Aspek Planet ({chartResult.aspects.length})
                </button>
              </div>

              {/* Tab 1: Planets */}
              {activeTab === 'planets' && (
                <div className="space-y-2.5">
                  {chartResult.planets.map((p) => (
                    <div
                      key={p.name}
                      className="p-3 rounded-2xl bg-purple-950/30 border border-purple-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-amber-300 text-sm font-bold shrink-0">
                          {p.symbol}
                        </span>
                        <div>
                          <span className="font-semibold text-slate-200">{p.name}</span>
                          <span className="text-[11px] text-slate-400 block sm:inline sm:ml-2">
                            {p.meaning}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-auto text-slate-300 font-mono text-[11px]">
                        <span className="text-amber-300 font-semibold">{p.sign} {p.degree}°{p.minute}'</span>
                        <span className="text-purple-300">Rumah {p.house}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Houses */}
              {activeTab === 'houses' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {chartResult.houses.map((h) => (
                    <div
                      key={h.houseNumber}
                      className="p-3 rounded-2xl bg-purple-950/30 border border-purple-800/30 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="font-bold text-amber-300">Rumah ke-{h.houseNumber}</span>
                        <span className="text-slate-400 font-mono">{h.sign} ({h.cuspDegree}°)</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{h.theme}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Aspects */}
              {activeTab === 'aspects' && (
                <div className="space-y-2">
                  {chartResult.aspects.map((asp, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-purple-950/30 border border-purple-800/30 text-xs flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-slate-200 font-medium">
                          <span className="text-amber-400 font-bold">{asp.symbol}</span>
                          <span>{asp.planet1} {asp.aspectType} {asp.planet2}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            asp.nature === 'Harmonis'
                              ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                              : 'border-rose-500/40 text-rose-300 bg-rose-500/10'
                          }`}>
                            {asp.nature}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{asp.interpretation}</p>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] shrink-0">
                        Orb {asp.orb}°
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
