import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Sparkles,
  LogOut,
  User as UserIcon,
  Layers,
  Bookmark,
  Award,
  Menu,
  X,
  Volume2,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'chapters' | 'flashcards' | 'ai-tutor' | 'saved' | 'grades';
  setCurrentTab: (tab: 'chapters' | 'flashcards' | 'ai-tutor' | 'saved' | 'grades') => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenProfile }) => {
  const { user, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  const navItems = [
    { id: 'chapters', label: 'Bab Pembelajaran', icon: BookOpen, arabic: 'الدُّرُوْس' },
    { id: 'flashcards', label: 'Flashcard Mufradat', icon: Layers, arabic: 'المُفْرَدَات' },
    { id: 'ai-tutor', label: 'AI Ustadz Bayan', icon: Sparkles, arabic: 'المُسَاعِدُ الذَّكِيّ' },
    { id: 'saved', label: 'Hafalan & Catatan', icon: Bookmark, arabic: 'المَحْفُوْظَات' },
    { id: 'grades', label: 'Evaluasi & Nilai', icon: Award, arabic: 'النَّتَائِج' },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('chapters')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
                <span className="font-arabic text-xl font-bold">ض</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Kelas 11 MA
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Darul Faqih</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                  Bayan <span className="font-arabic text-emerald-700 font-semibold text-sm">بَيَان</span>
                </h1>
              </div>
            </div>

            {/* Middle: Desktop Nav items */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: User Profile & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Profile Card Button */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition cursor-pointer text-left"
                title="Buka Profil Santri"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Santri'}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {user?.displayName ? user.displayName.charAt(0) : 'S'}
                  </div>
                )}
                <div className="hidden lg:block text-xs">
                  <p className="font-semibold text-slate-800 truncate max-w-[120px]">
                    {user?.displayName || 'Santri'}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {userProfile?.studentClass || 'XI MA'}
                  </p>
                </div>
              </button>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer active:scale-95"
                title="Keluar dari akun (Logout)"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Keluar</span>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-arabic text-xs opacity-75">{item.arabic}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Konfirmasi Keluar</h3>
              <p className="text-xs text-slate-500">
                Apakah santri yakin ingin keluar dari aplikasi Bayan Darul Faqih? Progres belajarmu tersimpan aman di Firestore.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleLogoutClick}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
