import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, QuizResultData, SavedVocabData, StudyNoteData, UserProgressData } from '../firebase';
import { X, LogOut, Save, User as UserIcon, Award, BookOpen, Star, PenSquare, ShieldCheck } from 'lucide-react';

interface StudentProfileModalProps {
  onClose: () => void;
  progressMap: Record<string, UserProgressData>;
  quizResults: QuizResultData[];
  savedVocabs: SavedVocabData[];
  studyNotes: StudyNoteData[];
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  onClose,
  progressMap,
  quizResults,
  savedVocabs,
  studyNotes,
}) => {
  const { user, userProfile, logout, refreshProfile } = useAuth();
  const [studentClass, setStudentClass] = useState(userProfile?.studentClass || 'XI MA 1');
  const [bio, setBio] = useState(
    userProfile?.bio || 'مَنْ جَدَّ وَجَدَ (Siapa yang bersungguh-sungguh pasti berhasil)'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const completedChaptersCount = Object.values(progressMap).filter((p) => p.isCompleted).length;
  const averageScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((a, b) => a + b.score, 0) / quizResults.length)
    : 0;

  const handleSave = async () => {
    if (!user) return;
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      await updateUserProfile(user.uid, {
        studentClass: studentClass.trim(),
        bio: bio.trim(),
      });
      await refreshProfile();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-4">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Santri'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-2xl font-bold">
              {user?.displayName ? user.displayName.charAt(0) : 'S'}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Santri Terdaftar
              </span>
              <span className="text-[10px] text-slate-400">MA Darul Faqih</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">{user?.displayName || 'Santri Darul Faqih'}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>

        {/* Learning Statistics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Bab Tuntas</span>
            <p className="text-base font-extrabold text-emerald-700">{completedChaptersCount}/6</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Rata-rata Kuis</span>
            <p className="text-base font-extrabold text-teal-700">{averageScore}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Kosakata</span>
            <p className="text-base font-extrabold text-amber-600">{savedVocabs.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Catatan</span>
            <p className="text-base font-extrabold text-indigo-600">{studyNotes.length}</p>
          </div>
        </div>

        {/* Editable Profile Fields */}
        <div className="space-y-4 pt-1">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Rombel / Kelas Santri:
            </label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              placeholder="Contoh: XI MA 1 / XI MA 2"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Motto Belajar Santri (Bahasa Arab / Indonesia):
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tuliskan motto atau tekad belajarmu..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center justify-between">
            {saveSuccess ? (
              <span className="text-xs text-emerald-600 font-semibold">Profil berhasil disimpan!</span>
            ) : (
              <span className="text-[11px] text-slate-400">Tersimpan di Cloud Firestore</span>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </div>

        {/* Logout Action Section */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Sesi Google Sign-in Terverifikasi</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun (Logout)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
