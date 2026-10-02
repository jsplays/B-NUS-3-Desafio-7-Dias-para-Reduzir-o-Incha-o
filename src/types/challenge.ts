export interface ChecklistItem {
  id: string;
  label: string;
}

export interface DayData {
  dayNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  objective: string;
  taskTitle: string;
  taskDescription: string;
  taskBullets?: string[];
  swaps?: { from: string; to: string }[];
  recipe?: {
    title: string;
    description: string;
    imagePath?: string;
    ingredients: string[];
    instructions: string[];
    tips?: string;
  };
  checklist: ChecklistItem[];
  tips?: string[];
  primaryToolType?: 'water' | 'food_journal' | 'morning_movement' | 'massage_timer' | 'dinner_builder' | 'compare_metrics';
}

export interface MealLogItem {
  id: string;
  meal: string;
  time: string;
  food: string;
  reaction: string;
  triggers: string[];
}

export interface DayProgress {
  completedChecklist: string[]; // item ids
  rating: number; // 0 to 10
  ratingType?: string; // inchaço, energia, desconforto, etc.
  secondaryRating?: number; // e.g. hydration or energy
  notes: string;
  completedAt?: string;
}

export interface InitialCheckIn {
  startDate: string;
  howFeeling: string;
  mainGoal: string;
  initialBloatingLevel: number;
}

export interface FinalCheckIn {
  currentBloatingLevel: number;
  initialEnergyLevel: number;
  currentEnergyLevel: number;
  sleepQuality: 'pior' | 'igual' | 'melhor' | '';
  digestionQuality: 'pior' | 'igual' | 'melhor' | '';
  whatWorked: string;
  whatDidntWork: string;
  habitToKeep: string;
  bodyMeasurements?: {
    weight?: string;
    waist?: string;
    abdomen?: string;
  };
  signature: string;
  signatureDate: string;
  completedGraduationChecklist: string[];
}

export interface UserProgressState {
  disclaimerAccepted: boolean;
  disclaimerAcceptedAt?: string;
  currentActiveDay: number;
  initialCheckIn: InitialCheckIn;
  days: Record<number, DayProgress>;
  waterLog: {
    targetGlasses: number;
    glassesConsumed: number;
    timeline: { [key: string]: boolean };
  };
  mealLogs: MealLogItem[];
  finalCheckIn: FinalCheckIn;
}
