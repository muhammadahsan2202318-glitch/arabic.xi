import React, { useState, useMemo } from 'react';
import { chaptersData, MufradatItem } from '../data/curriculumData';
import { speakArabic } from '../utils/speech';
import {
  Volume2,
  Star,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Check,
  RefreshCcw,
  Sparkles,
} from 'lucide-react';
import { toggleSaveVocab, SavedVocabData } from '../firebase';

interface FlashcardsViewProps {
  userId: string;
  savedVocabs: SavedVocabData[];
  onRefreshData: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  userId,
  savedVocabs,
  onRefreshData,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  // Aggregate vocabularies
  const allVocabs = useMemo(() => {
    let list: (MufradatItem & { chapterTitle: string; chapterNumber: number })[] = [];
    chaptersData.forEach((ch) => {
      ch.mufradat.forEach((m) => {
        list.push({ ...m, chapterTitle: ch.titleIndo, chapterNumber: ch.number });
      });
    });
    return list;
  }, []);

  const filteredVocabs = useMemo(() => {
    let list = allVocabs;
    if (selectedChapterId !== 'all') {
      list = list.filter((v) => `bab-${v.chapterNumber}` === selectedChapterId);
    }
    if (onlySaved) {
      const savedIds = new Set(savedVocabs.map((s) => s.vocabId));
      list = list.filter((v) => savedIds.has(v.id));
    }
    return list;
  }, [allVocabs, selectedChapterId, onlySaved, savedVocabs]);

  const currentCard = filteredVocabs[currentIndex] || null;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < filteredVocabs.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredVocabs.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredVocabs.length);
    setCurrentIndex(randomIndex);
  };

  const handleToggleStar = async (item: MufradatItem, chapterNumber: number) => {
    try {
      await toggleSaveVocab(userId, {
        vocabId: item.id,
        arabic: item.arabic,
        latin: item.latin,
        meaning: item.meaning,
        chapterId: `bab-${chapterNumber}`,
      });
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const isSaved = currentCard ? savedVocabs.some((s) => s.vocabId === currentCard.id) : false;

  const handleMarkKnown = (id: string) => {
    setKnownIds((prev) => new Set(prev).add(id));
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Hafalan Mandiri Santri
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Flashcard Mufradat Arab</h2>
          <p className="text-xs text-slate-500">
            Latih daya ingat kosa kata dengan metode kartu bolak-balik interaktif dan audio pengucapan.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedChapterId}
            onChange={(e) => {
              setSelectedChapterId(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Semua Bab ({allVocabs.length} kata)</option>
            {chaptersData.map((c) => (
              <option key={c.id} value={c.id}>
                Bab {c.number}: {c.titleIndo}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setOnlySaved(!onlySaved);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              onlySaved
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlySaved ? 'fill-amber-600' : ''}`} />
            <span>Hanya Bintang ({savedVocabs.length})</span>
          </button>
        </div>
      </div>

      {currentCard ? (
        <div className="space-y-6">
          {/* Card Counter & Progress */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <span>
              Kartu <strong className="text-slate-800">{currentIndex + 1}</strong> dari {filteredVocabs.length}
            </span>
            <span>
              Hafal: <strong className="text-emerald-700">{knownIds.size}</strong> kata
            </span>
          </div>

          {/* Flashcard Surface */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[320px] sm:min-h-[360px] bg-white rounded-3xl border-2 border-slate-200 hover:border-emerald-400 p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between select-none"
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Bab {currentCard.chapterNumber} • {currentCard.category}
              </span>

              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => speakArabic(currentCard.arabic)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition cursor-pointer"
                  title="Dengarkan pengucapan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleToggleStar(currentCard, currentCard.chapterNumber)}
                  className={`p-2 rounded-xl transition cursor-pointer ${
                    isSaved
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-100 text-slate-400 hover:text-amber-500'
                  }`}
                  title="Simpan hafalan"
                >
                  <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Card Content: Front vs Back */}
            <div className="text-center py-6 space-y-4">
              {!isFlipped ? (
                /* FRONT: Arabic */
                <div className="space-y-3">
                  <h3 className="font-arabic text-4xl sm:text-5xl font-extrabold text-slate-900 leading-normal">
                    {currentCard.arabic}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Klik kartu untuk melihat arti &amp; contoh</span>
                  </p>
                </div>
              ) : (
                /* BACK: Meaning & Example */
                <div className="space-y-3 animate-in fade-in duration-200">
                  <h3 className="font-arabic text-3xl font-bold text-emerald-900 leading-normal">
                    {currentCard.arabic}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 italic">{currentCard.latin}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{currentCard.meaning}</p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Contoh Kalimat:</span>
                    <p className="font-arabic text-base font-bold text-slate-800 text-right">
                      {currentCard.exampleSentenceArabic}
                    </p>
                    <p className="text-xs text-slate-600 italic">{currentCard.exampleSentenceIndo}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Hint */}
            <div className="text-center text-[11px] text-slate-400">
              {isFlipped ? 'Klik lagi untuk kembali ke bahasa Arab' : 'Ketuk di mana saja untuk membalik kartu'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                title="Acak kartu"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleMarkKnown(currentCard.id)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer shadow-sm shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" />
                <span>Sudah Hafal</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-800">Tidak ada kartu yang ditemukan.</p>
          <p className="text-xs text-slate-500">
            {onlySaved ? 'Kamu belum menandai kosakata berbintang. Buka salah satu bab dan klik ikon bintang!' : 'Pilih filter bab yang lain.'}
          </p>
          {onlySaved && (
            <button
              onClick={() => setOnlySaved(false)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
            >
              Tampilkan Semua Kosakata
            </button>
          )}
        </div>
      )}
    </div>
  );
};
