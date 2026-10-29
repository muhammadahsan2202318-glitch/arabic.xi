import React, { useState } from 'react';
import { SavedVocabData, StudyNoteData, toggleSaveVocab, deleteStudyNote, saveStudyNote } from '../firebase';
import { speakArabic } from '../utils/speech';
import {
  Bookmark,
  PenSquare,
  Volume2,
  Trash2,
  Plus,
  Star,
  Search,
  BookOpen,
} from 'lucide-react';
import { chaptersData } from '../data/curriculumData';

interface SavedAndNotesViewProps {
  userId: string;
  savedVocabs: SavedVocabData[];
  studyNotes: StudyNoteData[];
  onRefreshData: () => void;
  onSelectChapterById: (chapterId: string) => void;
}

export const SavedAndNotesView: React.FC<SavedAndNotesViewProps> = ({
  userId,
  savedVocabs,
  studyNotes,
  onRefreshData,
  onSelectChapterById,
}) => {
  const [subTab, setSubTab] = useState<'vocabs' | 'notes'>('vocabs');
  const [searchQuery, setSearchQuery] = useState('');
  const [newNoteChapter, setNewNoteChapter] = useState('bab-1');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleRemoveVocab = async (vocab: SavedVocabData) => {
    try {
      await toggleSaveVocab(userId, {
        vocabId: vocab.vocabId,
        arabic: vocab.arabic,
        latin: vocab.latin,
        meaning: vocab.meaning,
        chapterId: vocab.chapterId,
      });
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteStudyNote(userId, noteId);
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    try {
      await saveStudyNote(userId, {
        noteId: `note_${Date.now()}`,
        chapterId: newNoteChapter,
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAddingNote(false);
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredVocabs = savedVocabs.filter(
    (v) =>
      v.arabic.includes(searchQuery) ||
      v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.latin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = studyNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Pusat Data Santri di Firestore
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Hafalan &amp; Catatan Belajar</h2>
          <p className="text-xs text-slate-500">
            Daftar kosakata pilihan dan ringkasan kaidah yang kamu simpan selama belajar di MA Darul Faqih.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setSubTab('vocabs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              subTab === 'vocabs'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Kosakata Pilihan ({savedVocabs.length})</span>
          </button>
          <button
            onClick={() => setSubTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              subTab === 'notes'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Catatan Santri ({studyNotes.length})</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={subTab === 'vocabs' ? 'Cari kata Arab atau arti...' : 'Cari judul catatan...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* SUBTAB 1: SAVED VOCABULARIES */}
      {subTab === 'vocabs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVocabs.map((vocab) => {
              const chapterObj = chaptersData.find((c) => c.id === vocab.chapterId);

              return (
                <div
                  key={vocab.vocabId}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <button
                      onClick={() => onSelectChapterById(vocab.chapterId)}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md cursor-pointer"
                    >
                      {chapterObj ? `Bab ${chapterObj.number}: ${chapterObj.titleIndo}` : vocab.chapterId}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speakArabic(vocab.arabic)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition cursor-pointer"
                        title="Dengar pengucapan"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveVocab(vocab)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Hapus dari hafalan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-arabic text-3xl font-bold text-slate-900 text-right leading-normal">
                      {vocab.arabic}
                    </h4>
                    <p className="text-xs text-slate-500 italic mt-0.5">{vocab.latin}</p>
                    <p className="text-sm font-bold text-emerald-900 mt-1">{vocab.meaning}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredVocabs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-2">
              <Star className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Belum ada kosakata tersimpan.</p>
              <p className="text-xs text-slate-500">
                Klik ikon bintang pada kartu kosakata di halaman bab materi untuk menambahkannya ke sini.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: STUDY NOTES */}
      {subTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Catatan Belajar Mandiri:</span>
            <button
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNote ? 'Tutup Form' : 'Tambah Catatan Baru'}</span>
            </button>
          </div>

          {/* New Note Form */}
          {isAddingNote && (
            <div className="p-5 rounded-2xl bg-white border border-emerald-300 shadow-sm space-y-3 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  placeholder="Judul catatan..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={newNoteChapter}
                  onChange={(e) => setNewNoteChapter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  {chaptersData.map((c) => (
                    <option key={c.id} value={c.id}>
                      Bab {c.number}: {c.titleIndo}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Tuliskan materi, hafalan, atau catatan dari ustadz..."
                rows={3}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreateNote}
                  disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold disabled:opacity-50"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => {
              const chapterObj = chaptersData.find((c) => c.id === note.chapterId);

              return (
                <div
                  key={note.noteId}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {chapterObj ? `Bab ${chapterObj.number}` : note.chapterId}
                      </span>
                      <button
                        onClick={() => handleDeleteNote(note.noteId)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                        title="Hapus catatan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                    <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed line-clamp-4">
                      {note.content}
                    </p>
                  </div>

                  <span className="text-[10px] text-slate-400 block pt-2 border-t border-slate-100">
                    Disimpan pada: {new Date(note.updatedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              );
            })}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-2">
              <PenSquare className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Belum ada catatan.</p>
              <p className="text-xs text-slate-500">
                Klik tombol &quot;Tambah Catatan Baru&quot; untuk menulis rangkuman pelajaran santri.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
