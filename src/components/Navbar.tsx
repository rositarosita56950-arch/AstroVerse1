import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { cosmicAudio } from '../utils/soundEffects';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  galaxyMode: boolean;
  setGalaxyMode: (val: boolean) => void;
  onOpenMoodModal: () => void;
  onOpenCardModal: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  galaxyMode,
  setGalaxyMode,
  onOpenMoodModal,
  onOpenCardModal,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleAudio = () => {
    const status = cosmicAudio.toggleAmbientMusic();
    setIsPlayingMusic(status);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070410]/85 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-16">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => {
            setActiveTab('home');
            cosmicAudio.playChime('low');
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif-cosmic flex items-center gap-1.5 whitespace-nowrap shrink-0">
            AstroVerse
            <span className="text-amber-400 text-sm">✦</span>
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links for Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              setActiveTab('home');
              cosmicAudio.playChime('low');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'home'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => {
              setActiveTab('zodiac');
              cosmicAudio.playChime('mid');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'zodiac'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            12 Zodiak
          </button>
          <button
            onClick={() => {
              setActiveTab('birth-chart');
              cosmicAudio.playChime('mid');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'birth-chart'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Birth Chart
          </button>
          <button
            onClick={() => {
              setActiveTab('explore');
              cosmicAudio.playChime('mid');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'explore'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Jelajah Kosmik
          </button>
          <button
            onClick={() => {
              setActiveTab('profile');
              cosmicAudio.playChime('low');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'profile'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Profil
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCardModal}
            title="Buka Kartu Kosmik Harian"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kartu Hari Ini</span>
          </button>

          <button
            onClick={handleToggleAudio}
            title={isPlayingMusic ? 'Heningkan Musik Ambience' : 'Putar Musik Kosmik 432Hz'}
            aria-label="Toggle Musik Kosmik"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-purple-800/40 text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
          >
            {isPlayingMusic ? (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            onClick={() => {
              setGalaxyMode(!galaxyMode);
              cosmicAudio.playChime('low');
            }}
            title={galaxyMode ? 'Mode Galaksi Gelap Aktif' : 'Mode Galaksi Redup'}
            aria-label="Toggle Galaksi"
            className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
              galaxyMode
                ? 'border-purple-600/50 bg-purple-950/60 text-purple-300'
                : 'border-slate-800 bg-slate-900/50 text-slate-400'
            }`}
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
