import React, { useState, useEffect } from 'react';
import { Chapter } from '../data/curriculumData';
import { speakArabic } from '../utils/speech';
import {
  ArrowLeft,
  Volume2,
  Star,
  BookOpen,
  MessageSquare,
  FileText,
  Scale,
  Award,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  Eye,
  EyeOff,
  PenSquare,
  Save,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  saveChapterProgress,
  saveQuizResult,
  toggleSaveVocab,
  saveStudyNote,
  deleteStudyNote,
  SavedVocabData,
  StudyNoteData,
} from '../firebase';

interface ChapterDetailViewProps {
  chapter: Chapter;
  userId: string;
  savedVocabs: SavedVocabData[];
  studyNotes: StudyNoteData[];
  onBack: () => void;
  onRefreshData: () => void;
  onOpenAITutorWithTopic: (topic: string) => void;
}

export const ChapterDetailView: React.FC<ChapterDetailViewProps> = ({
  chapter,
  userId,
  savedVocabs,
  studyNotes,
  onBack,
  onRefreshData,
  onOpenAITutorWithTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'mufradat' | 'hiwar' | 'qiraah' | 'qawaid' | 'quiz' | 'notes'>('mufradat');
  const [mufradatSearch, setMufradatSearch] = useState('');
  const [mufradatCategory, setMufradatCategory] = useState<string>('all');
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Notes state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Mark section visited
  useEffect(() => {
    saveChapterProgress(userId, chapter.id, activeTab);
  }, [activeTab, chapter.id, userId]);

  // Audio helper
  const handlePlayAudio = (id: string, text: string) => {
    setCurrentlyPlayingAudio(id);
    speakArabic(text, () => {
      setCurrentlyPlayingAudio(null);
    });
  };

  // Toggle bookmark vocab
  const handleToggleVocab = async (item: { id: string; arabic: string; latin: string; meaning: string }) => {
    try {
      await toggleSaveVocab(userId, {
        vocabId: item.id,
        arabic: item.arabic,
        latin: item.latin,
        meaning: item.meaning,
        chapterId: chapter.id,
      });
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const isVocabSaved = (id: string) => savedVocabs.some((v) => v.vocabId === id);

  // Submit Quiz
  const handleSubmitQuiz = async () => {
    let correct = 0;
    chapter.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / chapter.quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }

    try {
      await saveQuizResult(userId, {
        quizId: `quiz_${chapter.id}`,
        chapterId: chapter.id,
        score,
        totalQuestions: chapter.quiz.length,
        correctAnswers: correct,
        passed: score >= 70,
        completedAt: new Date().toISOString(),
      });

      // Mark chapter complete if quiz passed
      if (score >= 70) {
        await saveChapterProgress(userId, chapter.id, 'quiz', true);
      }
      onRefreshData();
    } catch (e) {
      console.error('Failed to save quiz result:', e);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  // Save student note
  const handleSaveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    try {
      setIsSavingNote(true);
      await saveStudyNote(userId, {
        noteId: `note_${Date.now()}`,
        chapterId: chapter.id,
        title: noteTitle.trim(),
        content: noteContent.trim(),
      });
      setNoteTitle('');
      setNoteContent('');
      onRefreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteStudyNote(userId, noteId);
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const currentChapterNotes = studyNotes.filter((n) => n.chapterId === chapter.id);

  // Categories for mufradat
  const categories = Array.from(new Set(chapter.mufradat.map((m) => m.category)));

  const filteredMufradat = chapter.mufradat.filter((m) => {
    const matchesCat = mufradatCategory === 'all' || m.category === mufradatCategory;
    const matchesSearch =
      m.arabic.includes(mufradatSearch) ||
      m.latin.toLowerCase().includes(mufradatSearch.toLowerCase()) ||
      m.meaning.toLowerCase().includes(mufradatSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Bab</span>
        </button>

        <button
          onClick={() => onOpenAITutorWithTopic(chapter.titleIndo)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Konsultasi Bab ini dengan AI Ustadz Bayan</span>
        </button>
      </div>

      {/* Chapter Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-800/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700/60">
                Bab {chapter.number} • Semester {chapter.semester}
              </span>
              <span className="text-xs text-emerald-200/80">{chapter.theme}</span>
            </div>
            <h2 className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-300 leading-normal">
              {chapter.titleArabic}
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {chapter.titleIndo}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {chapter.summary}
            </p>
          </div>

          <div className="shrink-0 bg-emerald-950/60 border border-emerald-700/40 p-4 rounded-2xl text-center space-y-1 backdrop-blur-xs">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Kaidah Nahwu</span>
            <p className="text-xs font-bold text-white">{chapter.qawaid.title}</p>
            <p className="text-[11px] text-emerald-200/80">{chapter.qawaid.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'mufradat', label: 'المفردات (Kosakata)', icon: BookOpen },
          { id: 'hiwar', label: 'الحوار (Percakapan)', icon: MessageSquare },
          { id: 'qiraah', label: 'القراءة (Membaca)', icon: FileText },
          { id: 'qawaid', label: 'القواعد (Tata Bahasa)', icon: Scale },
          { id: 'quiz', label: 'الاختبار (Kuis Bab)', icon: Award },
          { id: 'notes', label: `Catatan Santri (${currentChapterNotes.length})`, icon: PenSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/30'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MUFRADAT */}
      {activeTab === 'mufradat' && (
        <div className="space-y-6">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kata Arab, latin, atau arti..."
                value={mufradatSearch}
                onChange={(e) => setMufradatSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setMufradatCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  mufradatCategory === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Kategori
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMufradatCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    mufradatCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mufradat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMufradat.map((item) => {
              const saved = isVocabSaved(item.id);
              const isPlaying = currentlyPlayingAudio === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 shadow-xs hover:shadow-md transition space-y-4 relative"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Audio Button */}
                      <button
                        onClick={() => handlePlayAudio(item.id, item.arabic)}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isPlaying
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'
                        }`}
                        title="Dengarkan pelafalan bahasa Arab"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Bookmark Star Button */}
                      <button
                        onClick={() => handleToggleVocab(item)}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          saved
                            ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                            : 'bg-slate-100 hover:bg-amber-50 text-slate-400 hover:text-amber-500'
                        }`}
                        title={saved ? 'Hapus dari hafalan tersimpan' : 'Simpan ke daftar hafalan santri'}
                      >
                        <Star className={`w-4 h-4 ${saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Word & Meaning */}
                  <div>
                    <h4 className="font-arabic text-3xl font-bold text-slate-900 leading-normal text-right">
                      {item.arabic}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium italic mt-1">{item.latin}</p>
                    <p className="text-sm font-bold text-emerald-900 mt-0.5">{item.meaning}</p>
                  </div>

                  {/* Example Sentence Box */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contoh Kalimat:</span>
                      <button
                        onClick={() => handlePlayAudio(`ex_${item.id}`, item.exampleSentenceArabic)}
                        className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Dengar Kalimat</span>
                      </button>
                    </div>
                    <p className="font-arabic text-base text-slate-800 text-right leading-relaxed">
                      {item.exampleSentenceArabic}
                    </p>
                    <p className="text-xs text-slate-600 italic">{item.exampleSentenceIndo}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMufradat.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-600">Tidak ada kosakata yang cocok.</p>
              <p className="text-xs text-slate-400 mt-1">Coba kata kunci lain atau bersihkan filter.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HIWAR */}
      {activeTab === 'hiwar' && (
        <div className="space-y-6">
          {/* Setting & Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Latar Tempat / Konteks
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{chapter.hiwar.titleIndo}</h4>
              <p className="text-xs text-slate-500">{chapter.hiwar.setting}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTranslations(!showTranslations)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                {showTranslations ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showTranslations ? 'Sembunyikan Terjemahan' : 'Tampilkan Terjemahan'}</span>
              </button>

              <button
                onClick={() => {
                  const fullText = chapter.hiwar.dialogue.map((d) => d.textArabic).join(' . ');
                  handlePlayAudio('all_dialogue', fullText);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
              >
                <Play className="w-4 h-4" />
                <span>Putar Semua Dialog</span>
              </button>
            </div>
          </div>

          {/* Dialogue Speeches */}
          <div className="space-y-4">
            {chapter.hiwar.dialogue.map((line, idx) => {
              const isEven = idx % 2 === 0;
              const isPlaying = currentlyPlayingAudio === `line_${idx}`;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 sm:gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Speaker Avatar */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl shrink-0">
                    {line.avatar}
                  </div>

                  {/* Speech Bubble */}
                  <div
                    className={`max-w-2xl flex-1 rounded-2xl p-4 sm:p-5 shadow-xs transition ${
                      isEven
                        ? 'bg-white border border-slate-200 text-slate-900'
                        : 'bg-emerald-50/80 border border-emerald-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800">{line.speakerIndo}</span>
                        <span className="font-arabic text-xs font-semibold text-slate-500">
                          ({line.speakerArabic})
                        </span>
                      </div>

                      <button
                        onClick={() => handlePlayAudio(`line_${idx}`, line.textArabic)}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          isPlaying
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'
                        }`}
                        title="Dengarkan ucapan"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-arabic text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed text-right mb-2">
                      {line.textArabic}
                    </p>

                    {showTranslations && (
                      <div className="pt-2 border-t border-slate-100/80 space-y-0.5 text-xs">
                        <p className="text-slate-500 italic">{line.textLatin}</p>
                        <p className="text-slate-700 font-medium">{line.textIndo}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: QIRAAH */}
      {activeTab === 'qiraah' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Teks Qira&apos;ah Naskh
                </span>
                <h4 className="font-arabic text-2xl font-bold text-slate-900 mt-1">{chapter.qiraah.titleArabic}</h4>
                <p className="text-xs text-slate-500 font-semibold">{chapter.qiraah.titleIndo}</p>
              </div>

              <button
                onClick={() => {
                  const fullText = chapter.qiraah.paragraphs.map((p) => p.arabic).join(' . ');
                  handlePlayAudio('full_qiraah', fullText);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengar Audio Bacaan</span>
              </button>
            </div>

            {/* Paragraphs */}
            <div className="space-y-6">
              {chapter.qiraah.paragraphs.map((para, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">Paragraf {idx + 1}</span>
                    <button
                      onClick={() => handlePlayAudio(`para_${idx}`, para.arabic)}
                      className="text-xs text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Putar Paragraf</span>
                    </button>
                  </div>
                  <p className="font-arabic text-2xl sm:text-3xl text-slate-900 text-right leading-loose font-medium">
                    {para.arabic}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 pt-2">
                    {para.indo}
                  </p>
                </div>
              ))}
            </div>

            {/* Spotlight Words */}
            {chapter.qiraah.vocabularySpotlight?.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Kosa Kata Kunci (Spotlight Mufradat)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {chapter.qiraah.vocabularySpotlight.map((spot, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between">
                      <div>
                        <p className="font-arabic text-lg font-bold text-emerald-950">{spot.word}</p>
                        <p className="text-xs text-emerald-800 font-medium">{spot.meaning}</p>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(`spot_${idx}`, spot.word)}
                        className="p-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-100 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: QAWAID */}
      {activeTab === 'qawaid' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ilmu Nahwu &amp; Sharaf Kelas XI
              </span>
              <h4 className="font-arabic text-3xl font-bold text-slate-900 mt-1">{chapter.qawaid.title}</h4>
              <p className="text-sm font-semibold text-slate-700">{chapter.qawaid.subtitle}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{chapter.qawaid.summary}</p>
            </div>

            {/* Formula Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-1 text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">Rumus / Pola Kaidah</span>
              <p className="font-arabic text-2xl font-bold text-emerald-950">{chapter.qawaid.formula}</p>
            </div>

            {/* Explanation Points */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Poin-Poin Kaidah Penting:
              </h5>
              <div className="space-y-2">
                {chapter.qawaid.explanationPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples Breakdown */}
            <div className="space-y-4 pt-2">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Contoh Kalimat &amp; Analisis Kedudukan:
              </h5>
              <div className="space-y-3">
                {chapter.qawaid.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">Contoh {idx + 1}</span>
                      <button
                        onClick={() => handlePlayAudio(`exq_${idx}`, ex.sentenceArabic)}
                        className="text-xs text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Dengar Contoh</span>
                      </button>
                    </div>
                    <p className="font-arabic text-2xl font-bold text-slate-900 text-right leading-normal">
                      {ex.sentenceArabic}
                    </p>
                    <p className="text-xs font-semibold text-slate-700 italic">{ex.meaning}</p>
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900">
                      <strong className="text-emerald-950 font-bold">Analisis I&apos;rab:</strong> {ex.analysis}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Evaluasi Bab {chapter.number}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">Uji Kompetensi &amp; Kuis Pemahaman</h4>
                <p className="text-xs text-slate-500">Jawab butir soal pilihan ganda sesuai kaidah silabus.</p>
              </div>

              {quizSubmitted && quizScore !== null && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
                  <div className="text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-800">Skor Anda</span>
                    <p className="text-2xl font-extrabold text-emerald-900">{quizScore}/100</p>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis</span>
                  </button>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {chapter.quiz.map((q, qIdx) => {
                const userSelected = selectedAnswers[q.id];
                const isAnswered = userSelected !== undefined;
                const isCorrect = userSelected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition ${
                      quizSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-rose-50/50 border-rose-200'
                        : 'bg-slate-50 border-slate-200'
                    } space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Soal {qIdx + 1} dari {chapter.quiz.length}</span>
                      <button
                        onClick={() => handlePlayAudio(q.id, q.questionArabic)}
                        className="text-xs text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Dengar Pertanyaan</span>
                      </button>
                    </div>

                    <p className="font-arabic text-2xl font-bold text-slate-900 text-right leading-normal">
                      {q.questionArabic}
                    </p>
                    <p className="text-xs text-slate-600 font-medium">{q.questionIndo}</p>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelected === optIdx;
                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold';
                          } else if (isChosen) {
                            btnStyle = 'bg-rose-600 border-rose-600 text-white';
                          } else {
                            btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIdx })}
                            className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                          >
                            <span className="font-medium">{opt}</span>
                            <span className="text-[10px] font-bold opacity-80 uppercase ml-2">
                              {['A', 'B', 'C', 'D'][optIdx]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-white/80 border border-slate-200 text-xs text-slate-700">
                        <strong className="text-emerald-800">Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Quiz Action */}
            {!quizSubmitted && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < chapter.quiz.length}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  Kirim Jawaban &amp; Simpan Nilai ke Firestore
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Penyimpanan Cloud Firestore
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">Catatan Belajar Santri untuk {chapter.titleIndo}</h4>
              <p className="text-xs text-slate-500">Tulis ringkasan kaidah, hafalan kosa kata, atau penjelasan dari asatidz.</p>
            </div>

            {/* Note Input Form */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <input
                type="text"
                placeholder="Judul catatan (misal: 'Rumus Isim Majrur Bab 1')..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
              />
              <textarea
                placeholder="Tuliskan catatan atau faedah materi di sini..."
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 bg-white"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  disabled={isSavingNote || !noteTitle.trim() || !noteContent.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingNote ? 'Menyimpan...' : 'Simpan Catatan'}</span>
                </button>
              </div>
            </div>

            {/* List of notes for this chapter */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Catatan Tersimpan ({currentChapterNotes.length})
              </h5>

              {currentChapterNotes.map((note) => (
                <div key={note.noteId} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold text-emerald-950">{note.title}</h6>
                    <button
                      onClick={() => handleDeleteNote(note.noteId)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                      title="Hapus catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                  <span className="text-[10px] text-slate-400 block">
                    Diperbarui: {new Date(note.updatedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              ))}

              {currentChapterNotes.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-6">
                  Belum ada catatan santri untuk bab ini. Tulis catatan pertamamu di atas!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
