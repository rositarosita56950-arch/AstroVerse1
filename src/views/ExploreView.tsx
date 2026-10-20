import React, { useState } from 'react';
import {
  Compass, Heart, BookOpen, Calendar, Award, Bot, Sparkles, Send, Trash2, Plus,
  CheckCircle2, XCircle, RefreshCw, MessageSquare, Flame, ShieldAlert, ArrowRight,
  TrendingUp, Users, Brain, Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ZODIAC_SIGNS, getZodiacById } from '../data/zodiacData';
import { LEARNING_MODULES } from '../data/learningModules';
import { ZODIAC_QUIZ_QUESTIONS } from '../data/quizData';
import { COSMIC_CALENDAR_EVENTS } from '../data/cosmicCalendarData';
import {
  loadJournalEntries, saveJournalEntry, deleteJournalEntry, unlockAchievement, UserProfile
} from '../utils/userStore';
import { cosmicAudio } from '../utils/soundEffects';
import { JournalEntry } from '../types';

interface Props {
  userProfile: UserProfile;
}

type SubTab = 'match' | 'journal' | 'academy' | 'calendar' | 'quiz' | 'ai-guide';

export const ExploreView: React.FC<Props> = ({ userProfile }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('match');

  // --- 1. Cosmic Match State ---
  const [sign1Id, setSign1Id] = useState(userProfile.zodiacId || 'leo');
  const [sign2Id, setSign2Id] = useState('sagittarius');

  // --- 2. Cosmic Journal State ---
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => loadJournalEntries());
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [journalMood, setJournalMood] = useState('🌟 Bintang Terang (Optimis)');
  const [journalFeelings, setJournalFeelings] = useState('');
  const [journalGoals, setJournalGoals] = useState('');
  const [journalAffirmation, setJournalAffirmation] = useState('');

  // --- 3. Academy State ---
  const [selectedChapterId, setSelectedChapterId] = useState('ch1');
  const [chapterQuizAnswer, setChapterQuizAnswer] = useState<number | null>(null);

  // --- 4. Quiz State ---
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredMap, setAnsweredMap] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});

  // --- 5. AI Astrology Guide State ---
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Salam kosmik! Saya Aura, Asisten Kosmik AstroVerse. Ada istilah astrologi yang ingin kamu tanyakan, makna planet dalam birth chartmu, atau rahasia elemen zodiak yang ingin kamu pelajari? Tanyakan saja! ✨',
      time: 'Baru saja',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // --- Handlers ---
  const handleSubTabChange = (tab: SubTab) => {
    setActiveSubTab(tab);
    cosmicAudio.playChime('mid');
    if (tab === 'match') unlockAchievement('cosmic_matchmaker');
    if (tab === 'academy') unlockAchievement('academy_scholar');
  };

  // Cosmic Match calculation logic
  const sign1 = getZodiacById(sign1Id);
  const sign2 = getZodiacById(sign2Id);

  const calculateCompatibility = () => {
    const el1 = sign1.element;
    const el2 = sign2.element;

    let baseScore = 75;
    let alchemyTitle = 'Kombinasi Dinamis yang Saling Melengkapi';
    let alchemyDesc = 'Kedua zodiak memiliki perspektif unik yang jika diselaraskan dengan komunikasi terbuka dapat melahirkan kerja sama yang kaya.';

    if (el1 === el2) {
      baseScore = 92;
      alchemyTitle = `Harmoni Elemen Sejenis (${el1} + ${el2})`;
      alchemyDesc = `Memiliki frekuensi dasar yang sama. Kalian secara naluriah memahami ritme kerja, kebutuhan emosional, dan cara pandang satu sama lain.`;
    } else if ((el1 === 'Api' && el2 === 'Udara') || (el1 === 'Udara' && el2 === 'Api')) {
      baseScore = 89;
      alchemyTitle = 'Percikan Ide & Inspirasi yang Saling Mengobarkan (Api + Udara)';
      alchemyDesc = 'Udara memberi ruang bernapas dan gagasan segar bagi Api, sedangkan Api memberi gairah dan keberanian aksi bagi pikiran Udara.';
    } else if ((el1 === 'Tanah' && el2 === 'Air') || (el1 === 'Air' && el2 === 'Tanah')) {
      baseScore = 90;
      alchemyTitle = 'Kesuburan & Kenyamanan yang Menumbuhkan (Tanah + Air)';
      alchemyDesc = 'Tanah menyediakan wadah dan rasa aman yang kokoh, sedangkan Air memberikan kelembutan rasa, empati, dan kehidupan.';
    } else if ((el1 === 'Api' && el2 === 'Air') || (el1 === 'Air' && el2 === 'Api')) {
      baseScore = 72;
      alchemyTitle = 'Dinamika Uap Hangat & Transformasi Intens (Api + Air)';
      alchemyDesc = 'Api mengajarkan keberanian spontan, sedangkan Air mengajarkan kedalaman empati. Kuncinya adalah saling menghargai batas emosi.';
    } else if ((el1 === 'Tanah' && el2 === 'Udara') || (el1 === 'Udara' && el2 === 'Tanah')) {
      baseScore = 74;
      alchemyTitle = 'Pertemuan Teori & Realitas Praktis (Tanah + Udara)';
      alchemyDesc = 'Udara menyumbangkan ide-ide visioner, sementara Tanah menguji kelayakan dan mengubahnya menjadi rencana konkret.';
    }

    // Specific match variations
    const communicationScore = Math.min(98, baseScore + (sign1.rulingPlanet === 'Merkurius' || sign2.rulingPlanet === 'Merkurius' ? 6 : -2));
    const friendshipScore = Math.min(99, baseScore + 3);
    const workScore = Math.min(96, baseScore - 2);
    const emotionalScore = Math.min(98, baseScore - 4);

    return {
      totalScore: baseScore,
      communicationScore,
      friendshipScore,
      workScore,
      emotionalScore,
      alchemyTitle,
      alchemyDesc,
    };
  };

  const matchResult = calculateCompatibility();

  // Journal Submit
  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalFeelings.trim()) return;

    const todayStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const updated = saveJournalEntry({
      date: todayStr,
      moodEmoji: journalMood.split(' ')[0] || '✨',
      moodName: journalMood,
      feelingsText: journalFeelings,
      experiencesAndGoals: journalGoals || 'Melangkah selaras dengan intuisi hari ini.',
      positiveAffirmation: journalAffirmation || 'Aku menerima diriku apa adanya dan bersyukur atas setiap langkah proses kehidupanku.',
      cosmicTags: ['Refleksi', 'Keseimbangan', userZodiacId],
    });

    setJournalEntries(updated);
    setJournalFeelings('');
    setJournalGoals('');
    setJournalAffirmation('');
    setShowNewEntryForm(false);
    cosmicAudio.playCelebration();
  };

  const handleDeleteJournal = (id: string) => {
    const updated = deleteJournalEntry(id);
    setJournalEntries(updated);
  };

  // Quiz Answer Handler
  const handleAnswerQuiz = (optionIdx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(optionIdx);

    const question = ZODIAC_QUIZ_QUESTIONS[currentQuizIndex];
    const isCorrect = optionIdx === question.correctIndex;

    setAnsweredMap((prev) => ({
      ...prev,
      [currentQuizIndex]: { selected: optionIdx, isCorrect },
    }));

    if (isCorrect) {
      setQuizScore((prev) => prev + 10);
      cosmicAudio.playChime('high');
    } else {
      cosmicAudio.playChime('low');
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < ZODIAC_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      cosmicAudio.playChime('mid');
    } else {
      setQuizCompleted(true);
      cosmicAudio.playCelebration();
      unlockAchievement('quiz_prodigy');
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
    setAnsweredMap({});
  };

  // AI Chat Submit
  const handleSendAiMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || chatInput;
    if (!promptToSend.trim() || isAiLoading) return;

    const userMsg = {
      role: 'user' as const,
      text: promptToSend,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setChatInput('');
    setIsAiLoading(true);
    unlockAchievement('aura_converser');

    try {
      const res = await fetch('/api/gemini/astrology-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          userZodiac: userProfile.zodiacId,
          userBirthData: {
            birthDate: userProfile.birthDate,
            birthCity: userProfile.birthCity,
          },
        }),
      });

      const data = await res.json();
      const replyText = data.reply || 'Maaf, energi kosmik sedang tenang saat ini. Silakan coba tanyakan kembali seputar astrologi!';

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: replyText,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      cosmicAudio.playChime('high');
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Pesan kosmik: Jadikan astrologi sebagai cermin refleksi diri. Setiap insan adalah penentu jalannya sendiri. ✨',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const userZodiacId = userProfile.zodiacId;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-cosmic text-white">
          Jelajah Kosmik AstroVerse
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Uji kecocokan zodiak, simpan refleksi di jurnal pribadi, pelajari modul akademi, ikuti kuis, dan konsultasi dengan AI Guide.
        </p>
      </div>

      {/* Sub-Navigation Tabs Segmented Control */}
      <div className="flex items-center gap-1.5 p-1 bg-purple-950/60 rounded-2xl border border-purple-800/40 overflow-x-auto">
        {[
          { id: 'match', label: 'Cosmic Match', icon: Heart },
          { id: 'journal', label: 'Jurnal Pribadi', icon: BookOpen },
          { id: 'academy', label: 'Belajar Astrologi', icon: Award },
          { id: 'calendar', label: 'Kalender Kosmik', icon: Calendar },
          { id: 'quiz', label: 'Kuis Zodiak', icon: Sparkles },
          { id: 'ai-guide', label: 'Aura AI Guide', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSubTabChange(tab.id as SubTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. COSMIC MATCH (Kecocokan Zodiak) */}
      {/* ======================================================== */}
      {activeSubTab === 'match' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-[#120828]/90 border border-purple-800/40 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                Alkimia Energi Dua Tanda
              </span>
              <h2 className="text-xl font-bold font-serif-cosmic text-white">
                Analisis Keselarasan Zodiak
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pilih dua zodiak untuk melihat dinamika komunikasi, pertemanan, dan kerja sama timbal balik.
              </p>
            </div>

            {/* Selectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sign 1 */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                <label className="text-xs font-semibold text-amber-300 flex items-center justify-between">
                  <span>Zodiak Pertama</span>
                  <span className="text-[11px] text-slate-400 font-normal">Elemen {sign1.element}</span>
                </label>
                <select
                  value={sign1Id}
                  onChange={(e) => setSign1Id(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#190d38] border border-purple-700/50 text-white font-medium text-xs focus:outline-none focus:border-amber-400"
                >
                  {ZODIAC_SIGNS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.symbol} {s.name} ({s.dates})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-300 italic pt-1">
                  "{sign1.tagline}"
                </div>
              </div>

              {/* Sign 2 */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                <label className="text-xs font-semibold text-pink-300 flex items-center justify-between">
                  <span>Zodiak Kedua</span>
                  <span className="text-[11px] text-slate-400 font-normal">Elemen {sign2.element}</span>
                </label>
                <select
                  value={sign2Id}
                  onChange={(e) => setSign2Id(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#190d38] border border-purple-700/50 text-white font-medium text-xs focus:outline-none focus:border-amber-400"
                >
                  {ZODIAC_SIGNS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.symbol} {s.name} ({s.dates})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-300 italic pt-1">
                  "{sign2.tagline}"
                </div>
              </div>
            </div>

            {/* Score & Alchemy Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#180a36] to-[#0c071d] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{matchResult.alchemyTitle}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-cosmic text-white">
                  {sign1.name} & {sign2.name}
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {matchResult.alchemyDesc}
                </p>
              </div>

              {/* Big Score Badge */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-900/40 border border-amber-400/40 min-w-[130px] shrink-0">
                <span className="text-3xl font-extrabold text-amber-300 font-mono">
                  {matchResult.totalScore}%
                </span>
                <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider mt-0.5">
                  Tingkat Keselarasan
                </span>
              </div>
            </div>

            {/* 4 Dimension Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-sky-400" />
                    Komunikasi & Pemikiran
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{matchResult.communicationScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-sky-400 h-2 rounded-full transition-all duration-700" style={{ width: `${matchResult.communicationScore}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-pink-400" />
                    Pertemanan & Loyalitas
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{matchResult.friendshipScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-pink-400 h-2 rounded-full transition-all duration-700" style={{ width: `${matchResult.friendshipScore}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Kerja Sama & Produktivitas
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{matchResult.workScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full transition-all duration-700" style={{ width: `${matchResult.workScore}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400" />
                    Kedekatan Emosional
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{matchResult.emotionalScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-rose-400 h-2 rounded-full transition-all duration-700" style={{ width: `${matchResult.emotionalScore}%` }} />
                </div>
              </div>
            </div>

            {/* Ethical match disclaimer */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Hubungan AstroVerse:</strong> Kecocokan zodiak hanyalah gambaran umum kecenderungan energi. Kunci keharmonisan sejati selalu terletak pada komunikasi yang jujur, empati, rasa saling menghormati, dan kedewasaan pribadi masing-masing individu.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. COSMIC JOURNAL (Jurnal Pribadi) */}
      {/* ======================================================== */}
      {activeSubTab === 'journal' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top action header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-cosmic text-white">
                Jurnal Kosmik Pribadi
              </h2>
              <p className="text-xs text-slate-400">
                Catat perasaan, pengalaman berharga, dan afirmasi positif harianmu dengan aman di perangkatmu.
              </p>
            </div>
            <button
              onClick={() => setShowNewEntryForm(!showNewEntryForm)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-500/20 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showNewEntryForm ? 'Tutup Formulir' : 'Tulis Jurnal Baru'}</span>
            </button>
          </div>

          {/* New Entry Form */}
          {showNewEntryForm && (
            <div className="p-6 rounded-3xl bg-[#140a2e]/95 border border-amber-500/30 shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Entri Refleksi Baru</span>
              </div>

              <form onSubmit={handleSaveJournal} className="space-y-4 text-xs">
                {/* Mood Selector */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Suasana Hati Saat Menulis:</label>
                  <select
                    value={journalMood}
                    onChange={(e) => setJournalMood(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="🌟 Bintang Terang (Optimis & Penuh Daya)">🌟 Bintang Terang (Optimis & Penuh Daya)</option>
                    <option value="🌙 Tenang Seperti Bulan (Reflektif & Damai)">🌙 Tenang Seperti Bulan (Reflektif & Damai)</option>
                    <option value="🌀 Badai Nebula (Penat & Banyak Pikiran)">🌀 Badai Nebula (Penat & Banyak Pikiran)</option>
                    <option value="🔥 Kobaran Api (Bersemangat Eksekusi)">🔥 Kobaran Api (Bersemangat Eksekusi)</option>
                    <option value="🌊 Samudra Dalam (Sensitif & Empatis)">🌊 Samudra Dalam (Sensitif & Empatis)</option>
                    <option value="🍃 Udara Segar (Pikiran Terbuka & Ingin Belajar)">🍃 Udara Segar (Pikiran Terbuka & Ingin Belajar)</option>
                  </select>
                </div>

                {/* Feelings textarea */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Apa yang sedang kamu rasakan hari ini?</label>
                  <textarea
                    required
                    rows={3}
                    value={journalFeelings}
                    onChange={(e) => setJournalFeelings(e.target.value)}
                    placeholder="Ceritakan perasaanmu dengan jujur tanpa ada yang menghakimi..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Experiences and Goals */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Pengalaman Berharga & Tujuan Mendatang:</label>
                  <textarea
                    rows={2}
                    value={journalGoals}
                    onChange={(e) => setJournalGoals(e.target.value)}
                    placeholder="Momen apa yang kamu syukuri hari ini? Apa niat langkahmu selanjutnya?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Positive Affirmation */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Afirmasi Positif Hari Ini:</label>
                  <input
                    type="text"
                    value={journalAffirmation}
                    onChange={(e) => setJournalAffirmation(e.target.value)}
                    placeholder="Contoh: Aku kuat, tenang, dan melangkah dengan rasa syukur."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md"
                  >
                    Simpan ke Jurnal Kosmik
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewEntryForm(false)}
                    className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Entries Feed */}
          {journalEntries.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#120828]/60 border border-purple-900/40 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-300">Belum Ada Catatan Jurnal</h3>
              <p className="text-xs text-slate-400">
                Klik tombol "Tulis Jurnal Baru" di atas untuk menorehkan refleksi pertamamu.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-3xl bg-[#110826]/85 border border-purple-800/30 hover:border-purple-600/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-base">{entry.moodEmoji}</span>
                      <span className="font-semibold text-slate-200">{entry.moodName}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{entry.date}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteJournal(entry.id)}
                      title="Hapus Catatan Ini"
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {entry.feelingsText}
                  </p>

                  {entry.experiencesAndGoals && (
                    <div className="text-xs text-slate-300 bg-purple-950/30 p-3 rounded-xl border border-purple-900/40">
                      <strong className="text-amber-300/90 block mb-0.5">Tujuan & Pengalaman:</strong>
                      {entry.experiencesAndGoals}
                    </div>
                  )}

                  {entry.positiveAffirmation && (
                    <div className="text-xs text-amber-200 italic bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                      ✨ "{entry.positiveAffirmation}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. COSMIC ACADEMY (Belajar Astrologi) */}
      {/* ======================================================== */}
      {activeSubTab === 'academy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          {/* Chapter navigation sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 p-4 rounded-3xl bg-[#120828]/90 border border-purple-800/40 space-y-2">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider px-2 block mb-2">
              Daftar Modul Belajar
            </span>
            {LEARNING_MODULES.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapterId(ch.id);
                    setChapterQuizAnswer(null);
                    cosmicAudio.playChime('low');
                  }}
                  className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="line-clamp-1">{ch.title}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                    {ch.readTime}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chapter Content Reader (8 cols on lg) */}
          {(() => {
            const currentChapter = LEARNING_MODULES.find((c) => c.id === selectedChapterId) || LEARNING_MODULES[0];
            return (
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#110826]/90 border border-purple-800/40 space-y-6">
                <div>
                  <span className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                    Modul Edukasi Astrologi Modern
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-cosmic text-white mt-1">
                    {currentChapter.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentChapter.subtitle} · {currentChapter.readTime}
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentChapter.sections.map((sec, i) => (
                    <div key={i} className="space-y-2.5">
                      <h3 className="text-sm sm:text-base font-bold text-amber-200 font-serif-cosmic">
                        {sec.heading}
                      </h3>
                      <p>{sec.content}</p>

                      {sec.bulletPoints && (
                        <ul className="space-y-1.5 list-disc list-inside text-slate-300 pl-1 text-xs">
                          {sec.bulletPoints.map((bp, j) => (
                            <li key={j}>{bp}</li>
                          ))}
                        </ul>
                      )}

                      {sec.cosmicTip && (
                        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{sec.cosmicTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chapter Quick Quiz */}
                <div className="p-5 rounded-2xl bg-purple-950/30 border border-amber-500/30 space-y-3">
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Uji Pemahaman Singkat
                  </div>
                  <p className="text-xs font-medium text-white">
                    {currentChapter.quickQuiz.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentChapter.quickQuiz.options.map((opt, optIdx) => {
                      const isAnswered = chapterQuizAnswer !== null;
                      const isChosen = chapterQuizAnswer === optIdx;
                      const isCorrect = optIdx === currentChapter.quickQuiz.correctIndex;

                      let btnStyle = 'border-purple-800/50 bg-[#160b36] hover:border-amber-400 text-slate-200';
                      if (isAnswered) {
                        if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                        else if (isChosen) btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => {
                            setChapterQuizAnswer(optIdx);
                            if (isCorrect) {
                              cosmicAudio.playCelebration();
                            } else {
                              cosmicAudio.playChime('low');
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-colors ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {chapterQuizAnswer !== null && (
                    <div className="text-xs text-slate-300 pt-2 border-t border-purple-900/40 animate-fadeIn">
                      {currentChapter.quickQuiz.feedback}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. COSMIC CALENDAR (Kalender Kosmik) */}
      {/* ======================================================== */}
      {activeSubTab === 'calendar' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-cosmic text-white">
              Kalender Kosmik & Fase Langit
            </h2>
            <p className="text-xs text-slate-400">
              Menampilkan fase Bulan, hujan meteor, pergantian musim matahari, dan tanggal penting astronomis dengan pemisahan fakta ilmiah dan interpretasi simbolik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COSMIC_CALENDAR_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-3xl bg-[#120828]/85 border border-purple-800/30 hover:border-amber-400/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-300 font-semibold">{evt.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                      evt.type === 'astronomical'
                        ? 'border-sky-500/40 text-sky-300 bg-sky-500/10'
                        : 'border-purple-500/40 text-purple-300 bg-purple-500/10'
                    }`}>
                      {evt.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-serif-cosmic">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-900/40 space-y-2 text-xs">
                  {evt.scientificFact && (
                    <div className="p-2.5 rounded-xl bg-sky-950/20 border border-sky-500/20 text-sky-200">
                      🔬 {evt.scientificFact}
                    </div>
                  )}
                  {evt.astrologicalReflection && (
                    <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200">
                      ✨ {evt.astrologicalReflection}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. ZODIAC QUIZ (Kuis Pengetahuan Zodiak) */}
      {/* ======================================================== */}
      {activeSubTab === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
          {!quizCompleted ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#120828]/95 border border-purple-800/40 shadow-xl space-y-6">
              {/* Progress & Category */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-purple-900/40">
                <span className="text-amber-300 font-semibold uppercase tracking-wider">
                  Kuis Kosmik: {ZODIAC_QUIZ_QUESTIONS[currentQuizIndex].category}
                </span>
                <span className="text-slate-400 font-mono">
                  Soal {currentQuizIndex + 1} / {ZODIAC_QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / ZODIAC_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h2 className="text-lg sm:text-xl font-bold font-serif-cosmic text-white leading-relaxed">
                {ZODIAC_QUIZ_QUESTIONS[currentQuizIndex].question}
              </h2>

              {/* Options */}
              <div className="space-y-2.5">
                {ZODIAC_QUIZ_QUESTIONS[currentQuizIndex].options.map((opt, idx) => {
                  const isAnswered = selectedOption !== null;
                  const isCorrect = idx === ZODIAC_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                  const isSelected = selectedOption === idx;

                  let style = 'border-purple-800/50 bg-[#160b36] hover:border-amber-400 text-slate-200';
                  if (isAnswered) {
                    if (isCorrect) style = 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold';
                    else if (isSelected) style = 'border-rose-500 bg-rose-950/50 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerQuiz(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button */}
              {selectedOption !== null && (
                <div className="pt-4 border-t border-purple-900/40 space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-300 block mb-1">Penjelasan:</strong>
                    {ZODIAC_QUIZ_QUESTIONS[currentQuizIndex].explanation}
                  </div>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{currentQuizIndex < ZODIAC_QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed Card */
            <div className="p-8 rounded-3xl bg-[#120828]/95 border border-amber-500/40 shadow-2xl text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-3xl mx-auto text-amber-300">
                🏆
              </div>

              <div className="space-y-1">
                <span className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                  Kuis Selesai!
                </span>
                <h2 className="text-2xl font-bold font-serif-cosmic text-white">
                  Skor Kosmikmu: {quizScore} / 100
                </h2>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {quizScore >= 80
                    ? 'Luar biasa! Pengetahuan astrologi dan astronomimu sangat mendalam layaknya seorang astronomer sejati!'
                    : 'Bagus sekali! Terus jelajahi modul di Akademi Astrologi untuk memperdalam wawasan kosmikmu.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs text-slate-300">
                🎉 Lencana baru terbuka: <strong>Ahli Zodiak (Quiz Master)</strong>!
              </div>

              <button
                onClick={handleResetQuiz}
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. AURA AI ASTROLOGY GUIDE */}
      {/* ======================================================== */}
      {activeSubTab === 'ai-guide' && (
        <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#150a32] to-[#0c071d] border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl text-amber-300 shrink-0">
                🤖
              </div>
              <div>
                <h2 className="text-lg font-bold font-serif-cosmic text-white flex items-center gap-1.5">
                  <span>Aura — Asisten Kosmik AstroVerse</span>
                  <span className="text-[10px] text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 font-sans font-normal">
                    AI Guide
                  </span>
                </h2>
                <p className="text-xs text-slate-300">
                  Konsultasikan istilah astrologi, makna aspek planet, dan refleksi batin dengan bahasa santun dan mendidik.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 py-1 text-[11px]">Ide pertanyaan:</span>
            {[
              'Apa arti The Big Three dalam birth chart?',
              'Mengapa Merkurius retrograde sering dibahas?',
              'Bagaimana cara membaca aspek Trine vs Square?',
              'Apa makna Rumah ke-10 dalam karir?',
            ].map((quickQ, i) => (
              <button
                key={i}
                onClick={() => handleSendAiMessage(undefined, quickQ)}
                className="px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-800/40 hover:border-amber-400/60 text-slate-300 hover:text-white transition-colors text-xs whitespace-nowrap"
              >
                {quickQ}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="p-4 sm:p-6 rounded-3xl bg-[#110826]/90 border border-purple-800/40 shadow-xl space-y-4 max-h-[460px] overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs sm:text-sm ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 text-sm">
                    ✦
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-lg leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                      : 'bg-purple-950/50 border border-purple-800/40 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[10px] mt-2 block ${
                      msg.role === 'user' ? 'text-slate-900/70 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex gap-3 text-xs items-center text-amber-300 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-sm">
                  ✦
                </div>
                <span>Aura sedang menelaah petunjuk kosmik...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendAiMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Tanyakan apa saja seputar zodiak atau astrologi..."
              className="flex-1 px-4 py-3 rounded-2xl bg-[#13092a] border border-purple-800/50 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={isAiLoading || !chatInput.trim()}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Kirim</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
