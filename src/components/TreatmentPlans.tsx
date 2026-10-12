import React, { useState } from 'react';
import {
  TreatmentPlan,
  DentalAppointment
} from '../types/dental';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  HeartPulse,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface TreatmentPlansProps {
  treatments: TreatmentPlan[];
  appointments: DentalAppointment[];
  onConfirmAppointment: (id: string) => void;
  onRequestReschedule: (id: string) => void;
  onOpenClinicSim: () => void;
}

export const TreatmentPlans: React.FC<TreatmentPlansProps> = ({
  treatments,
  appointments,
  onConfirmAppointment,
  onRequestReschedule,
  onOpenClinicSim
}) => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(
    treatments[0]?.id || ''
  );

  const selectedTreatment =
    treatments.find(t => t.id === selectedTreatmentId) || treatments[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                Atención Clínica Personalizada
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                · Sonrisas Brillantes
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              Mis Planes de Tratamiento y Citas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Consulta en tiempo real la evolución de tu salud dental, avisos del odontólogo, modificaciones en tus fases y próximas citas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenClinicSim}
              className="px-4 py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 text-xs font-bold transition-all flex items-center gap-2"
              title="Abre el panel de la clínica para simular cambios de tratamiento o agendar citas"
            >
              <HeartPulse className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Simular Cambio o Cita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                Próximas Citas en Sonrisas Brillantes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Alertas y confirmaciones automáticas de tus visitas programadas
              </p>
            </div>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              No tienes citas programadas actualmente en Sonrisas Brillantes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-sky-300 dark:hover:border-sky-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-900">
                    {app.treatmentTitle}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {app.status === 'confirmed' ? 'Confirmada' : 'Reprogramada'}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    {app.reason}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1">
                    <User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>{app.doctorName} · {app.doctorSpecialty}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    <span>{app.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{app.time} hrs</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{app.clinicRoom}</span>
                </div>

                {app.prepInstructions && app.prepInstructions.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
                    <span className="font-bold block text-amber-800 dark:text-amber-300">
                      Indicaciones previas a la cita:
                    </span>
                    {app.prepInstructions.map((inst, i) => (
                      <div key={i} className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <span className="w-1 h-1 rounded-full bg-amber-500" />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => onRequestReschedule(app.id)}
                    className="text-xs text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-medium"
                  >
                    Reprogramar
                  </button>
                  <button
                    onClick={() => onConfirmAppointment(app.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-teal-500/20"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirmada</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Treatment Plans Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {treatments.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTreatmentId(t.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
              selectedTreatmentId === t.id
                ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.title}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedTreatmentId === t.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
              {t.progressPercentage}%
            </span>
          </button>
        ))}
      </div>

      {/* Selected Treatment Detail View */}
      {selectedTreatment && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2 Cols: Plan Details & Steps Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {selectedTreatment.category}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    Inicio: {selectedTreatment.startDate}
                  </span>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  En Progreso ({selectedTreatment.progressPercentage}%)
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">
                {selectedTreatment.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {selectedTreatment.description}
              </p>

              {/* Progress bar */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  <span>Avance total del tratamiento</span>
                  <span className="text-teal-600 dark:text-teal-400 font-extrabold">
                    {selectedTreatment.progressPercentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200/70 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-sky-400 rounded-full transition-all duration-500"
                    style={{ width: `${selectedTreatment.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Doctor Alert / Recent Modification Banner */}
              <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 mb-8 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-xs text-rose-900 dark:text-rose-200">
                      Última Modificación del Plan
                    </span>
                    <span className="text-[10px] text-rose-600 dark:text-rose-400">
                      ({selectedTreatment.lastUpdated})
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedTreatment.steps.find(s => s.status === 'current')?.doctorNotes ||
                      'El plan se encuentra actualizado con normalidad según la última revisión clínica.'}
                  </p>
                </div>
              </div>

              {/* Timeline of Steps */}
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Fases del Plan Odontológico</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {selectedTreatment.steps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';

                    return (
                      <div key={step.id} className="relative">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isCompleted
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : isCurrent
                              ? 'bg-white dark:bg-slate-900 border-teal-500 text-teal-500 animate-pulse'
                              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-300'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-teal-500" />
                          )}
                        </div>

                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800 shadow-xs'
                              : isCompleted
                              ? 'bg-slate-50/40 dark:bg-slate-800/20 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-80'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="font-bold text-sm text-slate-800 dark:text-white">
                              {step.title}
                            </h5>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isCompleted
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : isCurrent
                                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                              }`}
                            >
                              {isCompleted ? 'Completado' : isCurrent ? 'Fase Actual' : 'Pendiente'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {step.description}
                          </p>

                          {step.doctorNotes && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 text-xs text-teal-900 dark:text-teal-200">
                              <span className="font-bold block text-[11px] text-teal-700 dark:text-teal-400">
                                💬 Nota de la especialista:
                              </span>
                              {step.doctorNotes}
                            </div>
                          )}

                          {step.completedDate && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                              Realizado el {step.completedDate}
                            </p>
                          )}
                          {step.estimatedDate && (
                            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-2">
                              Estimado para {step.estimatedDate}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Specialist Doctor & Home Care Instructions */}
          <div className="space-y-6">
            {/* Specialist Doctor Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4">
                Odontólogo Responsable
              </h4>

              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={selectedTreatment.doctorAvatar}
                  alt={selectedTreatment.doctorName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-200 dark:border-teal-800 shadow-sm"
                />
                <div>
                  <h5 className="font-bold text-sm text-slate-800 dark:text-white">
                    {selectedTreatment.doctorName}
                  </h5>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                    {selectedTreatment.doctorSpecialty}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    Clínica Sonrisas Brillantes
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">Atención:</span>
                  <span className="font-bold text-slate-800 dark:text-white">Lunes a Viernes</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Emergencias:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">+56 9 8765 4321</span>
                </div>
              </div>
            </div>

            {/* Home Care Indications for this Treatment */}
            <div className="bg-gradient-to-br from-teal-50/60 to-emerald-50/60 dark:from-slate-900 dark:to-teal-950/20 rounded-3xl p-6 border border-teal-200/60 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">
                  Cuidados en Casa Recomendados
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Pautas específicas para garantizar el éxito de tu tratamiento de {selectedTreatment.category.toLowerCase()}:
              </p>

              <div className="space-y-2.5">
                {selectedTreatment.homeCareInstructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-teal-100 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
