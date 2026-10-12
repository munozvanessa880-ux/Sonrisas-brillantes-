import {
  HygieneReminder,
  TreatmentPlan,
  DentalAppointment,
  AppNotification,
  Achievement,
  UserProfile
} from '../types/dental';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Valentina Silva',
  email: 'valentina.silva@sonrisasbrillantes.com',
  points: 235,
  level: 2,
  levelTitle: 'Cuidador Bucal Constante',
  brushingStreak: 5,
  totalBrushings: 18,
  totalFlossings: 7,
  totalMouthwash: 8,
  totalTimerCompletions: 4,
  lastBrushingDate: new Date().toISOString().split('T')[0],
  toothbrushChangeDate: '2026-08-15',
  soundEnabled: true,
  browserNotificationsAllowed: false,
  dailyGoalCount: 3,
  pointsHistory: [
    {
      id: 'p-1',
      reason: 'Cepillado guiado de 2 min completado',
      points: 25,
      timestamp: 'Hoy, 08:30 AM',
      icon: 'sparkles'
    },
    {
      id: 'p-2',
      reason: 'Uso de enjuague bucal registrado',
      points: 10,
      timestamp: 'Hoy, 08:35 AM',
      icon: 'droplets'
    },
    {
      id: 'p-3',
      reason: 'Uso de hilo dental nocturno',
      points: 10,
      timestamp: 'Ayer, 10:20 PM',
      icon: 'smile'
    },
    {
      id: 'p-4',
      reason: 'Racha de 5 días alcanzada',
      points: 40,
      timestamp: 'Ayer, 10:22 PM',
      icon: 'flame'
    }
  ]
};

export const INITIAL_HYGIENE_REMINDERS: HygieneReminder[] = [
  {
    id: 'rem-1',
    type: 'brushing',
    title: 'Cepillado Matutino',
    time: '08:00',
    period: 'morning',
    enabled: true,
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    description: 'Comienza el día con aliento fresco y dientes limpios tras el desayuno.',
    iconName: 'sun',
    color: 'emerald'
  },
  {
    id: 'rem-2',
    type: 'brushing',
    title: 'Cepillado de Mediodía',
    time: '14:00',
    period: 'afternoon',
    enabled: true,
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    description: 'Elimina residuos y placa bacteriana después de tu almuerzo.',
    iconName: 'coffee',
    color: 'sky'
  },
  {
    id: 'rem-3',
    type: 'brushing',
    title: 'Cepillado Nocturno Esencial',
    time: '22:00',
    period: 'night',
    enabled: true,
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    description: '¡El más importante! La saliva disminuye de noche, protegiendo menos tus dientes.',
    iconName: 'moon',
    color: 'indigo'
  },
  {
    id: 'rem-4',
    type: 'floss',
    title: 'Hilo Dental Diario',
    time: '22:10',
    period: 'night',
    enabled: true,
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    description: 'Llega donde el cepillo no puede. Fundamental para evitar caries interdentales.',
    iconName: 'shield',
    color: 'rose'
  },
  {
    id: 'rem-5',
    type: 'mouthwash',
    title: 'Enjuague Bucal Fluorurado',
    time: '22:15',
    period: 'night',
    enabled: true,
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    description: '30 segundos de colutorio sin tragar para remineralizar el esmalte.',
    iconName: 'droplets',
    color: 'cyan'
  },
  {
    id: 'rem-6',
    type: 'tongue',
    title: 'Limpieza Lingual',
    time: '08:05',
    period: 'morning',
    enabled: false,
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    description: 'Usa raspador o cepillo desde atrás hacia adelante para combatir el mal aliento.',
    iconName: 'sparkles',
    color: 'amber'
  }
];

export const INITIAL_TREATMENTS: TreatmentPlan[] = [
  {
    id: 'treat-1',
    patientName: 'Valentina Silva',
    title: 'Ortodoncia con Alineadores Invisibles',
    category: 'Ortodoncia',
    description: 'Corrección de apiñamiento anteroinferior y diastema superior mediante alineadores transparentes de última generación.',
    doctorName: 'Dra. Carmen Morales',
    doctorSpecialty: 'Ortodoncia & Ortopedia Dentofacial',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    progressPercentage: 65,
    status: 'in_progress',
    startDate: '2026-03-10',
    lastUpdated: 'Hace 2 horas (Actualizado por Dra. Morales)',
    nextAppointmentDate: '2026-10-18',
    homeCareInstructions: [
      'Llevar puestos los alineadores mínimo 22 horas al día.',
      'Retirar siempre antes de comer o beber líquidos calientes/pigmentados.',
      'Limpiar con cepillo suave, agua templada y pastilla efervescente 2 veces por semana.',
      'Si sientes molestia en la lengua con algún borde, usa cera de ortodoncia suministrada.'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Fase 1: Escaneo Intraoral 3D y ClinCheck',
        description: 'Simulación digital del movimiento dental y aprobación del plan de 18 alineadores.',
        status: 'completed',
        completedDate: '2026-03-12',
        doctorNotes: 'Oclusión clase I confirmada, espacio interproximal suficiente.'
      },
      {
        id: 'step-2',
        title: 'Fase 2: Colocación de Ataches Estéticos y Alineadores 1 al 6',
        description: 'Puntos de anclaje de composite y primera serie de alineadores.',
        status: 'completed',
        completedDate: '2026-05-20',
        doctorNotes: 'Excelente tolerancia y adaptación de la paciente.'
      },
      {
        id: 'step-3',
        title: 'Fase 3: IPR Interproximal y Alineadores 7 al 12',
        description: 'Microdesgaste controlado para ganar espacio y cambio cada 10 días.',
        status: 'current',
        estimatedDate: '2026-10-25',
        doctorNotes: '¡Aviso importante! Se amplió 3 días el alineador #8 para asegurar el movimiento radicular óptimo antes del salto al #9.'
      },
      {
        id: 'step-4',
        title: 'Fase 4: Alineadores 13 al 18 y Detallado de Sonrisa',
        description: 'Perfeccionamiento de la línea de la sonrisa y asentamiento oclusal.',
        status: 'pending',
        estimatedDate: '2026-12-15'
      },
      {
        id: 'step-5',
        title: 'Fase 5: Retenedores Vivera Nocturnos y Pulido',
        description: 'Fijación definitiva del resultado para que tu sonrisa brille para siempre.',
        status: 'pending',
        estimatedDate: '2027-02-10'
      }
    ]
  },
  {
    id: 'treat-2',
    patientName: 'Valentina Silva',
    title: 'Mantenimiento Periodontal y Profilaxis Avanzada',
    category: 'Limpieza y Prevención',
    description: 'Protocolo de higiene clínica profunda con ultrasonido y aeropulidor para proteger las encías y eliminar manchas.',
    doctorName: 'Dr. Mateo Castillo',
    doctorSpecialty: 'Periodoncia e Implantología',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    progressPercentage: 85,
    status: 'in_progress',
    startDate: '2026-04-05',
    lastUpdated: '14 de Septiembre, 2026',
    nextAppointmentDate: '2026-11-05',
    homeCareInstructions: [
      'Uso estricto de cepillo interdental de 0.6mm en molares superiores.',
      'Enjuague con clorhexidina al 0.05% sólo por 7 días tras la sesión.',
      'Cepillado suave en la línea gingival para prevenir recesión.'
    ],
    steps: [
      {
        id: 'perio-1',
        title: 'Sondeo Periodontal y Carta Gingival',
        description: 'Medición de bolsas gingivales e índice de placa.',
        status: 'completed',
        completedDate: '2026-04-05',
        doctorNotes: 'Bolsas menores a 2.5mm en general, encía sana con leve sangrado marginal.'
      },
      {
        id: 'perio-2',
        title: 'Profilaxis con Flujo de Aire (Airflow) y Ultrasonido',
        description: 'Eliminación indolora de sarro supragingival y tinciones de café.',
        status: 'completed',
        completedDate: '2026-09-14',
        doctorNotes: 'Superficie de esmalte completamente lisa y brillante.'
      },
      {
        id: 'perio-3',
        title: 'Control Preventivo Semestral y Barniz Fluorurado',
        description: 'Reevaluación de salud gingival y refuerzo de esmalte.',
        status: 'pending',
        estimatedDate: '2026-11-05'
      }
    ]
  }
];

export const INITIAL_APPOINTMENTS: DentalAppointment[] = [
  {
    id: 'app-1',
    treatmentId: 'treat-1',
    treatmentTitle: 'Ortodoncia con Alineadores Invisibles',
    doctorName: 'Dra. Carmen Morales',
    doctorSpecialty: 'Ortodoncia',
    date: '2026-10-18',
    time: '10:30',
    clinicRoom: 'Sillón 2 · Clínica Sonrisas Brillantes (Sede Central)',
    status: 'confirmed',
    reason: 'Revisión de avance del alineador #8 y entrega de alineadores #9 y #10',
    notes: 'Por favor trae puestos tus alineadores actuales y la cajita protectora.',
    prepInstructions: [
      'Cepillarte los dientes antes de ingresar a consulta.',
      'Traer todos los alineadores del set actual.',
      'Llegar 5 minutos antes para el registro en recepción.'
    ],
    reminderSent: true
  },
  {
    id: 'app-2',
    treatmentId: 'treat-2',
    treatmentTitle: 'Mantenimiento Periodontal y Profilaxis',
    doctorName: 'Dr. Mateo Castillo',
    doctorSpecialty: 'Periodoncia',
    date: '2026-11-05',
    time: '16:00',
    clinicRoom: 'Sillón 4 · Clínica Sonrisas Brillantes',
    status: 'confirmed',
    reason: 'Control periódico de encías y aplicación de flúor protector',
    reminderSent: false
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    category: 'treatment_change',
    priority: 'important',
    title: 'Modificación en tu Plan de Ortodoncia',
    message: 'La Dra. Carmen Morales ha actualizado la pauta: Se amplió 3 días el uso del alineador #8 antes del cambio al #9 para asegurar un anclaje perfecto.',
    timestamp: 'Hace 2 horas',
    read: false,
    treatmentId: 'treat-1',
    actionLabel: 'Ver Plan de Ortodoncia',
    actionType: 'view_treatment'
  },
  {
    id: 'notif-2',
    category: 'new_appointment',
    priority: 'important',
    title: 'Cita programada confirmada',
    message: 'Tu próxima cita de revisión con la Dra. Carmen Morales está confirmada para el 18 de Octubre a las 10:30 AM en Sonrisas Brillantes.',
    timestamp: 'Ayer',
    read: false,
    appointmentId: 'app-1',
    actionLabel: 'Ver Detalles de Cita',
    actionType: 'view_appointment'
  },
  {
    id: 'notif-3',
    category: 'hygiene_reminder',
    priority: 'normal',
    title: 'Recordatorio de Higiene Bucal',
    message: '¡Es hora de tu cepillado de mediodía! Tómate 2 minutos para proteger tu sonrisa y masajear tus encías.',
    timestamp: 'Hace 4 horas',
    read: true,
    actionLabel: 'Iniciar Temporizador (2 min)',
    actionType: 'start_timer'
  },
  {
    id: 'notif-4',
    category: 'clinical_alert',
    priority: 'normal',
    title: 'Consejo Clínico de Sonrisas Brillantes',
    message: 'Consejo post-cepillado: Escupe el exceso de pasta pero evita enjuagarte con abundante agua enseguida; así el flúor continuará fortaleciendo tu esmalte.',
    timestamp: 'Hace 1 día',
    read: true
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-streak-7',
    title: 'Rutina Perfecta de 7 Días',
    description: 'Registra tus cepillados durante 7 días consecutivos sin saltarte ninguno.',
    iconName: 'flame',
    pointsReward: 100,
    unlocked: false,
    category: 'streak',
    progress: 5,
    maxProgress: 7,
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'ach-mouthwash-expert',
    title: 'Experto en Enjuague Bucal',
    description: 'Completa 10 sesiones de enjuague bucal protector con colutorio.',
    iconName: 'droplets',
    pointsReward: 75,
    unlocked: false,
    category: 'mouthwash',
    progress: 8,
    maxProgress: 10,
    color: 'from-cyan-400 to-teal-500'
  },
  {
    id: 'ach-floss-master',
    title: 'Maestro del Hilo Dental',
    description: 'Utiliza hilo dental o seda interdental 10 veces para cuidar tus encías.',
    iconName: 'sparkles',
    pointsReward: 75,
    unlocked: false,
    category: 'floss',
    progress: 7,
    maxProgress: 10,
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'ach-first-brush',
    title: 'Primera Sonrisa Brillante',
    description: 'Completa tu primer registro de higiene bucal en la aplicación.',
    iconName: 'smile',
    pointsReward: 30,
    unlocked: true,
    unlockedAt: '2026-10-06',
    category: 'brushing',
    progress: 1,
    maxProgress: 1,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'ach-timer-master',
    title: '2 Minutos Impecables',
    description: 'Completa 5 sesiones completas guiadas con el temporizador dental de 4 cuadrantes.',
    iconName: 'timer',
    pointsReward: 90,
    unlocked: false,
    category: 'brushing',
    progress: 4,
    maxProgress: 5,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'ach-night-guardian',
    title: 'Guardián Nocturno',
    description: 'Registra el cepillado nocturno durante 5 días seguidos para dormir protegido.',
    iconName: 'moon',
    pointsReward: 60,
    unlocked: true,
    unlockedAt: '2026-10-10',
    category: 'streak',
    progress: 5,
    maxProgress: 5,
    color: 'from-violet-400 to-purple-600'
  },
  {
    id: 'ach-clinic-punctual',
    title: 'Paciente Estrella',
    description: 'Revisa o asiste a tus citas dentales programadas en Sonrisas Brillantes.',
    iconName: 'award',
    pointsReward: 50,
    unlocked: true,
    unlockedAt: '2026-10-09',
    category: 'clinic',
    progress: 2,
    maxProgress: 2,
    color: 'from-emerald-400 to-green-600'
  },
  {
    id: 'ach-score-500',
    title: 'Sonrisa Centelleante',
    description: 'Alcanza 500 puntos de salud dental acumulados en Sonrisas Brillantes.',
    iconName: 'trophy',
    pointsReward: 150,
    unlocked: false,
    category: 'brushing',
    progress: 235,
    maxProgress: 500,
    color: 'from-yellow-400 to-amber-600'
  }
];

export const DENTAL_TIPS = [
  'El cepillado nocturno es vital: de noche producimos menos saliva, lo que deja a los dientes más expuestos a los ácidos bacterianos.',
  'Coloca el cepillo en un ángulo de 45° respecto a las encías para limpiar el surco gingival con movimientos suaves y circulares.',
  'El hilo dental elimina hasta el 40% de la placa que el cepillo convencional no alcanza entre los dientes.',
  'Recuerda cambiar tu cepillo dental cada 3 meses o antes si las cerdas se abren o tras haber pasado por una gripe.',
  'No te enjuagues con agua abundante inmediatamente después del cepillado; deja que el flúor actúe unos minutos.',
  'Si llevas alineadores o brackets, utiliza cepillos interproximales para evitar manchas de desmineralización.'
];
