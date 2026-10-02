import React, { useState } from 'react';
import { Droplets, Activity, Wind, UtensilsCrossed } from 'lucide-react';
import { WaterTracker } from './WaterTracker';
import { FoodJournal } from './FoodJournal';
import { MorningMovementTimer } from './MorningMovementTimer';
import { InteractiveBreathingTimer } from './InteractiveBreathingTimer';

export const RoutinesView: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<'water' | 'massage' | 'movement' | 'journal'>('water');

  const routines = [
    { id: 'water' as const, label: 'Água Fracionada', icon: Droplets },
    { id: 'massage' as const, label: 'Massagem 3 Min', icon: Wind },
    { id: 'movement' as const, label: 'Movimento 5 Min', icon: Activity },
    { id: 'journal' as const, label: 'Diário Digestivo', icon: UtensilsCrossed },
  ];

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 text-white rounded-3xl p-6 shadow-md">
        <span className="text-xs uppercase tracking-wider font-semibold text-teal-300">
          Ferramentas Práticas
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
          Rotinas & Hábitos do Dia
        </h2>
        <p className="text-teal-100 text-xs sm:text-sm mt-1 leading-relaxed">
          Acesse diretamente os cronômetros guiados, o controle de hidratação e o diário de sensibilidade alimentar.
        </p>
      </div>

      {/* Routine Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {routines.map(r => {
          const Icon = r.icon;
          const isSelected = activeRoutine === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRoutine(r.id)}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all min-h-[72px] ${
                isSelected
                  ? 'bg-teal-800 text-white border-teal-900 shadow-sm shadow-teal-950/20'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-teal-200' : 'text-stone-500'}`} />
              <span className="text-xs font-bold leading-tight">
                {r.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Component */}
      <div className="pt-1">
        {activeRoutine === 'water' && <WaterTracker />}
        {activeRoutine === 'massage' && <InteractiveBreathingTimer />}
        {activeRoutine === 'movement' && <MorningMovementTimer />}
        {activeRoutine === 'journal' && <FoodJournal />}
      </div>
    </div>
  );
};
