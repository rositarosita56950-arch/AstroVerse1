import React, { useState } from 'react';
import { X, Sparkles, Share2, Check, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/soundEffects';
import { unlockAchievement } from '../utils/userStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userZodiac?: string;
}

const CARDS_DECK = [
  {
    title: 'Cahaya Intuisi (Intuition Light)',
    symbol: '☾ ✦ ☽',
    affirmation: 'Setiap jawaban yang kucari telah tersimpan dengan damai dalam intuisiku. Aku mempercayai bisikan tenang hatiku.',
    guidance: 'Hari ini semesta mengundangmu untuk mengurangi kebisingan eksternal. Duduklah 5 menit dalam keheningan; ide paling jernih sering muncul di saat pikiran tidak memaksakan jawaban.',
    energy: 'Reflektif & Menyejukkan',
  },
  {
    title: 'Api Keberanian (Fire of Courage)',
    symbol: '△ ☉ △',
    affirmation: 'Ketakutanku mengecil seiring langkah nyata yang kuambil. Aku melangkah dengan rasa percaya penuh pada diriku.',
    guidance: 'Ada gagasan yang sudah terlalu lama berputar di anganmu. Buat satu langkah kecil nyata hari ini: kirim pesan itu, mulai draf pertama, atau sampaikan kebenaranmu dengan santun.',
    energy: 'Dinamis & Menggerakkan',
  },
  {
    title: 'Akar Harmoni (Grounded Peace)',
    symbol: '◇ ♁ ◇',
    affirmation: 'Aku tidak harus tergesa-gesa untuk menjadi utuh. Kecepatan terbaik adalah langkah yang konsisten dan disyukuri.',
    guidance: 'Lepaskan beban keharusan membuktikan sesuatu kepada orang lain. Nikmati proses pekerjaanmu lapis demi lapis seperti pepohonan yang merawat akarnya di dalam tanah.',
    energy: 'Stabil & Menenangkan',
  },
  {
    title: 'Embun Pengampunan (Embrace of Grace)',
    symbol: '≋ ♓ ≋',
    affirmation: 'Aku memaafkan versi masa laluku yang belum tahu apa yang kuketahui hari ini. Hari ini adalah lembaran suci yang baru.',
    guidance: 'Rasa sakit masa lalu hanyalah bab dalam buku kisahmu, bukan judul keseluruhan hidupmu. Berikan kasih sayang kepada dirimu sendiri tanpa syarat.',
    energy: 'Penyembuhan Batin',
  },
  {
    title: 'Kilau Orisinalitas (Cosmic Spark)',
    symbol: '☿ ♅ ☿',
    affirmation: 'Keunikanku adalah caraku memberi warna pada dunia. Aku bangga mengekspresikan pemikiranku secara otentik.',
    guidance: 'Jangan takut jika pandanganmu berbeda dari mayoritas lingkunganmu. Inovasi terbesar dalam sejarah selalu berawal dari satu orang yang berani berpikir lain.',
    energy: 'Visioner & Cerdas',
  },
];

export const DailyCosmicCardModal: React.FC<Props> = ({ isOpen, onClose, userZodiac }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCard = CARDS_DECK[cardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    cosmicAudio.playChime('high');
    unlockAchievement('oracle_seeker');

    if (!isFlipped) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#c084fc', '#38bdf8'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % CARDS_DECK.length);
    cosmicAudio.playChime('mid');
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `✨ Kartu Kosmik Harian AstroVerse ✨\n"${currentCard.title}"\n\nAfirmasi: "${currentCard.affirmation}"\n\nPesan Semesta: ${currentCard.guidance}\n\nJelajahi kisah kosmikmu di AstroVerse!`;
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#180e36] to-[#0c071d] border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-300 tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Oracle Kartu Kosmik Harian</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Ketuk kartu untuk mengungkap pesan semesta hari ini
        </p>

        {/* 3D Flip Card Container */}
        <div
          onClick={handleFlip}
          className="relative w-full max-w-[260px] aspect-[3/4] cursor-pointer group perspective-1000 my-2"
        >
          <div
            className={`w-full h-full transition-transform duration-700 transform-style-3d relative rounded-2xl shadow-xl ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front side (Oracle Card Back Cover with generated asset) */}
            <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#120826] flex flex-col items-center justify-center p-4 text-center">
              <img
                src="/src/assets/images/cosmic_oracle_card_1792470165606.jpg"
                alt="Kartu Kosmik AstroVerse"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-2xl text-amber-300 mb-2">✦ ☽ ✦</span>
                <span className="text-sm font-semibold tracking-wider text-amber-200 font-serif-cosmic">
                  ASTROVERSE ORACLE
                </span>
                <span className="text-[11px] text-slate-300 mt-2 px-3 py-1 rounded-full bg-black/40 border border-amber-400/30">
                  Ketuk Untuk Membuka
                </span>
              </div>
            </div>

            {/* Back side (Revealed Card Meaning) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-amber-400/70 bg-gradient-to-b from-[#221045] to-[#110724] p-5 flex flex-col justify-between text-left shadow-inner">
              <div>
                <div className="flex items-center justify-between text-amber-300 text-xs font-mono mb-1">
                  <span>{currentCard.symbol}</span>
                  <span className="text-[10px] uppercase tracking-wider text-purple-300">{currentCard.energy}</span>
                </div>
                <h4 className="text-base font-bold text-amber-200 font-serif-cosmic mt-1">
                  {currentCard.title}
                </h4>

                <div className="my-3 p-3 rounded-xl bg-purple-900/30 border border-amber-400/20">
                  <p className="text-xs font-medium text-amber-100 italic">
                    "{currentCard.affirmation}"
                  </p>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {currentCard.guidance}
                </p>
              </div>

              <div className="pt-2 border-t border-purple-800/40 text-[10px] text-slate-400 text-center">
                Refleksi Kosmik · {userZodiac ? `Khusus untuk energi ${userZodiac}` : 'AstroVerse'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4 w-full justify-center">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-slate-700 rounded-xl transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-300" />
                <span>Salin Pesan</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextCard}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
            <span>Kartu Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
};
