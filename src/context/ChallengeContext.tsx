import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgressState, MealLogItem } from '../types/challenge';
import { DAYS_DATA } from '../data/challengeData';

const STORAGE_KEY = 'desafio_menos_inchaco_progress_v1';

const defaultInitialState: UserProgressState = {
  disclaimerAccepted: false,
  disclaimerAcceptedAt: undefined,
  currentActiveDay: 1,
  initialCheckIn: {
    startDate: new Date().toISOString().split('T')[0],
    howFeeling: '',
    mainGoal: '',
    initialBloatingLevel: 6,
  },
  days: {
    1: { completedChecklist: [], rating: 6, ratingType: 'inchaço', notes: '' },
    2: { completedChecklist: [], rating: 6, ratingType: 'energia', secondaryRating: 2, notes: '' },
    3: { completedChecklist: [], rating: 5, ratingType: 'desconforto', notes: '' },
    4: { completedChecklist: [], rating: 7, ratingType: 'energia', notes: '' },
    5: { completedChecklist: [], rating: 4, ratingType: 'desconforto', notes: '' },
    6: { completedChecklist: [], rating: 8, ratingType: 'saciedade', notes: '' },
    7: { completedChecklist: [], rating: 3, ratingType: 'inchaço', notes: '' },
  },
  waterLog: {
    targetGlasses: 8,
    glassesConsumed: 0,
    timeline: {
      ao_acordar: false,
      manha: false,
      almoco_tarde: false,
      tarde: false,
      jantar_noite: false,
    },
  },
  mealLogs: [
    {
      id: 'demo_1',
      meal: 'Café da manhã',
      time: '08:00',
      food: 'Ovos mexidos com azeite + mamão e café preto',
      reaction: 'Digestão leve, me senti energizado e sem estufamento.',
      triggers: []
    }
  ],
  finalCheckIn: {
    currentBloatingLevel: 3,
    initialEnergyLevel: 5,
    currentEnergyLevel: 8,
    sleepQuality: 'melhor',
    digestionQuality: 'melhor',
    whatWorked: '',
    whatDidntWork: '',
    habitToKeep: '',
    bodyMeasurements: {
      weight: '',
      waist: '',
      abdomen: '',
    },
    signature: '',
    signatureDate: new Date().toISOString().split('T')[0],
    completedGraduationChecklist: [],
  }
};

interface ChallengeContextType {
  state: UserProgressState;
  acceptDisclaimer: () => void;
  setActiveDay: (day: number) => void;
  toggleChecklistItem: (dayNumber: number, itemId: string) => void;
  updateDayRating: (dayNumber: number, rating: number) => void;
  updateDaySecondaryRating: (dayNumber: number, rating: number) => void;
  updateDayNotes: (dayNumber: number, notes: string) => void;
  updateInitialCheckIn: (data: Partial<UserProgressState['initialCheckIn']>) => void;
  updateFinalCheckIn: (data: Partial<UserProgressState['finalCheckIn']>) => void;
  toggleGraduationItem: (index: number) => void;
  addWaterGlass: () => void;
  removeWaterGlass: () => void;
  setWaterTarget: (target: number) => void;
  toggleWaterTimeline: (key: string) => void;
  addMealLog: (meal: Omit<MealLogItem, 'id'>) => void;
  removeMealLog: (id: string) => void;
  resetAllProgress: () => void;
  overallProgressPercentage: number;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultInitialState,
          ...parsed,
          days: { ...defaultInitialState.days, ...(parsed.days || {}) },
          waterLog: { ...defaultInitialState.waterLog, ...(parsed.waterLog || {}) },
          finalCheckIn: { ...defaultInitialState.finalCheckIn, ...(parsed.finalCheckIn || {}) },
          initialCheckIn: { ...defaultInitialState.initialCheckIn, ...(parsed.initialCheckIn || {}) }
        };
      }
    } catch {
      // fallback
    }
    return defaultInitialState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  }, [state]);

  const acceptDisclaimer = () => {
    setState(prev => ({
      ...prev,
      disclaimerAccepted: true,
      disclaimerAcceptedAt: new Date().toISOString(),
    }));
  };

  const setActiveDay = (day: number) => {
    if (day >= 1 && day <= 7) {
      setState(prev => ({ ...prev, currentActiveDay: day }));
    }
  };

  const toggleChecklistItem = (dayNumber: number, itemId: string) => {
    setState(prev => {
      const currentDay = prev.days[dayNumber] || { completedChecklist: [], rating: 5, notes: '' };
      const exists = currentDay.completedChecklist.includes(itemId);
      const updatedList = exists
        ? currentDay.completedChecklist.filter(id => id !== itemId)
        : [...currentDay.completedChecklist, itemId];

      return {
        ...prev,
        days: {
          ...prev.days,
          [dayNumber]: {
            ...currentDay,
            completedChecklist: updatedList,
          },
        },
      };
    });
  };

  const updateDayRating = (dayNumber: number, rating: number) => {
    setState(prev => {
      const currentDay = prev.days[dayNumber] || { completedChecklist: [], rating: 5, notes: '' };
      return {
        ...prev,
        days: {
          ...prev.days,
          [dayNumber]: {
            ...currentDay,
            rating,
          },
        },
      };
    });
  };

  const updateDaySecondaryRating = (dayNumber: number, rating: number) => {
    setState(prev => {
      const currentDay = prev.days[dayNumber] || { completedChecklist: [], rating: 5, notes: '' };
      return {
        ...prev,
        days: {
          ...prev.days,
          [dayNumber]: {
            ...currentDay,
            secondaryRating: rating,
          },
        },
      };
    });
  };

  const updateDayNotes = (dayNumber: number, notes: string) => {
    setState(prev => {
      const currentDay = prev.days[dayNumber] || { completedChecklist: [], rating: 5, notes: '' };
      return {
        ...prev,
        days: {
          ...prev.days,
          [dayNumber]: {
            ...currentDay,
            notes,
          },
        },
      };
    });
  };

  const updateInitialCheckIn = (data: Partial<UserProgressState['initialCheckIn']>) => {
    setState(prev => ({
      ...prev,
      initialCheckIn: {
        ...prev.initialCheckIn,
        ...data,
      },
    }));
  };

  const updateFinalCheckIn = (data: Partial<UserProgressState['finalCheckIn']>) => {
    setState(prev => ({
      ...prev,
      finalCheckIn: {
        ...prev.finalCheckIn,
        ...data,
      },
    }));
  };

  const toggleGraduationItem = (index: number) => {
    const key = `grad_${index}`;
    setState(prev => {
      const current = prev.finalCheckIn.completedGraduationChecklist || [];
      const exists = current.includes(key);
      const next = exists ? current.filter(k => k !== key) : [...current, key];
      return {
        ...prev,
        finalCheckIn: {
          ...prev.finalCheckIn,
          completedGraduationChecklist: next,
        },
      };
    });
  };

  const addWaterGlass = () => {
    setState(prev => ({
      ...prev,
      waterLog: {
        ...prev.waterLog,
        glassesConsumed: Math.min(prev.waterLog.glassesConsumed + 1, 16),
      },
    }));
  };

  const removeWaterGlass = () => {
    setState(prev => ({
      ...prev,
      waterLog: {
        ...prev.waterLog,
        glassesConsumed: Math.max(prev.waterLog.glassesConsumed - 1, 0),
      },
    }));
  };

  const setWaterTarget = (target: number) => {
    setState(prev => ({
      ...prev,
      waterLog: {
        ...prev.waterLog,
        targetGlasses: Math.max(target, 4),
      },
    }));
  };

  const toggleWaterTimeline = (key: string) => {
    setState(prev => ({
      ...prev,
      waterLog: {
        ...prev.waterLog,
        timeline: {
          ...prev.waterLog.timeline,
          [key]: !prev.waterLog.timeline[key],
        },
      },
    }));
  };

  const addMealLog = (meal: Omit<MealLogItem, 'id'>) => {
    const newItem: MealLogItem = {
      ...meal,
      id: 'meal_' + Date.now(),
    };
    setState(prev => ({
      ...prev,
      mealLogs: [newItem, ...prev.mealLogs],
    }));
  };

  const removeMealLog = (id: string) => {
    setState(prev => ({
      ...prev,
      mealLogs: prev.mealLogs.filter(m => m.id !== id),
    }));
  };

  const resetAllProgress = () => {
    setState({
      ...defaultInitialState,
      disclaimerAccepted: true, // Keep disclaimer accepted so user doesn't have to re-read unless they wish
      disclaimerAcceptedAt: new Date().toISOString(),
    });
  };

  // Calculate total items completed across all 7 days
  const totalTasksCount = DAYS_DATA.reduce((acc, day) => acc + day.checklist.length, 0);
  const completedTasksCount = Object.values(state.days).reduce(
    (acc, day) => acc + (day?.completedChecklist?.length || 0),
    0
  );
  const overallProgressPercentage = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <ChallengeContext.Provider
      value={{
        state,
        acceptDisclaimer,
        setActiveDay,
        toggleChecklistItem,
        updateDayRating,
        updateDaySecondaryRating,
        updateDayNotes,
        updateInitialCheckIn,
        updateFinalCheckIn,
        toggleGraduationItem,
        addWaterGlass,
        removeWaterGlass,
        setWaterTarget,
        toggleWaterTimeline,
        addMealLog,
        removeMealLog,
        resetAllProgress,
        overallProgressPercentage,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};
