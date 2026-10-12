import React from 'react';
import { Achievement, UserProfile } from '../types/dental';
import { calculateLevel } from '../utils/gamification';
import {
  Award,
  Flame,
  Droplets,
  Sparkles,
  Trophy,
  CheckCircle2,
  Clock,
  Shield,
  Smile,
  Zap,
  Timer
} from 'lucide-react';

interface AchievementsViewProps {
  userProfile: UserProfile;
  achievements: Achievement[];
  onOpenTimer: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  userProfile,
  achievements,
  onOpenTimer
}) => {
  const levelInfo = calculateLevel(userProfile.points);
  const currentFloor = levelInfo.currentLevelFloor;
  const nextTarget = levelInfo.nextLevelPoints;
  const pointsInCurrentLevel = userProfile.points - currentFloor;
  const pointsSpan = nextTarget - currentFloor;
  const levelProgressPct = Math.min(
    100,
    Math.round((pointsInCurrentLevel / pointsSpan) * 100)
  );

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const renderAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame':
        return <Flame className="w-6 h-6 text-amber-500 fill-amber-400" />;
      case 'droplets':
        return <Droplets className="w-6 h-6 text-cyan-500" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-pink-500" />;
      case 'smile':
        return <Smile className="w-6 h-6 text-emerald-500" />;
      case 'timer':
        return <Timer className="w-6 h-6 text-blue-500" />;
      case 'trophy':
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 'award':
        return <Award className="w-6 h-6 text-teal-500" />;
      default:
        return <Shield className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Gamification Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-6 sm:p-8 text-white shadow-xl shadow-amber-500/15">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-yellow-200/30 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              Sistema de Puntos y Logros
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Nivel {levelInfo.level}: {levelInfo.title}
            </h2>
            <p className="text-amber-50 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Ganas puntos por cada rutina de cepillado, hilo dental y visitas a Sonrisas Brillantes. ¡Desbloquea todos los reconocimientos!
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 text-center min-w-[180px]">
            <span className="text-xs uppercase tracking-wider font-bold block text-amber-100">
              Puntos Totales
            </span>
            <span className="text-3xl sm:text-4xl font-black font-mono mt-1 block">
              {userProfile.points}
            </span>
            <span className="text-[11px] text-amber-100 font-medium mt-1 block">
              {unlockedCount} de {achievements.length} logros obtenidos
            </span>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/20">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span>Progreso hacia Nivel {levelInfo.level + 1}</span>
            <span>
              {pointsInCurrentLevel} / {pointsSpan} pts ({levelProgressPct}%)
            </span>
          </div>
          <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${levelProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Points Guide Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-teal-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">🪥</span>
            <span className="text-xs font-extrabold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
              +15 pts
            </span>
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-white">Cepillado Dental</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Mañana, mediodía o noche</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-rose-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">🧵</span>
            <span className="text-xs font-extrabold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
              +10 pts
            </span>
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-white">Hilo Dental</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Espacios interdentales</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-cyan-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">💧</span>
            <span className="text-xs font-extrabold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded-full">
              +10 pts
            </span>
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-white">Enjuague Bucal</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Protección de esmalte</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-amber-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">⏱️</span>
            <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
              +25 pts
            </span>
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-white">Temporizador 2m</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">4 cuadrantes guiados</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Logros y Medallas Dentales</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Desbloquea insignias especiales al cumplir metas de hábitos en Sonrisas Brillantes
            </p>
          </div>

          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            {unlockedCount} / {achievements.length} Completados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => {
            const isUnlocked = ach.unlocked;
            const progressPct = Math.min(
              100,
              Math.round((ach.progress / ach.maxProgress) * 100)
            );

            return (
              <div
                key={ach.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-amber-200/80 dark:border-amber-900/60 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-50 dark:bg-amber-950/60 shadow-xs ring-2 ring-amber-300 dark:ring-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 opacity-60'
                    }`}
                  >
                    {renderAchievementIcon(ach.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4
                        className={`font-bold text-sm truncate ${
                          isUnlocked
                            ? 'text-slate-800 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {ach.title}
                      </h4>

                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                          isUnlocked
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                        }`}
                      >
                        {isUnlocked ? '¡Desbloqueado!' : `+${ach.pointsReward} pts`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {ach.description}
                    </p>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        <span>
                          {isUnlocked ? 'Meta superada' : 'Progreso actual'}
                        </span>
                        <span className="font-bold text-slate-800 dark:text-white">
                          {ach.progress} / {ach.maxProgress}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUnlocked
                              ? 'bg-emerald-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {ach.unlockedAt && (
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Conseguido</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points History Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Historial Reciente de Puntos Ganados</span>
          </h3>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Últimos registros
          </span>
        </div>

        <div className="space-y-2.5">
          {userProfile.pointsHistory.map(tx => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 dark:text-white block">
                    {tx.reason}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{tx.timestamp}</span>
                  </span>
                </div>
              </div>

              <span className="font-extrabold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded-xl">
                +{tx.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
