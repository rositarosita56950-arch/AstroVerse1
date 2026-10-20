import React, { useState } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';
import { DailyCosmicCardModal } from './components/DailyCosmicCardModal';
import { CosmicMoodModal } from './components/CosmicMoodModal';
import { HomeView } from './views/HomeView';
import { ZodiacCatalogView } from './views/ZodiacCatalogView';
import { BirthChartCalculatorView } from './views/BirthChartCalculatorView';
import { ExploreView } from './views/ExploreView';
import { ProfileView } from './views/ProfileView';
import { loadUserProfile, saveUserProfile, UserProfile } from './utils/userStore';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadUserProfile());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [galaxyMode, setGalaxyMode] = useState<boolean>(userProfile.darkGalaxyMode ?? true);
  const [isDailyCardOpen, setIsDailyCardOpen] = useState(false);
  const [isCosmicMoodOpen, setIsCosmicMoodOpen] = useState(false);

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveUserProfile(newProfile);
  };

  const handleSelectUserZodiac = (zodiacId: string) => {
    const updated = { ...userProfile, zodiacId };
    setUserProfile(updated);
    saveUserProfile(updated);
  };

  return (
    <div className="min-h-screen bg-[#06040d] text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* 1. Animated Cosmic Canvas Starfield */}
      <CosmicBackground galaxyMode={galaxyMode} />

      {/* 2. Top Navigation Bar (Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        galaxyMode={galaxyMode}
        setGalaxyMode={setGalaxyMode}
        onOpenMoodModal={() => setIsCosmicMoodOpen(true)}
        onOpenCardModal={() => setIsDailyCardOpen(true)}
      />

      {/* 3. Main Content Router Viewport */}
      <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto pb-24 md:pb-12">
        {activeTab === 'home' && (
          <HomeView
            userProfile={userProfile}
            setActiveTab={setActiveTab}
            onOpenMoodModal={() => setIsCosmicMoodOpen(true)}
            onOpenCardModal={() => setIsDailyCardOpen(true)}
          />
        )}

        {activeTab === 'zodiac' && (
          <ZodiacCatalogView
            userZodiacId={userProfile.zodiacId}
            onSelectUserZodiac={handleSelectUserZodiac}
          />
        )}

        {activeTab === 'birth-chart' && (
          <BirthChartCalculatorView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView userProfile={userProfile} />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            galaxyMode={galaxyMode}
            setGalaxyMode={setGalaxyMode}
          />
        )}
      </main>

      {/* 4. Quiet Editorial Footer */}
      <footer className="relative z-10 border-t border-purple-950/60 bg-[#06040d]/80 py-6 px-4 text-center text-xs text-slate-400 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-cosmic text-amber-300 font-bold">AstroVerse</span>
            <span>— Jelajahi Kisah Kosmikmu Sendiri</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Tradisi Astrologi Simbolik & Refleksi Batin © {new Date().getFullYear()} AstroVerse
          </div>
        </div>
      </footer>

      {/* 5. Mobile Fixed Bottom Navigation Bar */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 6. Modals */}
      <DailyCosmicCardModal
        isOpen={isDailyCardOpen}
        onClose={() => setIsDailyCardOpen(false)}
        userZodiac={userProfile.zodiacId}
      />

      <CosmicMoodModal
        isOpen={isCosmicMoodOpen}
        onClose={() => setIsCosmicMoodOpen(false)}
      />
    </div>
  );
}
