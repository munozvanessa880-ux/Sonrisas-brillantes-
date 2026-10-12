import React from 'react';
import {
  Sparkles,
  Calendar,
  Award,
  Bell,
  Stethoscope,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Flame
} from 'lucide-react';
import { UserProfile } from '../types/dental';

export type TabType = 'hygiene' | 'treatments' | 'gamification' | 'notifications' | 'clinic_sim';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userProfile: UserProfile;
  unreadCount: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  onOpenTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  unreadCount,
  darkMode,
  toggleDarkMode,
  soundEnabled,
  toggleSound,
  onOpenTimer
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-teal-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('hygiene')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-400 via-teal-300 to-sky-300 flex items-center justify-center shadow-md shadow-teal-500/20 text-white">
              <span className="text-2xl font-black select-none">🦷</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                  Sonrisas Brillantes
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                  Clínica & Salud Bucal
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 hidden sm:block">
                Cuidado diario & seguimiento de tratamientos
              </p>
            </div>
          </div>

          {/* Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
            <button
              onClick={() => setActiveTab('hygiene')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hygiene'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>Higiene Bucal</span>
            </button>

            <button
              onClick={() => setActiveTab('treatments')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'treatments'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-sky-500" />
              <span>Tratamientos & Citas</span>
            </button>

            <button
              onClick={() => setActiveTab('gamification')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'gamification'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Puntos & Logros</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'notifications'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4 text-rose-500" />
              <span>Notificaciones</span>
              {unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('clinic_sim')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'clinic_sim'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-teal-800 dark:text-teal-200 hover:bg-teal-100/60 dark:hover:bg-teal-950/40'
              }`}
              title="Panel de simulación clínica para probar alertas en vivo"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Simular Clínica</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick 2-min timer button */}
            <button
              onClick={onOpenTimer}
              className="hidden lg:flex items-center gap-2 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Temporizador 2 min</span>
            </button>

            {/* Streak & Points pill */}
            <div
              onClick={() => setActiveTab('gamification')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 cursor-pointer hover:scale-102 transition-transform"
              title="Tus puntos y racha actual"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                {userProfile.brushingStreak}d
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                {userProfile.points} pts
              </span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Sonidos activados' : 'Sonidos desactivados'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo nocturno'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('hygiene')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold ${
              activeTab === 'hygiene' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>Higiene</span>
          </button>
          <button
            onClick={() => setActiveTab('treatments')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold ${
              activeTab === 'treatments' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Tratamientos</span>
          </button>
          <button
            onClick={() => setActiveTab('gamification')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold ${
              activeTab === 'gamification' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Award className="w-4 h-4 mb-0.5" />
            <span>Logros</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold ${
              activeTab === 'notifications' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Bell className="w-4 h-4 mb-0.5" />
            <span>Alertas</span>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('clinic_sim')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold ${
              activeTab === 'clinic_sim' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Stethoscope className="w-4 h-4 mb-0.5" />
            <span>Clínica</span>
          </button>
        </div>
      </div>
    </header>
  );
};
