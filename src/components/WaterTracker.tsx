import React from 'react';
import { Droplets, Plus, Minus, Check, Info } from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';

export const WaterTracker: React.FC = () => {
  const { state, addWaterGlass, removeWaterGlass, toggleWaterTimeline } = useChallenge();
  const { glassesConsumed, targetGlasses, timeline } = state.waterLog;

  const totalVolumeMl = glassesConsumed * 250;
  const targetVolumeMl = targetGlasses * 250;
  const progressPercent = Math.min(100, Math.round((glassesConsumed / targetGlasses) * 100));

  const timelineSlots = [
    { key: 'ao_acordar', label: '1 copo ao acordar (despertar suave)' },
    { key: 'manha', label: '1 copo no meio da manhã (entre café e almoço)' },
    { key: 'almoco_tarde', label: '1 copo no meio da tarde (entre almoço e jantar)' },
    { key: 'tarde', label: 'Goles durante ou após movimento físico' },
    { key: 'jantar_noite', label: 'Goles pequenos à noite conforme sede' },
  ];

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-700">
            Hidratação Fracionada
          </span>
          <h4 className="text-base font-bold text-stone-900">
            Registro de Copos de Água
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-900 bg-teal-100/70 px-2.5 py-1 rounded-full">
          <Droplets className="w-3.5 h-3.5" />
          <span>{totalVolumeMl} ml / {targetVolumeMl} ml</span>
        </div>
      </div>

      {/* Main Glass Visual Count */}
      <div className="bg-white rounded-xl p-4 border border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-14 bg-teal-50 border-2 border-teal-500 rounded-b-xl rounded-t-sm flex items-end justify-center overflow-hidden">
            <div
              className="w-full bg-teal-500/80 transition-all duration-300"
              style={{ height: `${progressPercent}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-teal-900">
              {glassesConsumed}
            </span>
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900">
              {glassesConsumed} de {targetGlasses} copos (250 ml cada)
            </div>
            <div className="text-xs text-stone-500">
              {progressPercent}% da sua distribuição estimada
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={removeWaterGlass}
            disabled={glassesConsumed <= 0}
            className="w-10 h-10 rounded-xl border border-stone-300 bg-white text-stone-700 flex items-center justify-center hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            aria-label="Diminuir um copo"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={addWaterGlass}
            className="w-11 h-11 rounded-xl bg-teal-700 text-white flex items-center justify-center hover:bg-teal-800 shadow-sm active:scale-95 transition-all"
            aria-label="Adicionar um copo"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Timeline Checkpoints */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
          Momentos Recomendados de Ingestão:
        </div>
        <div className="space-y-1.5">
          {timelineSlots.map(slot => {
            const isChecked = !!timeline[slot.key];
            return (
              <button
                key={slot.key}
                onClick={() => toggleWaterTimeline(slot.key)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
                  isChecked
                    ? 'bg-teal-50/70 border-teal-300 text-teal-900 font-medium'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                    isChecked ? 'bg-teal-600 text-white' : 'border border-stone-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span>{slot.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urine Color Guide Card */}
      <div className="p-3 bg-stone-100/80 rounded-xl text-xs space-y-2 text-stone-600">
        <div className="flex items-center gap-1.5 font-semibold text-stone-800">
          <Info className="w-3.5 h-3.5 text-stone-500" />
          <span>Dica do Dia 2: Como avaliar sua hidratação</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Use a cor da urina e a sensação de sede sem obsessão. Urina amarelo-palha clara indica hidratação adequada. Urina escura e concentrada indica necessidade de beber água. Evite forçar litros de água de forma rápida para não causar mal-estar gástrico.
        </p>
      </div>
    </div>
  );
};
