import React, { useState } from 'react';
import { Chapter, chaptersData } from '../data/curriculumData';
import { BookOpen, CheckCircle, Clock, ChevronRight, Sparkles, Award } from 'lucide-react';
import { UserProgressData } from '../firebase';

interface ChapterListViewProps {
  progressMap: Record<string, UserProgressData>;
  onSelectChapter: (chapter: Chapter) => void;
  onOpenAITutor: () => void;
  onOpenFlashcards: () => void;
}

export const ChapterListView: React.FC<ChapterListViewProps> = ({
  progressMap,
  onSelectChapter,
  onOpenAITutor,
  onOpenFlashcards,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<'all' | 1 | 2>('all');

  const filteredChapters = chaptersData.filter((chap) => {
    if (selectedSemester === 'all') return true;
    return chap.semester === selectedSemester;
  });

  const completedCount = Object.values(progressMap).filter((p) => p.isCompleted).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-emerald-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Madrasah Aliyah Darul Faqih Indonesia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            مَرْحَبًا بِكُمْ فِي تَعَلُّمِ اللُّغَةِ العَرَبِيَّةِ
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Kurikulum Terpadu Kelas XI MA: Penguasaan kosa kata tematik, kemahiran menyimak dan berbicara (hiwar), kaidah tata bahasa nahwu-sharaf, serta asisten cerdas AI Ustadz Bayan.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectChapter(chaptersData[0])}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Mulai Belajar Bab 1</span>
            </button>
            <button
              onClick={onOpenAITutor}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-emerald-300 border border-emerald-600/40 font-semibold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tanya AI Ustadz Bayan</span>
            </button>
            <button
              onClick={onOpenFlashcards}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-teal-600/40 font-semibold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Hafalan Flashcards</span>
            </button>
          </div>
        </div>

        {/* Quick Progress Badge */}
        <div className="mt-6 pt-5 border-t border-emerald-800/60 flex flex-wrap items-center justify-between text-xs text-emerald-200/80 gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Tuntas: <strong className="text-white">{completedCount}</strong> dari 6 Bab</span>
          </div>
          <div className="text-[11px] bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
            Tahun Ajaran 2026/2027 • Kelas XI MA
          </div>
        </div>
      </div>

      {/* Semester Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Daftar Bab Pembelajaran</h3>
          <p className="text-xs text-slate-500">Pilih materi yang ingin dipelajari hari ini</p>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setSelectedSemester('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedSemester === 'all'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Bab (6)
          </button>
          <button
            onClick={() => setSelectedSemester(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedSemester === 1
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semester 1 (Bab 1-3)
          </button>
          <button
            onClick={() => setSelectedSemester(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedSemester === 2
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semester 2 (Bab 4-6)
          </button>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter) => {
          const prog = progressMap[chapter.id];
          const isComplete = prog?.isCompleted;
          const sectionCount = prog?.completedSections?.length || 0;

          return (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden active:scale-[0.99]"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isComplete
                    ? 'bg-emerald-500'
                    : sectionCount > 0
                    ? 'bg-amber-400'
                    : 'bg-slate-200 group-hover:bg-emerald-400'
                } transition-colors`}
              />

              <div className="space-y-4">
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                    BAB {chapter.number} • Sem {chapter.semester}
                  </span>

                  {isComplete ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Tuntas</span>
                    </span>
                  ) : sectionCount > 0 ? (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {sectionCount}/5 Bagian
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{chapter.estimatedTime}</span>
                    </span>
                  )}
                </div>

                {/* Titles */}
                <div>
                  <h4 className="font-arabic text-2xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                    {chapter.titleArabic}
                  </h4>
                  <p className="text-sm font-bold text-slate-800">{chapter.titleIndo}</p>
                  <p className="text-xs text-slate-500 italic mt-0.5">{chapter.subtitle}</p>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {chapter.summary}
                </p>

                {/* Qawaid highlight */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px]">
                  <span className="font-semibold text-emerald-800">Kaidah Nahwu:</span>{' '}
                  <span className="text-slate-700 font-medium">{chapter.qawaid.title}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
                  <span>Pelajari Materi</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-slate-400">
                  {chapter.mufradat.length} Kosakata • Kuis
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
