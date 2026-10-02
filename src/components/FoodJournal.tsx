import React, { useState } from 'react';
import { Plus, Trash2, Utensils, AlertCircle } from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';

const COMMON_TRIGGERS = [
  'Comi muito rápido',
  'Falei enquanto mastigava',
  'Usei canudo',
  'Bebi gaseificado/refri',
  'Comi porção muito grande',
  'Muitas horas de jejum antes',
  'Alimento muito gorduroso',
  'Excesso de sódio/molhos'
];

export const FoodJournal: React.FC = () => {
  const { state, addMealLog, removeMealLog } = useChallenge();
  const [mealType, setMealType] = useState('Almoço');
  const [time, setTime] = useState('12:30');
  const [foodText, setFoodText] = useState('');
  const [reactionText, setReactionText] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodText.trim()) return;

    addMealLog({
      meal: mealType,
      time,
      food: foodText.trim(),
      reaction: reactionText.trim() || 'Digestão normal sem desconforto anotado.',
      triggers: selectedTriggers,
    });

    setFoodText('');
    setReactionText('');
    setSelectedTriggers([]);
    setIsFormOpen(false);
  };

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-700">
            Dia 3 · Rastreio de Sensibilidade
          </span>
          <h4 className="text-base font-bold text-stone-900">
            Diário Alimentar & Resposta Corporal
          </h4>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="text-xs font-semibold text-teal-800 bg-teal-100 hover:bg-teal-200 py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isFormOpen ? 'Fechar' : 'Nova Refeição'}</span>
        </button>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed">
        Não retire alimentos saudáveis por medo. O objetivo é apenas observar a relação entre o que comeu, a velocidade da refeição e a resposta do seu estômago.
      </p>

      {/* Add Form */}
      {isFormOpen && (
        <form onSubmit={handleSave} className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                Refeição
              </label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 text-stone-800"
              >
                <option value="Café da manhã">Café da manhã</option>
                <option value="Almoço">Almoço</option>
                <option value="Lanche">Lanche</option>
                <option value="Jantar">Jantar</option>
                <option value="Ceia">Ceia / Extra</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                Horário
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 text-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
              O que você comeu e bebeu?
            </label>
            <input
              type="text"
              placeholder="Ex: Arroz, feijão, frango grelhado, cenoura no vapor, copo de água"
              value={foodText}
              onChange={e => setFoodText(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-800 focus:outline-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
              Como se sentiu depois?
            </label>
            <input
              type="text"
              placeholder="Ex: Leve e saciado, sem estufamento / Senti um pouco de gases"
              value={reactionText}
              onChange={e => setReactionText(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-800 focus:outline-teal-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1.5">
              Notou algum comportamento comum de inchaço?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TRIGGERS.map(trigger => {
                const isSelected = selectedTriggers.includes(trigger);
                return (
                  <button
                    type="button"
                    key={trigger}
                    onClick={() => toggleTrigger(trigger)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {trigger}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-teal-800 text-white rounded-lg hover:bg-teal-900"
            >
              Salvar Registro
            </button>
          </div>
        </form>
      )}

      {/* Meal Logs List */}
      <div className="space-y-2">
        {state.mealLogs.length === 0 ? (
          <div className="p-4 bg-white rounded-xl text-center text-xs text-stone-400 border border-dashed border-stone-200">
            Nenhuma refeição registrada ainda. Clique em "Nova Refeição" para anotar seu prato de hoje.
          </div>
        ) : (
          state.mealLogs.map(log => (
            <div key={log.id} className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-600">
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">{log.meal}</span>
                  <span className="text-[11px] text-stone-400 font-mono">({log.time})</span>
                </div>
                <button
                  onClick={() => removeMealLog(log.id)}
                  className="text-stone-400 hover:text-rose-600 p-1 rounded transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-stone-800 font-medium pl-8">
                {log.food}
              </div>

              {log.reaction && (
                <div className="text-[11px] text-stone-500 pl-8 italic">
                  Sensação: {log.reaction}
                </div>
              )}

              {log.triggers && log.triggers.length > 0 && (
                <div className="flex flex-wrap gap-1 pl-8 pt-1">
                  {log.triggers.map((trig, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded"
                    >
                      {trig}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex items-start gap-2 p-2.5 bg-teal-50/70 rounded-xl border border-teal-200/60 text-xs text-teal-900">
        <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <span>
          <strong>Dica do Método C.A.S.A.:</strong> Experimente mastigar 20 a 30 vezes cada garfada e descansar os talheres na mesa. Menos ar engolido significa menos pressão no abdômen.
        </span>
      </div>
    </div>
  );
};
