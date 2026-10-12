import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BrushingTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  soundEnabled: boolean;
}

const QUADRANTS = [
  {
    id: 1,
    name: 'Cuadrante 1: Superior Derecho',
    shortName: 'Sup. Derecho',
    instruction: 'Limpia caras externas con movimientos circulares a 45°, luego caras internas y masticatorias.',
    color: '#06b6d4', // cyan-500
    pastelBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    pastelBorder: 'border-cyan-200 dark:border-cyan-800'
  },
  {
    id: 2,
    name: 'Cuadrante 2: Superior Izquierdo',
    shortName: 'Sup. Izquierdo',
    instruction: 'Desliza suavemente desde la encía hacia la corona del diente sin apretar en exceso.',
    color: '#3b82f6', // blue-500
    pastelBg: 'bg-blue-50 dark:bg-blue-950/40',
    pastelBorder: 'border-blue-200 dark:border-blue-800'
  },
  {
    id: 3,
    name: 'Cuadrante 3: Inferior Izquierdo',
    shortName: 'Inf. Izquierdo',
    instruction: 'Presta atención a las muelas posteriores donde más placa suele acumularse.',
    color: '#10b981', // emerald-500
    pastelBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    pastelBorder: 'border-emerald-200 dark:border-emerald-800'
  },
  {
    id: 4,
    name: 'Cuadrante 4: Inferior Derecho',
    shortName: 'Inf. Derecho',
    instruction: '¡Último tramo! Cepilla la cara interna de los incisivos con el cepillo en vertical.',
    color: '#f59e0b', // amber-500
    pastelBg: 'bg-amber-50 dark:bg-amber-950/40',
    pastelBorder: 'border-amber-200 dark:border-amber-800'
  }
];

export const BrushingTimerModal: React.FC<BrushingTimerModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  soundEnabled
}) => {
  const TOTAL_SECONDS = 120; // 2 minutes
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [muted, setMuted] = useState(!soundEnabled);

  const prevQuadrantRef = useRef(1);

  // Determine current quadrant
  // 120s - 91s: Q1 (0-30 elapsed)
  // 90s - 61s: Q2 (30-60 elapsed)
  // 60s - 31s: Q3 (60-90 elapsed)
  // 30s - 0s: Q4 (90-120 elapsed)
  const elapsed = TOTAL_SECONDS - secondsRemaining;
  const currentQuadIndex = Math.min(3, Math.floor(elapsed / 30));
  const currentQuadrant = QUADRANTS[currentQuadIndex];
  const quadElapsed = elapsed % 30;
  const quadRemaining = 30 - quadElapsed;

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            if (!muted) soundManager.playCompletionCelebration();
            return 0;
          }
          const next = prev - 1;
          const nextElapsed = TOTAL_SECONDS - next;
          const newQuad = Math.min(3, Math.floor(nextElapsed / 30)) + 1;
          if (newQuad !== prevQuadrantRef.current && next > 0) {
            prevQuadrantRef.current = newQuad;
            if (!muted) soundManager.playQuadrantTransition();
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, muted]);

  const handleStartPause = () => {
    if (!muted) soundManager.playSoftClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    if (!muted) soundManager.playSoftClick();
    setIsRunning(false);
    setSecondsRemaining(TOTAL_SECONDS);
    setIsFinished(false);
    prevQuadrantRef.current = 1;
  };

  const handleFinishAndSave = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  const totalProgress = ((TOTAL_SECONDS - secondsRemaining) / TOTAL_SECONDS) * 100;
  const quadProgress = (quadElapsed / 30) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-teal-100 dark:border-slate-800 relative overflow-hidden transition-colors">
        {/* Decorative pastel background glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-rose-100/50 dark:bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                Temporizador de Cepillado 2 Min
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-200">
                Técnica guiada recomendada por Sonrisas Brillantes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={muted ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="py-6 flex flex-col items-center relative z-10">
            {/* Visual Circular Timer */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={currentQuadrant.color}
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * totalProgress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tracking-tight font-mono text-slate-800 dark:text-white">
                  {formattedTime}
                </span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 mt-1">
                  {quadRemaining}s en este cuadrante
                </span>
              </div>
            </div>

            {/* Quadrant Visual Selector Map */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs mb-5">
              {QUADRANTS.map((quad, index) => {
                const isActive = currentQuadIndex === index;
                const isPassed = currentQuadIndex > index;
                return (
                  <div
                    key={quad.id}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      isActive
                        ? `${quad.pastelBg} ${quad.pastelBorder} ring-2 ring-teal-400 dark:ring-teal-500 shadow-sm scale-102`
                        : isPassed
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      <span className="text-xs font-bold">{quad.shortName}</span>
                    </div>
                    <span className="text-[11px] block text-slate-700 dark:text-slate-300">
                      {isPassed ? 'Listo' : isActive ? `${quadRemaining}s` : '30s'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Guidance card */}
            <div className={`w-full p-4 rounded-2xl border ${currentQuadrant.pastelBg} ${currentQuadrant.pastelBorder} transition-all mb-4`}>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-teal-900 dark:text-teal-200 mb-0.5">
                    {currentQuadrant.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentQuadrant.instruction}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                onClick={handleReset}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Reiniciar temporizador"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={handleStartPause}
                className={`flex-1 max-w-[200px] py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                  isRunning
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 hover:bg-amber-200'
                    : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/20 hover:scale-101'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" /> Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" /> {secondsRemaining === TOTAL_SECONDS ? 'Iniciar' : 'Continuar'}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Finished State */
          <div className="py-8 flex flex-col items-center text-center relative z-10 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">
              ¡Dientes Impecables!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed">
              Has completado los 2 minutos de cepillado recomendados por los especialistas de Sonrisas Brillantes. ¡Tu salud bucal te lo agradece!
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-3.5 mb-6 w-full flex items-center justify-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>+25 puntos de salud bucal ganados</span>
            </div>

            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 px-6 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-lg shadow-teal-500/25 transition-all"
            >
              Registrar y Recoger Puntos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
