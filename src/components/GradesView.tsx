import React from 'react';
import { QuizResultData } from '../firebase';
import { chaptersData } from '../data/curriculumData';
import { Award, CheckCircle, AlertCircle, RotateCcw, TrendingUp, Calendar } from 'lucide-react';

interface GradesViewProps {
  quizResults: QuizResultData[];
  onSelectChapterById: (chapterId: string) => void;
}

export const GradesView: React.FC<GradesViewProps> = ({ quizResults, onSelectChapterById }) => {
  const totalAttempts = quizResults.length;
  const averageScore = totalAttempts > 0
    ? Math.round(quizResults.reduce((acc, q) => acc + q.score, 0) / totalAttempts)
    : 0;
  const passedAttempts = quizResults.filter((q) => q.passed).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Rekapitulasi Evaluasi Santri
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Nilai &amp; Hasil Kuis Pembelajaran</h2>
        <p className="text-xs text-slate-500">
          Riwayat pengerjaan kuis per bab yang tersimpan secara real-time di database Firestore.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Pengerjaan Kuis</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalAttempts}</p>
          <span className="text-[11px] text-slate-400">Dari 6 bab kurikulum kelas 11</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Rata-Rata Nilai</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700">{averageScore}</p>
          <span className="text-[11px] text-slate-400">Skala 0 - 100 (KKM Madrasah: 70)</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Tingkat Kelulusan KKM</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-teal-700">
            {totalAttempts > 0 ? `${Math.round((passedAttempts / totalAttempts) * 100)}%` : '0%'}
          </p>
          <span className="text-[11px] text-slate-400">
            {passedAttempts} evaluasi mencapai KKM
          </span>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <h3 className="text-sm font-bold text-slate-800">Riwayat Nilai Santri:</h3>

        {quizResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="p-3">Waktu Selesai</th>
                  <th className="p-3">Bab Pembelajaran</th>
                  <th className="p-3 text-center">Jawaban Tepat</th>
                  <th className="p-3 text-center">Skor Akhir</th>
                  <th className="p-3 text-center">Status Kelulusan</th>
                  <th className="p-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizResults
                  .slice()
                  .reverse()
                  .map((res, idx) => {
                    const chapter = chaptersData.find((c) => c.id === res.chapterId);

                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{new Date(res.completedAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">
                            {chapter ? `Bab ${chapter.number}: ${chapter.titleIndo}` : res.chapterId}
                          </p>
                          <p className="font-arabic text-xs text-slate-500">
                            {chapter?.titleArabic}
                          </p>
                        </td>
                        <td className="p-3 text-center font-semibold text-slate-700">
                          {res.correctAnswers} / {res.totalQuestions}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                              res.score >= 70
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {res.score}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {res.passed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3" />
                              <span>Lulus KKM</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              <AlertCircle className="w-3 h-3" />
                              <span>Perlu Remedial</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onSelectChapterById(res.chapterId)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Buka Kuis Bab</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 space-y-2">
            <Award className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Belum ada nilai kuis yang tersimpan.</p>
            <p className="text-xs text-slate-500">
              Buka salah satu bab pembelajaran, pilih tab &quot;الاختبار (Kuis Bab)&quot;, dan selesaikan latihan soalnya.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
