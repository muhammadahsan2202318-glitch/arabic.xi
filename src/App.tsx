import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { Navbar } from './components/Navbar';
import { ChapterListView } from './components/ChapterListView';
import { ChapterDetailView } from './components/ChapterDetailView';
import { FlashcardsView } from './components/FlashcardsView';
import { AITutorView } from './components/AITutorView';
import { SavedAndNotesView } from './components/SavedAndNotesView';
import { GradesView } from './components/GradesView';
import { StudentProfileModal } from './components/StudentProfileModal';
import { Chapter, chaptersData } from './data/curriculumData';
import {
  getUserQuizResults,
  getUserSavedVocabs,
  getUserNotes,
  getChapterProgress,
  QuizResultData,
  SavedVocabData,
  StudyNoteData,
  UserProgressData,
} from './firebase';

function MainApp() {
  const { user, loading } = useAuth();

  const [currentTab, setCurrentTab] = useState<'chapters' | 'flashcards' | 'ai-tutor' | 'saved' | 'grades'>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [aiTutorTopic, setAiTutorTopic] = useState<string>('');

  // Firestore user data state
  const [progressMap, setProgressMap] = useState<Record<string, UserProgressData>>({});
  const [quizResults, setQuizResults] = useState<QuizResultData[]>([]);
  const [savedVocabs, setSavedVocabs] = useState<SavedVocabData[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNoteData[]>([]);

  // Load user data from Firestore
  const loadUserData = useCallback(async () => {
    if (!user) return;
    try {
      // 1. Load progress for all 6 chapters
      const progressPromises = chaptersData.map(async (c) => {
        const prog = await getChapterProgress(user.uid, c.id);
        return { chapterId: c.id, prog };
      });
      const progressResults = await Promise.all(progressPromises);
      const newMap: Record<string, UserProgressData> = {};
      progressResults.forEach(({ chapterId, prog }) => {
        if (prog) newMap[chapterId] = prog;
      });
      setProgressMap(newMap);

      // 2. Load quiz results
      const qResults = await getUserQuizResults(user.uid);
      setQuizResults(qResults || []);

      // 3. Load saved vocabularies
      const sVocabs = await getUserSavedVocabs(user.uid);
      setSavedVocabs(sVocabs || []);

      // 4. Load notes
      const notes = await getUserNotes(user.uid);
      setStudyNotes(notes || []);
    } catch (err) {
      console.error('Failed to load user data from Firestore:', err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user, loadUserData]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-xl shadow-emerald-900/50 animate-pulse">
          <span className="font-arabic text-3xl font-bold">ض</span>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-emerald-400">MA Darul Faqih Indonesia</h2>
          <p className="text-xs text-slate-400">Menghubungkan ke Portal Pembelajaran Bahasa Arab...</p>
        </div>
      </div>
    );
  }

  // Protected route barrier: "Halaman wajib login"
  if (!user) {
    return <LoginScreen />;
  }

  const handleSelectChapterById = (chapterId: string) => {
    const found = chaptersData.find((c) => c.id === chapterId);
    if (found) {
      setSelectedChapter(found);
      setCurrentTab('chapters');
    }
  };

  const handleOpenAITutorWithTopic = (topic: string) => {
    setAiTutorTopic(topic);
    setCurrentTab('ai-tutor');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Navbar with user profile & logout button */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'chapters') {
            setSelectedChapter(null);
          }
        }}
        onOpenProfile={() => setShowProfileModal(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {currentTab === 'chapters' && (
          <>
            {!selectedChapter ? (
              <ChapterListView
                progressMap={progressMap}
                onSelectChapter={(chap) => setSelectedChapter(chap)}
                onOpenAITutor={() => setCurrentTab('ai-tutor')}
                onOpenFlashcards={() => setCurrentTab('flashcards')}
              />
            ) : (
              <ChapterDetailView
                chapter={selectedChapter}
                userId={user.uid}
                savedVocabs={savedVocabs}
                studyNotes={studyNotes}
                onBack={() => setSelectedChapter(null)}
                onRefreshData={loadUserData}
                onOpenAITutorWithTopic={handleOpenAITutorWithTopic}
              />
            )}
          </>
        )}

        {currentTab === 'flashcards' && (
          <FlashcardsView
            userId={user.uid}
            savedVocabs={savedVocabs}
            onRefreshData={loadUserData}
          />
        )}

        {currentTab === 'ai-tutor' && (
          <AITutorView initialTopic={aiTutorTopic} />
        )}

        {currentTab === 'saved' && (
          <SavedAndNotesView
            userId={user.uid}
            savedVocabs={savedVocabs}
            studyNotes={studyNotes}
            onRefreshData={loadUserData}
            onSelectChapterById={handleSelectChapterById}
          />
        )}

        {currentTab === 'grades' && (
          <GradesView
            quizResults={quizResults}
            onSelectChapterById={handleSelectChapterById}
          />
        )}
      </main>

      {/* Profile Modal */}
      {showProfileModal && (
        <StudentProfileModal
          onClose={() => setShowProfileModal(false)}
          progressMap={progressMap}
          quizResults={quizResults}
          savedVocabs={savedVocabs}
          studyNotes={studyNotes}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            MA Darul Faqih Indonesia • Aplikasi Pembelajaran Bahasa Arab Terpadu Kelas XI
          </p>
          <p className="text-[11px] text-slate-400">
            Berbasis Kurikulum Madrasah KMA 183 / Kurikulum Merdeka • Dilengkapi AI Tutor Ustadz Bayan &amp; Firebase Cloud Database
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
