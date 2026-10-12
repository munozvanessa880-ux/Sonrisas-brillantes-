import React, { useState } from 'react';
import {
  Stethoscope,
  Send,
  Calendar,
  HeartPulse,
  Sparkles,
  ShieldAlert,
  X
} from 'lucide-react';
import { NotificationCategory, NotificationPriority } from '../types/dental';

interface ClinicSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSimulationNotification: (
    category: NotificationCategory,
    title: string,
    message: string,
    priority: NotificationPriority,
    actionLabel?: string,
    actionType?: 'view_treatment' | 'view_appointment' | 'start_timer'
  ) => void;
}

export const ClinicSimulationModal: React.FC<ClinicSimulationModalProps> = ({
  isOpen,
  onClose,
  onSendSimulationNotification
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('treatment_mod');
  const [customTitle, setCustomTitle] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customCategory, setCustomCategory] = useState<NotificationCategory>('treatment_change');
  const [customPriority, setCustomPriority] = useState<NotificationPriority>('important');

  if (!isOpen) return null;

  const presets = [
    {
      id: 'treatment_mod',
      label: 'Modificación de Plan de Tratamiento',
      doctor: 'Dra. Carmen Morales (Ortodoncista)',
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
      title: '¡Modificación en tu Plan de Ortodoncia!',
      message: 'La Dra. Morales revisó tus escaneos: debes usar el alineador #8 tres días adicionales antes de pasar al #9 para asegurar el anclaje perfecto.',
      category: 'treatment_change' as NotificationCategory,
      priority: 'important' as NotificationPriority,
      actionLabel: 'Ver Plan de Tratamiento',
      actionType: 'view_treatment' as const
    },
    {
      id: 'new_appointment',
      label: 'Nueva Cita Agendada por la Clínica',
      doctor: 'Recepción · Clínica Sonrisas Brillantes',
      icon: <Calendar className="w-5 h-5 text-sky-500" />,
      title: 'Nueva Cita Confirmada en Sonrisas Brillantes',
      message: 'Se ha agendado tu cita de control para el 24 de Octubre a las 11:30 AM en Sillón 3 con el Dr. Mateo Castillo.',
      category: 'new_appointment' as NotificationCategory,
      priority: 'important' as NotificationPriority,
      actionLabel: 'Ver Cita Dental',
      actionType: 'view_appointment' as const
    },
    {
      id: 'hygiene_push',
      label: 'Recordatorio Diario de Cepillado',
      doctor: 'Sistema de Higiene Bucal',
      icon: <Sparkles className="w-5 h-5 text-teal-500" />,
      title: '¡Hora de tu Cepillado Nocturno!',
      message: 'Antes de acostarte, dedica 2 minutos a tus dientes y usa hilo dental. ¡Tus encías y alineadores lo agradecerán!',
      category: 'hygiene_reminder' as NotificationCategory,
      priority: 'normal' as NotificationPriority,
      actionLabel: 'Iniciar Temporizador 2 min',
      actionType: 'start_timer' as const
    },
    {
      id: 'post_care',
      label: 'Indicaciones Post-Tratamiento Clínico',
      doctor: 'Dr. Mateo Castillo (Periodoncia)',
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      title: 'Cuidados Post-Limpieza y Profilaxis',
      message: 'Evita alimentos con colorantes intensos (café, vino, salsa de tomate) durante las próximas 24 horas para preservar el brillo de tu esmalte.',
      category: 'clinical_alert' as NotificationCategory,
      priority: 'normal' as NotificationPriority,
      actionLabel: 'Entendido',
      actionType: undefined
    }
  ];

  const handleSendPreset = (preset: typeof presets[0]) => {
    onSendSimulationNotification(
      preset.category,
      preset.title,
      preset.message,
      preset.priority,
      preset.actionLabel,
      preset.actionType
    );
    onClose();
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customMessage.trim()) return;

    onSendSimulationNotification(
      customCategory,
      customTitle.trim(),
      customMessage.trim(),
      customPriority,
      'Ver Detalles'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-teal-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">
                Simulador Clínico Sonrisas Brillantes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Prueba en vivo el sistema de notificaciones y alertas personalizadas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Triggers */}
        <div className="mb-6">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
            Escenarios Rápidos de Prueba (1 Click)
          </h4>

          <div className="grid grid-cols-1 gap-2.5">
            {presets.map(p => (
              <div
                key={p.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-teal-300 dark:hover:border-teal-700 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs shrink-0">
                    {p.icon}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-slate-800 dark:text-white">
                      {p.label}
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                      {p.doctor} · {p.message}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSendPreset(p)}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-sm shadow-teal-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Disparar Alerta</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Notification Form */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
            O Redactar una Notificación Personalizada
          </h4>

          <form onSubmit={handleSendCustom} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Categoría
                </label>
                <select
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value as NotificationCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                >
                  <option value="treatment_change">Modificación Tratamiento</option>
                  <option value="new_appointment">Nueva Cita</option>
                  <option value="hygiene_reminder">Recordatorio Higiene</option>
                  <option value="clinical_alert">Consejo Clínico</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Prioridad
                </label>
                <select
                  value={customPriority}
                  onChange={e => setCustomPriority(e.target.value as NotificationPriority)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                >
                  <option value="normal">Normal</option>
                  <option value="important">Importante</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Título del aviso
              </label>
              <input
                type="text"
                required
                placeholder="ej. Ajuste en fecha de tu próxima profilaxis"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Mensaje detallado para el paciente
              </label>
              <textarea
                required
                rows={2}
                placeholder="ej. Tu odontólogo te recuerda que debes usar la pasta desensibilizante durante esta semana."
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Notificación a Paciente</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
