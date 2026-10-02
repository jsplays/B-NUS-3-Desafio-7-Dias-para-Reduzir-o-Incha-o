import React from 'react';
import { Check } from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';
import { DAYS_DATA } from '../data/challengeData';

export const DaySelector: React.FC = () => {
  const { state, setActiveDay } = useChallenge();

  return (
    <div className="w-full bg-stone-100/90 border-b border-stone-200/80 px-3 py-2.5 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {DAYS_DATA.map((day) => {
          const isActive = state.currentActiveDay === day.dayNumber;
          const dayProgress = state.days[day.dayNumber];
          const isComplete =
            dayProgress &&
            dayProgress.completedChecklist.length === day.checklist.length &&
            day.checklist.length > 0;

          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDay(day.dayNumber)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none min-h-[44px] ${
                isActive
                  ? 'bg-teal-800 text-white shadow-sm shadow-teal-900/10'
                  : isComplete
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-stone-700 border border-stone-200/90 hover:bg-stone-50'
              }`}
            >
              <span>Dia {day.dayNumber}</span>
              {isComplete && (
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white text-teal-900' : 'bg-emerald-600 text-white'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
