import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  TrendingDown, 
  Sparkles, 
  Award, 
  Calendar, 
  PenTool, 
  RotateCcw, 
  ShieldCheck, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';
import { GRADUATION_CHECKLIST_ITEMS, CONTINUOUS_HABITS } from '../data/challengeData';

export const ProgressView: React.FC = () => {
  const { 
    state, 
    updateInitialCheckIn, 
    updateFinalCheckIn, 
    toggleGraduationItem, 
    resetAllProgress,
    overallProgressPercentage 
  } = useChallenge();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'comparativo' | 'formatura' | 'inicial'>('comparativo');

  const { initialCheckIn, finalCheckIn } = state;
  const completedGraduation = finalCheckIn.completedGraduationChecklist || [];
  const graduationCount = completedGraduation.length;
  const isFullyGraduated = graduationCount >= 7;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleSign = (val: string) => {
    updateFinalCheckIn({ signature: val });
    if (val.trim().length > 2 && graduationCount >= 7) {
      triggerCelebration();
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Overview Stat Card */}
      <div className="bg-gradient-to-br from-teal-900 to-stone-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal-300">
            Acompanhamento Evolutivo
          </span>
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full font-mono">
            {overallProgressPercentage}% Concluído
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
          Balanço & Autocuidado
        </h2>

        <p className="text-teal-100 text-xs sm:text-sm mt-1 leading-relaxed">
          O foco é criar consistência e reconectar você com os sinais do seu organismo, sem pressão de balança.
        </p>

        {/* Overall progress bar */}
        <div className="mt-4 w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallProgressPercentage}%` }}
          />
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
        <button
          onClick={() => setActiveTab('comparativo')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'comparativo'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Antes & Depois
        </button>
        <button
          onClick={() => setActiveTab('formatura')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'formatura'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Checklist Final & Hábitos
        </button>
        <button
          onClick={() => setActiveTab('inicial')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'inicial'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Registro Inicial
        </button>
      </div>

      {/* TAB 1: COMPARATIVO */}
      {activeTab === 'comparativo' && (
        <div className="space-y-5">
          {/* Bloating Comparison Card */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-teal-700" />
              <h3 className="text-base font-bold text-stone-900">
                Sensação de Inchaço (0 a 10)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
                <span className="text-[11px] font-semibold text-stone-400 uppercase block">
                  No Início (Dia 1)
                </span>
                <span className="text-2xl font-black font-mono text-stone-700">
                  {initialCheckIn.initialBloatingLevel} / 10
                </span>
              </div>

              <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-center">
                <span className="text-[11px] font-semibold text-teal-700 uppercase block">
                  Agora (Dia 7)
                </span>
                <span className="text-2xl font-black font-mono text-teal-900">
                  {finalCheckIn.currentBloatingLevel} / 10
                </span>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-xs text-stone-600 block">
                Ajustar nível de inchaço percebido hoje:
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={finalCheckIn.currentBloatingLevel}
                onChange={(e) => updateFinalCheckIn({ currentBloatingLevel: parseInt(e.target.value, 10) })}
                className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Energy Comparison Card */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-stone-900">
                Nível de Disposição & Energia
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
                <span className="text-[11px] font-semibold text-stone-400 uppercase block">
                  Disposição Inicial
                </span>
                <span className="text-2xl font-black font-mono text-stone-700">
                  {finalCheckIn.initialEnergyLevel} / 10
                </span>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <span className="text-[11px] font-semibold text-amber-800 uppercase block">
                  Disposição Atual
                </span>
                <span className="text-2xl font-black font-mono text-amber-950">
                  {finalCheckIn.currentEnergyLevel} / 10
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-600 block">
                Ajustar sua energia agora:
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={finalCheckIn.currentEnergyLevel}
                onChange={(e) => updateFinalCheckIn({ currentEnergyLevel: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Sleep and Digestion Quality */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Qualidade do Sono & Digestão
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Meu sono ao longo da semana foi:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['pior', 'igual', 'melhor'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateFinalCheckIn({ sleepQuality: opt })}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                        finalCheckIn.sleepQuality === opt
                          ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Minha digestão ao longo da semana foi:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['pior', 'igual', 'melhor'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateFinalCheckIn({ digestionQuality: opt })}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                        finalCheckIn.digestionQuality === opt
                          ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative Reflections */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Reflexões Pessoais dos 7 Dias
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  O que mais funcionou para o meu corpo:
                </label>
                <textarea
                  rows={2}
                  value={finalCheckIn.whatWorked}
                  onChange={(e) => updateFinalCheckIn({ whatWorked: e.target.value })}
                  placeholder="Ex: Beber água fracionada ao longo do dia e mastigar com mais calma..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  O que não funcionou ou preciso ajustar com tranquilidade:
                </label>
                <textarea
                  rows={2}
                  value={finalCheckIn.whatDidntWork}
                  onChange={(e) => updateFinalCheckIn({ whatDidntWork: e.target.value })}
                  placeholder="Ex: Ainda como rápido quando estou com pressa no trabalho..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Qual hábito principal vou levar para a próxima semana?
                </label>
                <input
                  type="text"
                  value={finalCheckIn.habitToKeep}
                  onChange={(e) => updateFinalCheckIn({ habitToKeep: e.target.value })}
                  placeholder="Ex: Cortar refrigerantes e caldos em cubo, manter a garrafa de água na mesa"
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FORMATURA & HÁBITOS CONTÍNUOS */}
      {activeTab === 'formatura' && (
        <div className="space-y-5">
          {/* Graduation Badge Card */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">
                Checklist Final do Desafio
              </h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto mt-1">
                Marque cada uma das conquistas e aprendizados consolidados durante esta semana de cuidado.
              </p>
            </div>
            <div className="inline-block px-3 py-1 bg-white/80 border border-emerald-300 rounded-full text-xs font-bold text-emerald-900">
              {graduationCount} de {GRADUATION_CHECKLIST_ITEMS.length} consolidados
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2">
            {GRADUATION_CHECKLIST_ITEMS.map((label, index) => {
              const isChecked = completedGraduation.includes(`grad_${index}`);
              return (
                <button
                  key={index}
                  onClick={() => toggleGraduationItem(index)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all min-h-[46px] ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? 'bg-emerald-700 text-white' : 'border border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* 5 Continuous Habits */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-2">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Protocolo Verão 42
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-0.5">
                5 Hábitos para Manter na Próxima Semana
              </h3>
            </div>

            <div className="space-y-3">
              {CONTINUOUS_HABITS.map((hab) => (
                <div key={hab.num} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {hab.num}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                      {hab.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {hab.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment Card & Digital Signature */}
          <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-5 border border-amber-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-900">
              <Heart className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-bold">
                Minha Promessa para a Próxima Semana
              </h3>
            </div>

            <blockquote className="p-3.5 bg-white/80 rounded-xl border border-amber-200 text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed shadow-xs">
              “Eu não preciso punir meu corpo para cuidar dele. Vou escolher hábitos possíveis, observar meus sinais e buscar ajuda quando necessário.”
            </blockquote>

            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-stone-700 block flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-stone-500" />
                <span>Assine digitalmente seu compromisso com seu corpo:</span>
              </label>
              <input
                type="text"
                value={finalCheckIn.signature}
                onChange={(e) => handleSign(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-teal-600 font-serif"
              />
              <div className="flex justify-between items-center text-[11px] text-stone-500 pt-1">
                <span>Data de formalização:</span>
                <span className="font-mono font-medium">{finalCheckIn.signatureDate}</span>
              </div>
            </div>

            {finalCheckIn.signature.trim() && (
              <div className="p-3 bg-teal-800 text-white rounded-xl text-xs flex items-center justify-between">
                <span>Compromisso formalizado com sucesso! Parabéns!</span>
                <button
                  onClick={triggerCelebration}
                  className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold text-[11px] transition-colors"
                >
                  Comemorar 🎉
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: REGISTRO INICIAL */}
      {activeTab === 'inicial' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold text-stone-900">
              Registro do Dia 1 (Ponto de Partida)
            </h3>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Consulte e atualize os parâmetros registrados quando você iniciou o desafio.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Data de Início:
              </label>
              <input
                type="date"
                value={initialCheckIn.startDate}
                onChange={(e) => updateInitialCheckIn({ startDate: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Como estava me sentindo ao começar?
              </label>
              <textarea
                rows={2}
                value={initialCheckIn.howFeeling}
                onChange={(e) => updateInitialCheckIn({ howFeeling: e.target.value })}
                placeholder="Ex: Barriga estufada no final do dia, cansaço frequente, pouca ingestão de água..."
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                O que mais desejava melhorar nesta semana?
              </label>
              <input
                type="text"
                value={initialCheckIn.mainGoal}
                onChange={(e) => updateInitialCheckIn({ mainGoal: e.target.value })}
                placeholder="Ex: Ter digestão leve, acordar menos inchada, criar o hábito de beber água"
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800"
              />
            </div>

            <div className="pt-2 border-t border-stone-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-stone-700">
                  Nível inicial de inchaço:
                </span>
                <span className="font-bold font-mono text-teal-800">
                  {initialCheckIn.initialBloatingLevel} / 10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={initialCheckIn.initialBloatingLevel}
                onChange={(e) => updateInitialCheckIn({ initialBloatingLevel: parseInt(e.target.value, 10) })}
                className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Reset Challenge Option */}
      <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 text-center space-y-2">
        <span className="text-xs text-stone-500 block">
          Deseja refazer o Desafio de 7 Dias do início?
        </span>
        {showResetConfirm ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <p className="text-xs text-rose-800 font-medium">
              Tem certeza? Isso zerará os checklists e notas para você começar uma nova semana.
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 bg-white border border-stone-300 text-stone-700 text-xs rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 bg-rose-700 text-white text-xs font-semibold rounded-lg hover:bg-rose-800"
              >
                Sim, Reiniciar Desafio
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Progresso da Semana</span>
          </button>
        )}
      </div>
    </div>
  );
};
