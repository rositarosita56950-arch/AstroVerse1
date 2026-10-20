import React from 'react';
import { Sparkles, Compass, Moon, Orbit, User } from 'lucide-react';
import { cosmicAudio } from '../utils/soundEffects';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNavigation: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Sparkles },
    { id: 'zodiac', label: 'Zodiak', icon: Orbit },
    { id: 'birth-chart', label: 'Birth Chart', icon: Moon },
    { id: 'explore', label: 'Jelajah', icon: Compass },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070410]/95 backdrop-blur-lg border-t border-purple-900/40 pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                cosmicAudio.playChime(isActive ? 'low' : 'mid');
              }}
              className={`min-h-[48px] flex flex-col items-center justify-center transition-colors relative ${
                isActive ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[62px]">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
