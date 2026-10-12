import React from 'react';
import { AppNotification } from '../types/dental';
import { Bell, Sparkles, Calendar, HeartPulse, X, ArrowRight } from 'lucide-react';

interface ActiveNotificationToastProps {
  notification: AppNotification | null;
  onDismiss: () => void;
  onActionClick: (notification: AppNotification) => void;
}

export const ActiveNotificationToast: React.FC<ActiveNotificationToastProps> = ({
  notification,
  onDismiss,
  onActionClick
}) => {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.category) {
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

  const getBadgeStyle = () => {
    switch (notification.category) {
      case 'treatment_change':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'new_appointment':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-900';
      case 'hygiene_reminder':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900';
      default:
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-slide-down">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-teal-200/80 dark:border-slate-800 transition-all hover:shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0">
            {getIcon()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle()}`}>
                {notification.category === 'treatment_change' ? 'Cambio en Tratamiento' :
                 notification.category === 'new_appointment' ? 'Cita Dental' :
                 notification.category === 'hygiene_reminder' ? 'Higiene Bucal' : 'Alerta Clínica'}
              </span>
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">
              {notification.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {notification.message}
            </p>

            {notification.actionLabel && (
              <button
                onClick={() => onActionClick(notification)}
                className="mt-3 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{notification.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
