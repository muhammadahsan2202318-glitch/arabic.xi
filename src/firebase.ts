import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  query,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass databaseId from firebaseConfig
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore error handling specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection check: Client might be offline or initializing.');
    }
  }
}
testConnection();

// Auth Helpers
export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Sync or initialize user profile in Firestore
    const user = result.user;
    const userDocRef = doc(db, 'users', user.uid);
    const existing = await getDoc(userDocRef);
    if (!existing.exists()) {
      await setDoc(userDocRef, {
        userId: user.uid,
        displayName: user.displayName || 'Santri Darul Faqih',
        email: user.email || '',
        photoURL: user.photoURL || '',
        studentClass: 'XI MA (Madrasah Aliyah)',
        academicYear: '2026/2027',
        bio: 'مَنْ جَدَّ وَجَدَ (Siapa yang bersungguh-sungguh pasti berhasil)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// User Profile Types & Helpers
export interface UserProfileData {
  userId: string;
  displayName: string;
  email: string;
  photoURL: string;
  studentClass: string;
  academicYear: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  const path = `users/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) {
      return snap.data() as UserProfileData;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function updateUserProfile(userId: string, data: Partial<UserProfileData>): Promise<void> {
  const path = `users/${userId}`;
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Chapter Progress Types & Helpers
export interface UserProgressData {
  userId: string;
  chapterId: string;
  completedSections: string[];
  isCompleted: boolean;
  lastAccessedAt: string;
  updatedAt: string;
}

export async function getChapterProgress(userId: string, chapterId: string): Promise<UserProgressData | null> {
  const path = `users/${userId}/progress/${chapterId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId, 'progress', chapterId));
    if (snap.exists()) {
      return snap.data() as UserProgressData;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveChapterProgress(
  userId: string,
  chapterId: string,
  sectionId: string,
  markChapterComplete = false
): Promise<void> {
  const path = `users/${userId}/progress/${chapterId}`;
  try {
    const docRef = doc(db, 'users', userId, 'progress', chapterId);
    const existing = await getDoc(docRef);
    let completedSections: string[] = [];
    if (existing.exists()) {
      const data = existing.data() as UserProgressData;
      completedSections = data.completedSections || [];
    }

    if (!completedSections.includes(sectionId)) {
      completedSections.push(sectionId);
    }

    await setDoc(
      docRef,
      {
        userId,
        chapterId,
        completedSections,
        isCompleted: markChapterComplete || completedSections.length >= 4,
        lastAccessedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Quiz Result Helpers
export interface QuizResultData {
  userId: string;
  quizId: string;
  chapterId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  completedAt: string;
}

export async function saveQuizResult(userId: string, result: Omit<QuizResultData, 'userId'>): Promise<void> {
  const resultId = `${result.chapterId}_${Date.now()}`;
  const path = `users/${userId}/quizResults/${resultId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'quizResults', resultId), {
      ...result,
      userId,
      completedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserQuizResults(userId: string): Promise<QuizResultData[]> {
  const path = `users/${userId}/quizResults`;
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'quizResults'));
    return snap.docs.map((d) => d.data() as QuizResultData);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Saved Vocabulary (Mufradat)
export interface SavedVocabData {
  userId: string;
  vocabId: string;
  arabic: string;
  latin: string;
  meaning: string;
  chapterId: string;
  savedAt: string;
}

export async function toggleSaveVocab(userId: string, vocab: Omit<SavedVocabData, 'userId' | 'savedAt'>): Promise<boolean> {
  const path = `users/${userId}/savedVocab/${vocab.vocabId}`;
  try {
    const vocabDocRef = doc(db, 'users', userId, 'savedVocab', vocab.vocabId);
    const existing = await getDoc(vocabDocRef);
    if (existing.exists()) {
      await deleteDoc(vocabDocRef);
      return false; // Removed
    } else {
      await setDoc(vocabDocRef, {
        ...vocab,
        userId,
        savedAt: new Date().toISOString(),
      });
      return true; // Added
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserSavedVocabs(userId: string): Promise<SavedVocabData[]> {
  const path = `users/${userId}/savedVocab`;
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'savedVocab'));
    return snap.docs.map((d) => d.data() as SavedVocabData);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Study Notes
export interface StudyNoteData {
  userId: string;
  noteId: string;
  chapterId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function saveStudyNote(userId: string, note: Omit<StudyNoteData, 'userId' | 'createdAt' | 'updatedAt'>): Promise<void> {
  const path = `users/${userId}/notes/${note.noteId}`;
  try {
    const noteDocRef = doc(db, 'users', userId, 'notes', note.noteId);
    const existing = await getDoc(noteDocRef);
    const now = new Date().toISOString();
    await setDoc(
      noteDocRef,
      {
        ...note,
        userId,
        createdAt: existing.exists() ? (existing.data() as StudyNoteData).createdAt : now,
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteStudyNote(userId: string, noteId: string): Promise<void> {
  const path = `users/${userId}/notes/${noteId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'notes', noteId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function getUserNotes(userId: string): Promise<StudyNoteData[]> {
  const path = `users/${userId}/notes`;
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'notes'));
    return snap.docs.map((d) => d.data() as StudyNoteData);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
