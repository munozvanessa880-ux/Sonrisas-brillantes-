import React, { useState } from 'react';
import {
  AppNotification,
  NotificationCategory
} from '../types/dental';
import {
  Bell,
  HeartPulse,
  Calendar,
  Sparkles,
  CheckCheck,
  Trash2,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface NotificationsCenterProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onActionClick: (notification: AppNotification) => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onActionClick
}) => {
  const [filter, setFilter] = useState<'all' | NotificationCategory>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getCategoryIcon = (cat: NotificationCategory) => {
    switch (cat) {
      case 'treatment_change':
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'new_appointment':
      case 'rescheduled':
        return <Calendar className="w-5 h-5 text-sky-500" />;
      case 'hygiene_reminder':
        return <Sparkles className="w-5 h-5 text-teal-500" />;
      default:
        return <Bell className="w-5 h-5 text-amber-500" />;
    }
  };

  const getCategoryBadge = (cat: NotificationCategory) => {
    switch (cat) {
      case 'treatment_change':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'new_appointment':
      case 'rescheduled':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-900';
      case 'hygiene_reminder':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900';
      default:
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900';
    }
  };

  const getCategoryLabel = (cat: NotificationCategory) => {
    switch (cat) {
      case 'treatment_change':
        return 'Modificación de Tratamiento';
      case 'new_appointment':
        return 'Nueva Cita';
      case 'rescheduled':
        return 'Cita Reprogramada';
      case 'hygiene_reminder':
        return 'Recordatorio de Higiene';
      default:
        return 'Consejo Clínico';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white">
                  Centro de Notificaciones
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-black">
                    {unreadCount} sin leer
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Alertas personalizadas de tratamientos y recordatorios diarios de Sonrisas Brillantes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <CheckCheck className="w-4 h-4 text-teal-600" />
                <span>Marcar todas como leídas</span>
              </button>
            )}

            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Limpiar todas las notificaciones"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />

          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              filter === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Todas ({notifications.length})
          </button>

          <button
            onClick={() => setFilter('treatment_change')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              filter === 'treatment_change'
                ? 'bg-rose-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Tratamientos
          </button>

          <button
            onClick={() => setFilter('new_appointment')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              filter === 'new_appointment'
                ? 'bg-sky-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Citas
          </button>

          <button
            onClick={() => setFilter('hygiene_reminder')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              filter === 'hygiene_reminder'
                ? 'bg-teal-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Higiene Bucal
          </button>

          <button
            onClick={() => setFilter('clinical_alert')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              filter === 'clinical_alert'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Consejos Clínicos
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-teal-500" />
            </div>
            <h4 className="font-bold text-base text-slate-800 dark:text-white">
              ¡Estás al día!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto">
              No tienes notificaciones pendientes en esta categoría. Puedes generar alertas de prueba desde el simulador clínico.
            </p>
          </div>
        ) : (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                !item.read
                  ? 'bg-white dark:bg-slate-900 border-teal-200 dark:border-slate-700 shadow-sm ring-1 ring-teal-400/30'
                  : 'bg-white/80 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 shrink-0">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-teal-500" title="No leída" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">
                      {item.timestamp}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {item.actionLabel ? (
                      <button
                        onClick={() => onActionClick(item)}
                        className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1.5 transition-colors"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div />
                    )}

                    {!item.read && (
                      <button
                        onClick={() => onMarkAsRead(item.id)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 transition-colors"
                      >
                        Marcar leída
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
