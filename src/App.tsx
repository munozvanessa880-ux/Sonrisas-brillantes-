/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_USER_PROFILE,
  INITIAL_HYGIENE_REMINDERS,
  INITIAL_TREATMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACHIEVEMENTS
} from './utils/initialData';
import {
  UserProfile,
  HygieneReminder,
  TreatmentPlan,
  DentalAppointment,
  AppNotification,
  Achievement,
  NotificationCategory,
  NotificationPriority
} from './types/dental';
import { evaluateAchievements } from './utils/gamification';
import { soundManager } from './utils/audio';
import { Navbar, TabType } from './components/Navbar';
import { HygieneReminders } from './components/HygieneReminders';
import { TreatmentPlans } from './components/TreatmentPlans';
import { NotificationsCenter } from './components/NotificationsCenter';
import { AchievementsView } from './components/AchievementsView';
import { BrushingTimerModal } from './components/BrushingTimerModal';
import { ClinicSimulationModal } from './components/ClinicSimulationModal';
import { ActiveNotificationToast } from './components/ActiveNotificationToast';

export default function App() {
  // Theme & Sound state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sb_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('sb_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Main active tab
  const [activeTab, setActiveTab] = useState<TabType>('hygiene');

  // Modals
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isClinicSimOpen, setIsClinicSimOpen] = useState(false);

  // Core Data with LocalStorage Persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sb_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [reminders, setReminders] = useState<HygieneReminder[]>(() => {
    const saved = localStorage.getItem('sb_reminders');
    return saved ? JSON.parse(saved) : INITIAL_HYGIENE_REMINDERS;
  });

  const [treatments, setTreatments] = useState<TreatmentPlan[]>(() => {
    const saved = localStorage.getItem('sb_treatments');
    return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
  });

  const [appointments, setAppointments] = useState<DentalAppointment[]>(() => {
    const saved = localStorage.getItem('sb_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('sb_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('sb_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  // Daily Routine checklist state (keyed by YYYY-MM-DD)
  const todayKey = new Date().toISOString().split('T')[0];
  const [todayLog, setTodayLog] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem(`sb_today_log_${todayKey}`);
    return saved
      ? JSON.parse(saved)
      : { morning_brush: true, afternoon_brush: false, night_brush: false, floss_use: false, mouthwash_use: false };
  });

  // Active toast banner for incoming notification
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sb_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync sound setting
  useEffect(() => {
    localStorage.setItem('sb_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Sync entities
  useEffect(() => {
    localStorage.setItem('sb_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('sb_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('sb_treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem('sb_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('sb_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sb_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(`sb_today_log_${todayKey}`, JSON.stringify(todayLog));
  }, [todayLog, todayKey]);

  // Dispatch and show a new notification
  const dispatchNotification = (newNotif: AppNotification) => {
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);

    if (soundEnabled) {
      soundManager.playNotificationSound();
    }

    // Try HTML5 Browser Notification if permitted
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      try {
        new Notification(`Sonrisas Brillantes: ${newNotif.title}`, {
          body: newNotif.message,
          icon: '/favicon.ico'
        });
      } catch {}
    }

    // Auto dismiss toast after 6 seconds
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setActiveToast(null);
    }, 6000);
  };

  // Add points helper & check achievement progress
  const awardPoints = (
    pts: number,
    reason: string,
    statUpdates?: Partial<UserProfile>
  ) => {
    setUserProfile(prev => {
      const updatedProfile: UserProfile = {
        ...prev,
        points: prev.points + pts,
        pointsHistory: [
          {
            id: `pt-${Date.now()}`,
            reason,
            points: pts,
            timestamp: 'Hace un momento',
            icon: 'sparkles'
          },
          ...prev.pointsHistory.slice(0, 19)
        ],
        ...statUpdates
      };

      // Check achievements
      const { updatedAchievements, newlyUnlocked, pointsGained } =
        evaluateAchievements(achievements, updatedProfile);

      if (newlyUnlocked.length > 0) {
        setAchievements(updatedAchievements);
        if (pointsGained > 0) {
          updatedProfile.points += pointsGained;
        }

        // Notify each unlocked achievement
        newlyUnlocked.forEach(unlockedAch => {
          setTimeout(() => {
            dispatchNotification({
              id: `notif-ach-${unlockedAch.id}-${Date.now()}`,
              category: 'clinical_alert',
              priority: 'important',
              title: `¡Logro Desbloqueado: ${unlockedAch.title}!`,
              message: `${unlockedAch.description} Has ganado +${unlockedAch.pointsReward} puntos de salud dental en Sonrisas Brillantes.`,
              timestamp: 'Ahora mismo',
              read: false,
              actionLabel: 'Ver en Logros',
              actionType: 'view_reminder'
            });
          }, 400);
        });
      }

      return updatedProfile;
    });
  };

  // Toggle routine item in today's checklist
  const handleToggleRoutineItem = (
    key: string,
    name: string,
    points: number,
    type: 'brushing' | 'floss' | 'mouthwash'
  ) => {
    const isCurrentlyDone = !!todayLog[key];
    const newState = !isCurrentlyDone;

    setTodayLog(prev => ({
      ...prev,
      [key]: newState
    }));

    if (soundEnabled) soundManager.playSoftClick();

    if (newState) {
      // User checked off this habit
      const statUpdate: Partial<UserProfile> = {};
      if (type === 'brushing') {
        statUpdate.totalBrushings = (userProfile.totalBrushings || 0) + 1;
      } else if (type === 'floss') {
        statUpdate.totalFlossings = (userProfile.totalFlossings || 0) + 1;
      } else if (type === 'mouthwash') {
        statUpdate.totalMouthwash = (userProfile.totalMouthwash || 0) + 1;
      }

      awardPoints(points, `${name} completado`, statUpdate);
    }
  };

  // 2-minute brushing timer completed
  const handleTimerCompleted = () => {
    const newStreak = userProfile.brushingStreak + 1;
    awardPoints(25, 'Temporizador de 2 min completado con éxito', {
      totalTimerCompletions: (userProfile.totalTimerCompletions || 0) + 1,
      totalBrushings: (userProfile.totalBrushings || 0) + 1,
      brushingStreak: newStreak
    });

    dispatchNotification({
      id: `notif-timer-${Date.now()}`,
      category: 'hygiene_reminder',
      priority: 'normal',
      title: '¡Sesión de 2 minutos completada!',
      message: 'Excelente técnica en los 4 cuadrantes. Tus dientes están limpios y protegidos por Sonrisas Brillantes.',
      timestamp: 'Ahora',
      read: false
    });
  };

  // Toggle reminder enabled
  const handleToggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
    if (soundEnabled) soundManager.playSoftClick();
  };

  // Update reminder time
  const handleUpdateReminderTime = (id: string, newTime: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, time: newTime } : r))
    );
  };

  // Add custom reminder
  const handleAddReminder = (newRem: HygieneReminder) => {
    setReminders(prev => [newRem, ...prev]);
    dispatchNotification({
      id: `notif-rem-created-${Date.now()}`,
      category: 'hygiene_reminder',
      priority: 'normal',
      title: 'Nuevo recordatorio activado',
      message: `Te avisaremos diariamente a las ${newRem.time} para tu ${newRem.title.toLowerCase()}.`,
      timestamp: 'Ahora',
      read: true
    });
  };

  // Request Browser Notification Permission
  const handleRequestBrowserNotification = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setUserProfile(prev => ({
          ...prev,
          browserNotificationsAllowed: true
        }));
        dispatchNotification({
          id: `notif-perm-${Date.now()}`,
          category: 'clinical_alert',
          priority: 'normal',
          title: 'Notificaciones Web activadas',
          message: 'Recibirás las alertas de citas y avisos de higiene bucal directamente en tu pantalla.',
          timestamp: 'Ahora',
          read: false
        });
      }
    }
  };

  // Trigger immediate test hygiene alert
  const handleTriggerTestHygieneAlert = () => {
    dispatchNotification({
      id: `notif-test-${Date.now()}`,
      category: 'hygiene_reminder',
      priority: 'normal',
      title: 'Alarma de Higiene: Sonrisas Brillantes',
      message: '¡Es momento de tu cepillado diario! Recuerda dedicar 30 segundos a cada cuadrante para un esmalte reluciente.',
      timestamp: 'Ahora mismo',
      read: false,
      actionLabel: 'Comenzar 2 min guiados',
      actionType: 'start_timer'
    });
  };

  // Reset toothbrush replacement date
  const handleResetToothbrushDate = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setUserProfile(prev => ({
      ...prev,
      toothbrushChangeDate: todayStr
    }));
    if (soundEnabled) soundManager.playSoftClick();

    dispatchNotification({
      id: `notif-brush-renewed-${Date.now()}`,
      category: 'clinical_alert',
      priority: 'normal',
      title: 'Cepillo Dental Renovado',
      message: '¡Excelente decisión! Las cerdas nuevas eliminan hasta un 30% más de placa que un cepillo desgastado.',
      timestamp: 'Ahora',
      read: false
    });
  };

  // Clinic simulation notification trigger
  const handleSendSimulationNotification = (
    category: NotificationCategory,
    title: string,
    message: string,
    priority: NotificationPriority,
    actionLabel?: string,
    actionType?: 'view_treatment' | 'view_appointment' | 'start_timer'
  ) => {
    // If it was a treatment change, update the treatment plan's lastUpdated as well!
    if (category === 'treatment_change') {
      setTreatments(prev =>
        prev.map((t, idx) => {
          if (idx === 0) {
            return {
              ...t,
              lastUpdated: 'Recién actualizado por Dra. Carmen Morales',
              steps: t.steps.map(step =>
                step.status === 'current'
                  ? { ...step, doctorNotes: message }
                  : step
              )
            };
          }
          return t;
        })
      );
    }

    // If it's a new appointment, add a simulated appointment
    if (category === 'new_appointment') {
      const newApp: DentalAppointment = {
        id: `app-sim-${Date.now()}`,
        treatmentTitle: 'Ortodoncia & Control de Alineadores',
        doctorName: 'Dra. Carmen Morales',
        doctorSpecialty: 'Ortodoncista',
        date: '2026-10-24',
        time: '11:30',
        clinicRoom: 'Sillón 3 · Sonrisas Brillantes (Piso 2)',
        status: 'confirmed',
        reason: 'Control clínico adicional programado por especialista',
        notes: 'Traer alineadores actuales limpios.',
        reminderSent: true
      };
      setAppointments(prev => [newApp, ...prev]);
    }

    dispatchNotification({
      id: `notif-sim-${Date.now()}`,
      category,
      priority,
      title,
      message,
      timestamp: 'Ahora mismo',
      read: false,
      actionLabel,
      actionType
    });
  };

  // Confirm appointment
  const handleConfirmAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'confirmed' } : a))
    );
    awardPoints(20, 'Cita en Sonrisas Brillantes confirmada con anticipación');
    dispatchNotification({
      id: `notif-app-confirmed-${Date.now()}`,
      category: 'new_appointment',
      priority: 'normal',
      title: 'Asistencia Confirmada',
      message: 'Hemos registrado tu confirmación. El equipo de Sonrisas Brillantes te espera puntualmente.',
      timestamp: 'Ahora',
      read: false
    });
  };

  // Request reschedule appointment
  const handleRequestReschedule = (id: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'rescheduled' } : a))
    );
    dispatchNotification({
      id: `notif-app-reschedule-${Date.now()}`,
      category: 'rescheduled',
      priority: 'important',
      title: 'Solicitud de Reprogramación Enviada',
      message: 'Recepción de Sonrisas Brillantes se pondrá en contacto contigo para coordinar una nueva fecha.',
      timestamp: 'Ahora',
      read: false
    });
  };

  // Action click handler from toast or notification list
  const handleNotificationAction = (notif: AppNotification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setActiveToast(null);

    if (notif.actionType === 'start_timer') {
      setIsTimerOpen(true);
    } else if (notif.actionType === 'view_treatment') {
      setActiveTab('treatments');
    } else if (notif.actionType === 'view_appointment') {
      setActiveTab('treatments');
    } else if (notif.actionType === 'view_reminder') {
      setActiveTab('gamification');
    } else {
      setActiveTab('treatments');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Active notification floating toast */}
      <ActiveNotificationToast
        notification={activeToast}
        onDismiss={() => setActiveToast(null)}
        onActionClick={handleNotificationAction}
      />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          if (tab === 'clinic_sim') {
            setIsClinicSimOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        userProfile={userProfile}
        unreadCount={unreadCount}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        soundEnabled={soundEnabled}
        toggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenTimer={() => setIsTimerOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'hygiene' && (
          <HygieneReminders
            reminders={reminders}
            onToggleReminder={handleToggleReminder}
            onUpdateReminderTime={handleUpdateReminderTime}
            onAddReminder={handleAddReminder}
            onOpenTimer={() => setIsTimerOpen(true)}
            todayLog={todayLog}
            onToggleRoutineItem={handleToggleRoutineItem}
            userProfile={userProfile}
            onRequestBrowserNotification={handleRequestBrowserNotification}
            onTriggerTestHygieneAlert={handleTriggerTestHygieneAlert}
            onResetToothbrushDate={handleResetToothbrushDate}
          />
        )}

        {activeTab === 'treatments' && (
          <TreatmentPlans
            treatments={treatments}
            appointments={appointments}
            onConfirmAppointment={handleConfirmAppointment}
            onRequestReschedule={handleRequestReschedule}
            onOpenClinicSim={() => setIsClinicSimOpen(true)}
          />
        )}

        {activeTab === 'gamification' && (
          <AchievementsView
            userProfile={userProfile}
            achievements={achievements}
            onOpenTimer={() => setIsTimerOpen(true)}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsCenter
            notifications={notifications}
            onMarkAsRead={id =>
              setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, read: true } : n))
              )
            }
            onMarkAllAsRead={() =>
              setNotifications(prev => prev.map(n => ({ ...n, read: true })))
            }
            onClearAll={() => setNotifications([])}
            onActionClick={handleNotificationAction}
          />
        )}
      </main>

      {/* 2-Minute Guided Brushing Timer Modal */}
      <BrushingTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onComplete={handleTimerCompleted}
        soundEnabled={soundEnabled}
      />

      {/* Clinic Simulation / Doctor Actions Modal */}
      <ClinicSimulationModal
        isOpen={isClinicSimOpen}
        onClose={() => setIsClinicSimOpen(false)}
        onSendSimulationNotification={handleSendSimulationNotification}
      />
    </div>
  );
}
