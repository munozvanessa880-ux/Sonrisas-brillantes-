export type ReminderType = 'brushing' | 'floss' | 'mouthwash' | 'tongue' | 'brush_change';

export interface HygieneReminder {
  id: string;
  type: ReminderType;
  title: string;
  time: string; // "08:00", "14:00", "22:00"
  period: 'morning' | 'afternoon' | 'night';
  enabled: boolean;
  days: string[]; // ["L", "M", "X", "J", "V", "S", "D"]
  description: string;
  iconName: string;
  color: string;
}

export interface HygieneLog {
  id: string;
  date: string; // YYYY-MM-DD
  period: 'morning' | 'afternoon' | 'night';
  type: ReminderType;
  completedAt: string;
}

export type TreatmentStatus = 'in_progress' | 'scheduled' | 'completed' | 'on_hold';

export interface TreatmentStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  estimatedDate?: string;
  completedDate?: string;
  doctorNotes?: string;
}

export interface TreatmentPlan {
  id: string;
  patientName: string;
  title: string;
  category: 'Ortodoncia' | 'Endodoncia' | 'Limpieza y Prevención' | 'Implantología' | 'Estética Dental';
  description: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar?: string;
  progressPercentage: number;
  status: TreatmentStatus;
  startDate: string;
  lastUpdated: string;
  steps: TreatmentStep[];
  nextAppointmentDate?: string;
  homeCareInstructions: string[];
}

export type AppointmentStatus = 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';

export interface DentalAppointment {
  id: string;
  treatmentId?: string;
  treatmentTitle: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string; // YYYY-MM-DD
  time: string; // "10:30"
  clinicRoom: string; // "Consultorio 3 - Sonrisas Brillantes"
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  prepInstructions?: string[];
  reminderSent: boolean;
}

export type NotificationPriority = 'normal' | 'important' | 'urgent';
export type NotificationCategory = 'treatment_change' | 'new_appointment' | 'rescheduled' | 'hygiene_reminder' | 'clinical_alert';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  treatmentId?: string;
  appointmentId?: string;
  actionLabel?: string;
  actionType?: 'view_treatment' | 'view_appointment' | 'start_timer' | 'view_reminder';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  pointsReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'floss' | 'mouthwash' | 'brushing' | 'clinic';
  progress: number;
  maxProgress: number;
  color: string;
}

export interface PointTransaction {
  id: string;
  reason: string;
  points: number;
  timestamp: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  email: string;
  points: number;
  level: number;
  levelTitle: string;
  brushingStreak: number;
  totalBrushings: number;
  totalFlossings: number;
  totalMouthwash: number;
  totalTimerCompletions: number;
  lastBrushingDate?: string;
  toothbrushChangeDate: string; // YYYY-MM-DD when it was changed
  soundEnabled: boolean;
  browserNotificationsAllowed: boolean;
  dailyGoalCount: number; // e.g. 3 cepillados al día
  pointsHistory: PointTransaction[];
}
