import React, { useState } from 'react';
import { X, Sparkles, Heart, MessageCircle, Briefcase, Gem, Compass, Check } from 'lucide-react';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { ElementType, ZodiacSign } from '../types';
import { cosmicAudio } from '../utils/soundEffects';

interface Props {
  userZodiacId: string;
  onSelectUserZodiac: (zodiacId: string) => void;
}

export const ZodiacCatalogView: React.FC<Props> = ({ userZodiacId, onSelectUserZodiac }) => {
  const [filterElement, setFilterElement] = useState<ElementType | 'Semua'>('Semua');
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  const filteredSigns = filterElement === 'Semua'
    ? ZODIAC_SIGNS
    : ZODIAC_SIGNS.filter((s) => s.element === filterElement);

  const handleOpenDetail = (sign: ZodiacSign) => {
    setSelectedSign(sign);
    cosmicAudio.playChime('mid');
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-cosmic text-white">
            Ensiklopedia 12 Zodiak Kosmik
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Telusuri kepribadian, elemen, planet penguasa, dan rahasia arketipe kosmik dari setiap tanda.
          </p>
        </div>

        {/* Filter Buttons Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-purple-950/60 rounded-xl border border-purple-800/40">
          {(['Semua', 'Api', 'Tanah', 'Udara', 'Air'] as const).map((el) => {
            const isActive = filterElement === el;
            return (
              <button
                key={el}
                onClick={() => {
                  setFilterElement(el);
                  cosmicAudio.playChime('low');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {el === 'Semua' ? 'Semua Elemen' : `${el === 'Api' ? '🔥' : el === 'Tanah' ? '🌍' : el === 'Udara' ? '💨' : '💧'} ${el}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Zodiac Signs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSigns.map((sign) => {
          const isUserZodiac = sign.id === userZodiacId;
          return (
            <div
              key={sign.id}
              onClick={() => handleOpenDetail(sign)}
              className="p-5 rounded-2xl bg-[#110826]/80 border border-purple-800/30 hover:border-amber-400/50 cursor-pointer transition-all hover:-translate-y-1 group relative flex flex-col justify-between space-y-4"
            >
              {isUserZodiac && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-semibold text-amber-300">
                  <Check className="w-3 h-3" />
                  <span>Zodiakmu</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold border shadow-inner group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: `${sign.accentColor}18`,
                      borderColor: `${sign.accentColor}50`,
                      color: sign.accentColor,
                    }}
                  >
                    {sign.symbol}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-serif-cosmic group-hover:text-amber-300 transition-colors">
                      {sign.name}
                    </h3>
                    <div className="text-[11px] text-slate-400">{sign.dates}</div>
                  </div>
                </div>

                <div className="text-xs text-amber-200/90 font-medium mb-2 italic">
                  "{sign.tagline}"
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {sign.overview}
                </p>
              </div>

              {/* Card Footer Metadata (No Pill Enclosures, clean text with separators) */}
              <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium">Elemen {sign.element}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sign.modality}</span>
                </div>
                <span className="text-amber-400 text-xs group-hover:translate-x-1 transition-transform">
                  Detail →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Zodiac Modal */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#190f38] to-[#0c071d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl font-bold border shadow-lg shrink-0"
                style={{
                  backgroundColor: `${selectedSign.accentColor}25`,
                  borderColor: `${selectedSign.accentColor}60`,
                  color: selectedSign.accentColor,
                }}
              >
                {selectedSign.symbol}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold font-serif-cosmic text-white">
                    {selectedSign.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">({selectedSign.latinName})</span>
                </div>
                <div className="text-xs text-amber-300 font-medium">{selectedSign.dates}</div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 pt-0.5">
                  <span>Elemen {selectedSign.element}</span>
                  <span aria-hidden="true">·</span>
                  <span>Kualitas {selectedSign.modality}</span>
                  <span aria-hidden="true">·</span>
                  <span>Planet Penguasa: {selectedSign.rulingPlanet} ({selectedSign.rulingPlanetSymbol})</span>
                </div>
              </div>
            </div>

            {/* Tagline & Overview */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 mb-6">
              <div className="text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Arketipe Jiwa: {selectedSign.tagline}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedSign.overview}
              </p>
            </div>

            {/* Strengths & Challenges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Kekuatan & Potensi Bawaan
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {selectedSign.strengths.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                  Tantangan & Area Bertumbuh
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {selectedSign.challenges.map((ch, i) => (
                    <li key={i}>{ch}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social, Communication & Career */}
            <div className="space-y-4 mb-6 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/30 space-y-1.5">
                <div className="font-semibold text-amber-300 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  Hubungan Sosial & Pertemanan
                </div>
                <p className="leading-relaxed">{selectedSign.socialStyle}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/30 space-y-1.5">
                <div className="font-semibold text-sky-300 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-sky-400" />
                  Gaya Komunikasi
                </div>
                <p className="leading-relaxed">{selectedSign.communicationStyle}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/30 space-y-1.5">
                <div className="font-semibold text-emerald-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  Gaya Kerja & Karir Selaras
                </div>
                <p className="leading-relaxed">{selectedSign.careerWorkStyle}</p>
              </div>
            </div>

            {/* Lucky Elements & Crystals */}
            <div className="p-4 rounded-2xl bg-[#120826] border border-purple-900/50 mb-6 flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="space-y-1">
                <span className="text-slate-400 block">Kristal Penyelaras:</span>
                <span className="font-semibold text-purple-200">{selectedSign.crystals.join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block">Warna Harmonis:</span>
                <span className="font-semibold text-amber-200">{selectedSign.luckyColors.join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block">Angka Selaras:</span>
                <span className="font-semibold text-slate-200 font-mono">{selectedSign.luckyNumbers.join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block">Zodiak Selaras:</span>
                <span className="font-semibold text-pink-300">{selectedSign.compatibleSigns.join(', ')}</span>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectUserZodiac(selectedSign.id);
                  cosmicAudio.playCelebration();
                  setSelectedSign(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 text-center"
              >
                Jadikan {selectedSign.name} Sebagai Zodiak Utamaku
              </button>
              <button
                onClick={() => setSelectedSign(null)}
                className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs transition-colors text-center"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
