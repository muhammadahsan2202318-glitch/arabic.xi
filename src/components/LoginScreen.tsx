import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Award } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setIsLoggingIn(true);
      setErrorMessage(null);
      await login();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Gagal masuk dengan Google. Silakan coba kembali.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Decorative Islamic Geometric Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-emerald-800/40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/50 border border-emerald-300/30">
            <span className="font-arabic text-2xl text-slate-950 font-bold">ض</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Madrasah Aliyah</span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">Kelas XI</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              MA Darul Faqih Indonesia
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-right">
          <div className="font-arabic text-emerald-300 text-lg">بَيَانُ دَارِ الفَقِيْهِ</div>
          <span className="text-xs text-slate-400">Pembelajaran Bahasa Arab</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Presentation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sistem Pembelajaran Digital Santri Terpadu</span>
          </div>

          <div className="space-y-3">
            <div className="font-arabic text-3xl sm:text-4xl text-emerald-300 leading-relaxed font-bold">
              تَعَلَّمِ العَرَبِيَّةَ بِفَهْمٍ وَإِتْقَانٍ
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Bayan: Bahasa Arab Kelas 11 MA Darul Faqih
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Selamat datang di portal pembelajaran resmi Bahasa Arab Kelas XI MA Darul Faqih Indonesia.
              Kuasai materi mufradat, qira&apos;ah, percakapan (hiwar), kaidah nahwu-sharaf, serta asisten AI tutor berbasis kurikulum madrasah.
            </p>
          </div>

          {/* Key Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 bg-slate-900/60 border border-emerald-900/50 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">6 Bab Silabus KMA 183</p>
                <p className="text-[11px] text-slate-400">Belanja, Medis, Rihlah, Lingkungan, IT &amp; Tasamuh</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-900/60 border border-emerald-900/50 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Audio Fushah &amp; Flashcards</p>
                <p className="text-[11px] text-slate-400">Dengar pengucapan native &amp; simpan hafalan</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-900/60 border border-emerald-900/50 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Tutor AI Ustadz Bayan</p>
                <p className="text-[11px] text-slate-400">Analisis I&apos;rab kalimat, tashih insya&apos; &amp; chat Arab</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-900/60 border border-emerald-900/50 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Data Tersimpan di Firestore</p>
                <p className="text-[11px] text-slate-400">Skor kuis, progres bab, dan catatan per santri</p>
              </div>
            </div>
          </div>

          {/* Mahfuzhat Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-700/40 text-emerald-200">
            <p className="font-arabic text-lg sm:text-xl text-center mb-1 font-semibold">
              « تَعَلَّمُوا العَرَبِيَّةَ فَإِنَّهَا تُثَبِّتُ العَقْلَ وَتَزِيْدُ فِي المُرُوْءَةِ »
            </p>
            <p className="text-[11px] text-center text-emerald-300/80 italic">
              &quot;Pelajarilah bahasa Arab, karena sesungguhnya ia mengokohkan akal dan menambah kemuliaan kepribadian.&quot;
            </p>
          </div>
        </div>

        {/* Right Side: Auth Barrier Login Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/90 border border-emerald-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl relative">
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 mb-3">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Masuk ke Portal Santri</h3>
              <p className="text-xs text-slate-400">
                Gunakan akun Google aktif santri atau ustadz untuk mengakses seluruh materi dan evaluasi.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Google Sign-in Button */}
            <button
              onClick={handleSignIn}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer active:scale-[0.99]"
            >
              {isLoggingIn ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Menghubungkan akun...</span>
                </div>
              ) : (
                <>
                  {/* Google SVG Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-sm">Masuk dengan Akun Google</span>
                </>
              )}
            </button>

            {/* Privacy & Security Notice */}
            <div className="mt-5 pt-5 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Autentikasi aman terintegrasi Firebase Auth &amp; Firestore</span>
            </div>

            {/* Quick Demo Preview Note */}
            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-300/90 leading-relaxed text-center">
              Khusus santriwan, santriwati, &amp; asatidz MA Darul Faqih Indonesia. Data nilai dan catatan tersimpan otomatis per santri.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-6 py-4 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <p>© 2026 MA Darul Faqih Indonesia. Disusun untuk Pembelajaran Bahasa Arab Kelas 11 MA.</p>
        <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <span>Kurikulum Merdeka / KMA 183</span>
          <span>•</span>
          <span>Pesantren &amp; Madrasah Digital</span>
        </p>
      </footer>
    </div>
  );
};
