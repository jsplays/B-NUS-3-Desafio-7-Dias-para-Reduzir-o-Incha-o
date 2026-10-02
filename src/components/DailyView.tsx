import React from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ChefHat, 
  Sparkles, 
  ArrowLeftRight, 
  Clock, 
  ListChecks, 
  Smile, 
  AlertCircle
} from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';
import { DAYS_DATA } from '../data/challengeData';
import { WaterTracker } from './WaterTracker';
import { FoodJournal } from './FoodJournal';
import { MorningMovementTimer } from './MorningMovementTimer';
import { InteractiveBreathingTimer } from './InteractiveBreathingTimer';

export const DailyView: React.FC = () => {
  const { 
    state, 
    setActiveDay, 
    toggleChecklistItem, 
    updateDayRating, 
    updateDaySecondaryRating, 
    updateDayNotes 
  } = useChallenge();

  const currentDayData = DAYS_DATA.find(d => d.dayNumber === state.currentActiveDay) || DAYS_DATA[0];
  const dayProgress = state.days[currentDayData.dayNumber] || {
    completedChecklist: [],
    rating: 5,
    notes: '',
  };

  const completedCount = dayProgress.completedChecklist.length;
  const totalChecklist = currentDayData.checklist.length;
  const isDayFinished = completedCount === totalChecklist && totalChecklist > 0;

  const handleNextDay = () => {
    if (state.currentActiveDay < 7) {
      setActiveDay(state.currentActiveDay + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevDay = () => {
    if (state.currentActiveDay > 1) {
      setActiveDay(state.currentActiveDay - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine label for the day's rating
  const getRatingLabel = () => {
    switch (currentDayData.dayNumber) {
      case 1:
        return 'Nível de Inchaço Hoje (0 = Nenhum inchaço, 10 = Muito inchado)';
      case 2:
        return 'Nível de Energia Hoje (0 = Esgotado, 10 = Máxima disposição)';
      case 3:
        return 'Nível de Desconforto Abdominal (0 = Conforto total, 10 = Desconforto intenso)';
      case 4:
        return 'Nível de Disposição Matinal (0 = Lento, 10 = Muito ativo)';
      case 5:
        return 'Desconforto após a Massagem e Respiração (0 = Total alívio, 10 = Desconforto)';
      case 6:
        return 'Saciedade Confortável após o Jantar (0 = Faminto, 10 = Perfeitamente saciado)';
      case 7:
        return 'Nível Final de Inchaço no 7º Dia (0 = Leveza total, 10 = Muito inchado)';
      default:
        return 'Como você avalia seu bem-estar hoje?';
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Day Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-teal-600/20 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between text-xs text-teal-200">
            <span className="font-semibold tracking-wider uppercase">
              Dia {currentDayData.dayNumber} de 7 · Protocolo Verão 42
            </span>
            <span className="font-medium bg-white/10 px-2.5 py-0.5 rounded-full">
              {completedCount} de {totalChecklist} tarefas
            </span>
          </div>

          <h2 className="text-2xl font-bold font-display text-white tracking-tight">
            {currentDayData.title}
          </h2>

          <p className="text-teal-100/90 text-sm leading-relaxed">
            {currentDayData.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-teal-200/80 italic">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>{currentDayData.tagline}</span>
          </div>
        </div>
      </div>

      {/* Objective Card */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
          <span className="w-2 h-2 rounded-full bg-teal-600" />
          <span>Objetivo do Dia</span>
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">
          {currentDayData.objective}
        </p>
      </div>

      {/* Main Task Card */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-4">
        <div className="border-b border-stone-100 pb-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Ação Prática
          </span>
          <h3 className="text-lg font-bold text-stone-900 mt-0.5">
            {currentDayData.taskTitle}
          </h3>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          {currentDayData.taskDescription}
        </p>

        {currentDayData.taskBullets && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60 space-y-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide block">
              Pontos de Atenção:
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              {currentDayData.taskBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Swaps Table if provided */}
        {currentDayData.swaps && currentDayData.swaps.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
              <ArrowLeftRight className="w-4 h-4 text-teal-700" />
              <span>Trocas Inteligentes para Reduzir Inchaço:</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {currentDayData.swaps.map((swap, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
                >
                  <div className="text-stone-500 line-through">
                    {swap.from}
                  </div>
                  <div className="text-teal-900 font-semibold flex items-center gap-1.5">
                    <span className="text-teal-600 font-bold hidden sm:inline">→</span>
                    <span>{swap.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Primary Interactive Tool for this day */}
      {currentDayData.primaryToolType === 'water' && <WaterTracker />}
      {currentDayData.primaryToolType === 'food_journal' && <FoodJournal />}
      {currentDayData.primaryToolType === 'morning_movement' && (
        <MorningMovementTimer
          onComplete={() => {
            // Auto check off the movement item
            const item = currentDayData.checklist.find(c => c.id === 'd4_c2');
            if (item && !dayProgress.completedChecklist.includes(item.id)) {
              toggleChecklistItem(4, item.id);
            }
          }}
        />
      )}
      {currentDayData.primaryToolType === 'massage_timer' && (
        <InteractiveBreathingTimer
          onComplete={() => {
            const item = currentDayData.checklist.find(c => c.id === 'd5_c2');
            if (item && !dayProgress.completedChecklist.includes(item.id)) {
              toggleChecklistItem(5, item.id);
            }
          }}
        />
      )}

      {/* Recipe Card (if present) */}
      {currentDayData.recipe && (
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm space-y-0">
          {currentDayData.recipe.imagePath && (
            <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
              <img
                src={currentDayData.recipe.imagePath}
                alt={currentDayData.recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
                  Receita do Dia
                </span>
                <h3 className="text-base font-bold text-white drop-shadow-sm">
                  {currentDayData.recipe.title}
                </h3>
              </div>
            </div>
          )}

          <div className="p-5 space-y-4">
            {!currentDayData.recipe.imagePath && (
              <div className="flex items-center gap-2 text-teal-800">
                <ChefHat className="w-5 h-5" />
                <h3 className="text-base font-bold text-stone-900">
                  {currentDayData.recipe.title}
                </h3>
              </div>
            )}

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {currentDayData.recipe.description}
            </p>

            {/* Ingredients */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Ingredientes:
              </span>
              <ul className="space-y-1 text-xs sm:text-sm text-stone-700 pl-2">
                {currentDayData.recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Modo de Preparo:
              </span>
              <ol className="space-y-1.5 text-xs sm:text-sm text-stone-700 pl-1">
                {currentDayData.recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-snug pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {currentDayData.recipe.tips && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                <strong>Dica de Sensibilidade:</strong> {currentDayData.recipe.tips}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Daily Checklist */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold text-stone-900">
              Checklist do Dia {currentDayData.dayNumber}
            </h3>
          </div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full">
            {completedCount}/{totalChecklist} concluídos
          </span>
        </div>

        <div className="space-y-2">
          {currentDayData.checklist.map((item) => {
            const isChecked = dayProgress.completedChecklist.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(currentDayData.dayNumber, item.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all min-h-[48px] ${
                  isChecked
                    ? 'bg-teal-50/70 border-teal-300 text-teal-950 font-medium'
                    : 'bg-stone-50 border-stone-200/80 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-teal-700 text-white' : 'border border-stone-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className={isChecked ? 'line-through text-stone-500' : ''}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {isDayFinished && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Excelente! Você concluiu todas as tarefas propostas para o Dia {currentDayData.dayNumber}.</span>
          </div>
        )}
      </div>

      {/* Daily Rating & Observations */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-teal-700" />
          <h3 className="text-base font-bold text-stone-900">
            Registro & Percepção Corporal
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-stone-700">
              {getRatingLabel()}
            </label>
            <span className="font-bold text-sm text-teal-800 font-mono">
              {dayProgress.rating} / 10
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={dayProgress.rating}
            onChange={(e) => updateDayRating(currentDayData.dayNumber, parseInt(e.target.value, 10))}
            className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>0 (Mínimo)</span>
            <span>5 (Moderado)</span>
            <span>10 (Máximo)</span>
          </div>
        </div>

        {/* Optional Secondary Rating for Day 2 (Hydration feeling) */}
        {currentDayData.dayNumber === 2 && (
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="text-xs font-semibold text-stone-700 block">
              Como avaliou sua hidratação hoje?
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { val: 1, label: 'Baixa' },
                { val: 2, label: 'Adequada' },
                { val: 3, label: 'Maior que o necessário' }
              ].map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateDaySecondaryRating(2, opt.val)}
                  className={`p-2 rounded-xl border text-center transition-colors ${
                    dayProgress.secondaryRating === opt.val
                      ? 'bg-teal-700 text-white border-teal-800 font-semibold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <label className="text-xs font-semibold text-stone-700 block">
            O que você percebeu no seu corpo hoje?
          </label>
          <textarea
            rows={3}
            value={dayProgress.notes}
            onChange={(e) => updateDayNotes(currentDayData.dayNumber, e.target.value)}
            placeholder="Ex: Menos sensação de estufamento após o almoço, água aromatizada ajudou a beber mais líquidos..."
            className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-teal-600 focus:bg-white transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Navigation Buttons (Prev / Next) */}
      <div className="flex items-center gap-3 pt-2">
        {state.currentActiveDay > 1 && (
          <button
            onClick={handlePrevDay}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-300 bg-white text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-stone-50 active:scale-[0.98] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dia {state.currentActiveDay - 1}</span>
          </button>
        )}

        {state.currentActiveDay < 7 ? (
          <button
            onClick={handleNextDay}
            className="flex-1 py-3 px-4 rounded-xl bg-teal-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-teal-900 active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Ir para o Dia {state.currentActiveDay + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex-1 text-center py-2 text-xs font-bold text-teal-800">
            Você está no último dia! Veja a aba Progresso para a conclusão e balanço final.
          </div>
        )}
      </div>
    </div>
  );
};
