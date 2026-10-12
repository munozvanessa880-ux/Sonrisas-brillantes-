import React, { useState } from 'react';
import {
  HygieneReminder,
  UserProfile
} from '../types/dental';
import {
  Sparkles,
  Sun,
  Coffee,
  Moon,
  Shield,
  Droplets,
  Plus,
  Play,
  Flame,
  CheckCircle2,
  Circle,
  Bell,
  RefreshCw,
  Lightbulb,
  Info
} from 'lucide-react';
import { DENTAL_TIPS } from '../utils/initialData';

interface HygieneRemindersProps {
  reminders: HygieneReminder[];
  onToggleReminder: (id: string) => void;
  onUpdateReminderTime: (id: string, newTime: string) => void;
  onAddReminder: (reminder: HygieneReminder) => void;
  onOpenTimer: () => void;
  todayLog: { [key: string]: boolean };
  onToggleRoutineItem: (key: string, name: string, points: number, type: 'brushing' | 'floss' | 'mouthwash') => void;
  userProfile: UserProfile;
  onRequestBrowserNotification: () => void;
  onTriggerTestHygieneAlert: () => void;
  onResetToothbrushDate: () => void;
}

export const HygieneReminders: React.FC<HygieneRemindersProps> = ({
  reminders,
  onToggleReminder,
  onUpdateReminderTime,
  onAddReminder,
  onOpenTimer,
  todayLog,
  onToggleRoutineItem,
  userProfile,
  onRequestBrowserNotification,
  onTriggerTestHygieneAlert,
  onResetToothbrushDate
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('13:00');
  const [newType, setNewType] = useState<'brushing' | 'floss' | 'mouthwash' | 'tongue'>('brushing');
  const [newPeriod, setNewPeriod] = useState<'morning' | 'afternoon' | 'night'>('afternoon');

  // Calculate days since toothbrush change
  const lastChange = new Date(userProfile.toothbrushChangeDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastChange.getTime());
  const daysUsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 90 - daysUsed);

  // Daily routine tasks
  const dailyTasks = [
    {
      key: 'morning_brush',
      name: 'Cepillado Matutino',
      desc: 'Elimina placa y aliento matutino después de desayunar',
      points: 15,
      type: 'brushing' as const,
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      tagColor: 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200 border-amber-200 dark:border-amber-900/60'
    },
    {
      key: 'afternoon_brush',
      name: 'Cepillado de Mediodía',
      desc: 'Protege tu esmalte de los ácidos tras el almuerzo',
      points: 15,
      type: 'brushing' as const,
      icon: <Coffee className="w-5 h-5 text-sky-500" />,
      tagColor: 'bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-200 border-sky-200 dark:border-sky-900/60'
    },
    {
      key: 'night_brush',
      name: 'Cepillado Nocturno Esencial',
      desc: 'El más crítico del día para prevenir caries mientras duermes',
      points: 15,
      type: 'brushing' as const,
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      tagColor: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-200 border-indigo-200 dark:border-indigo-900/60'
    },
    {
      key: 'floss_use',
      name: 'Uso de Hilo Dental',
      desc: 'Limpia los espacios interdentales donde no entra el cepillo',
      points: 10,
      type: 'floss' as const,
      icon: <Shield className="w-5 h-5 text-rose-500" />,
      tagColor: 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200 border-rose-200 dark:border-rose-900/60'
    },
    {
      key: 'mouthwash_use',
      name: 'Enjuague Bucal Fluorurado',
      desc: '30 segundos de colutorio para reforzar la remineralización',
      points: 10,
      type: 'mouthwash' as const,
      icon: <Droplets className="w-5 h-5 text-cyan-500" />,
      tagColor: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-200 border-cyan-200 dark:border-cyan-900/60'
    }
  ];

  const completedCount = dailyTasks.filter(t => !!todayLog[t.key]).length;
  const routineProgressPct = Math.round((completedCount / dailyTasks.length) * 100);

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const reminder: HygieneReminder = {
      id: `rem-custom-${Date.now()}`,
      title: newTitle.trim(),
      time: newTime,
      type: newType,
      period: newPeriod,
      enabled: true,
      days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      description: 'Recordatorio personalizado configurado por el paciente.',
      iconName: newType === 'brushing' ? 'sparkles' : newType === 'floss' ? 'shield' : 'droplets',
      color: newType === 'brushing' ? 'teal' : newType === 'floss' ? 'rose' : 'cyan'
    };

    onAddReminder(reminder);
    setNewTitle('');
    setShowAddModal(false);
  };

  const tipOfTheDay = DENTAL_TIPS[new Date().getDay() % DENTAL_TIPS.length];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Welcome & Streak Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 via-teal-400 to-sky-400 p-6 sm:p-8 text-white shadow-xl shadow-teal-500/15">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-300/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Rutina de Higiene Bucal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ¡Hola, {userProfile.name}! Protege tu sonrisa hoy
            </h2>
            <p className="text-teal-50 text-sm mt-1.5 leading-relaxed">
              Sonrisas Brillantes te ayuda a mantener el hábito diario con recordatorios automáticos y técnicas guiadas por especialistas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick 2 min timer CTA */}
            <button
              onClick={onOpenTimer}
              className="px-5 py-3 rounded-2xl bg-white text-teal-800 font-extrabold text-sm shadow-md hover:bg-teal-50 transition-all flex items-center gap-2 hover:scale-102"
            >
              <Play className="w-4 h-4 fill-teal-700 text-teal-700" />
              <span>Temporizador 2 min</span>
            </button>

            {/* Test notification button */}
            <button
              onClick={onTriggerTestHygieneAlert}
              className="px-4 py-3 rounded-2xl bg-teal-600/60 hover:bg-teal-600 border border-white/30 backdrop-blur-md text-white font-bold text-xs transition-colors flex items-center gap-2"
              title="Disparar recordatorio inmediato para probar cómo suena y se ve"
            >
              <Bell className="w-4 h-4" />
              <span>Probar Alerta Diaria</span>
            </button>
          </div>
        </div>

        {/* Browser notification permission strip */}
        {!userProfile.browserNotificationsAllowed && (
          <div className="mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-200 shrink-0" />
              <span>¿Deseas recibir las notificaciones diarias en tu navegador o móvil?</span>
            </div>
            <button
              onClick={onRequestBrowserNotification}
              className="px-3 py-1.5 rounded-xl bg-white text-teal-800 font-bold hover:bg-teal-50 text-xs transition-colors self-start sm:self-auto shrink-0"
            >
              Activar Notificaciones Web
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Daily Checklist & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Checklist de Hoy */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <span>Registro Diario de Higiene</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
                    Hoy: {completedCount} de {dailyTasks.length}
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Marca cada hábito para sumar puntos a tu cuenta de Sonrisas Brillantes
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/50">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Racha activa: {userProfile.brushingStreak} días</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                <span>Progreso de hoy</span>
                <span className="text-teal-600 dark:text-teal-400">{routineProgressPct}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-500"
                  style={{ width: `${routineProgressPct}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {dailyTasks.map(task => {
                const isChecked = !!todayLog[task.key];
                return (
                  <div
                    key={task.key}
                    onClick={() => onToggleRoutineItem(task.key, task.name, task.points, task.type)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-slate-800 dark:text-slate-100 shadow-xs'
                        : 'bg-slate-50/70 hover:bg-slate-100/60 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                            {task.name}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${task.tagColor}`}>
                            +{task.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          {task.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/50 dark:border-slate-700">
                        {task.icon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full routine bonus notice */}
            {routineProgressPct === 100 && (
              <div className="mt-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200">
                      ¡Rutina Completa del Día!
                    </h4>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">
                      Cumpliste todos los hábitos diarios recomendados por Sonrisas Brillantes.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-3 py-1 rounded-xl">
                  +50 pts bonus
                </span>
              </div>
            )}
          </div>

          {/* Configuración de Alertas & Horarios de Cepillado */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Configuración de Recordatorios Diarios</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Personaliza los horarios de tus alarmas de cepillado y enjuague
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Recordatorio</span>
              </button>
            </div>

            {/* List of Reminders */}
            <div className="space-y-3.5">
              {reminders.map(rem => (
                <div
                  key={rem.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-teal-200 dark:hover:border-teal-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                      {rem.type === 'brushing' ? (
                        <Sparkles className="w-5 h-5" />
                      ) : rem.type === 'floss' ? (
                        <Shield className="w-5 h-5" />
                      ) : (
                        <Droplets className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                        {rem.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {rem.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
                          <span
                            key={day}
                            className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${
                              rem.days.includes(day)
                                ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                                : 'bg-slate-200/60 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                            }`}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700/60">
                    <input
                      type="time"
                      value={rem.time}
                      onChange={e => onUpdateReminderTime(rem.id, e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white focus:outline-teal-500"
                    />

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rem.enabled}
                        onChange={() => onToggleReminder(rem.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Guided Timer Banner & Toothbrush tracker & Dental Tip */}
        <div className="space-y-6">
          {/* Card: Temporizador 2 minutos guiado */}
          <div className="bg-gradient-to-br from-teal-50 to-sky-50 dark:from-slate-900 dark:to-teal-950/30 rounded-3xl p-6 border border-teal-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md shadow-teal-500/20 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white mb-1">
              Temporizador 2 Minutos
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              La Asociación Dental y la clínica Sonrisas Brillantes recomiendan 30 segundos por cuadrante para eliminar placa bacteriana de manera homogénea.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] mb-5">
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-teal-100 dark:border-slate-700">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">4 Cuadrantes</span>
                <span className="text-slate-600 dark:text-slate-300">Cambio guiado con audio</span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-teal-100 dark:border-slate-700">
                <span className="font-bold text-amber-700 dark:text-amber-300 block">+25 Puntos</span>
                <span className="text-slate-600 dark:text-slate-300">Por sesión finalizada</span>
              </div>
            </div>

            <button
              onClick={onOpenTimer}
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/25 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Sesión Guiada</span>
            </button>
          </div>

          {/* Card: Estado del Cepillo Dental (Renovación cada 3 meses) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                <span>Estado del Cepillo Dental</span>
              </h4>
              <button
                onClick={onResetToothbrushDate}
                className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 p-1"
                title="Marcar que estrené cepillo hoy"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 shrink-0 font-black text-xl">
                🪥
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  {daysRemaining > 0 ? `${daysRemaining} días restantes` : '¡Hora de renovarlo ya!'}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Llevas {daysUsed} días con tu cepillo actual
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all ${
                  daysRemaining < 15 ? 'bg-rose-500' : 'bg-teal-500'
                }`}
                style={{ width: `${Math.min(100, (daysUsed / 90) * 100)}%` }}
              />
            </div>

            <button
              onClick={onResetToothbrushDate}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Marcar cepillo nuevo hoy
            </button>
          </div>

          {/* Card: Consejo del Especialista Sonrisas Brillantes */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 rounded-3xl p-5 border border-amber-200/70 dark:border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Consejo de Salud Bucal</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{tipOfTheDay}"
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
              <span>Sonrisas Brillantes</span>
              <span className="flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-300">
                <Info className="w-3 h-3" /> Odontología Preventiva
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Añadir Recordatorio */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-teal-100 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-1">Añadir Nuevo Recordatorio</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              Configura un horario fijo para no olvidar tu higiene bucal
            </p>

            <form onSubmit={handleCreateReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del recordatorio
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Cepillado post-merienda"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Horario
                  </label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de cuidado
                  </label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="brushing">Cepillado</option>
                    <option value="floss">Hilo Dental</option>
                    <option value="mouthwash">Enjuague Bucal</option>
                    <option value="tongue">Limpieza Lingual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Momento del día
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['morning', 'afternoon', 'night'] as const).map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setNewPeriod(p)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        newPeriod === p
                          ? 'bg-teal-50 border-teal-500 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                          : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p === 'morning' ? 'Mañana' : p === 'afternoon' ? 'Mediodía' : 'Noche'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-md shadow-teal-500/20"
                >
                  Guardar Alarma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
