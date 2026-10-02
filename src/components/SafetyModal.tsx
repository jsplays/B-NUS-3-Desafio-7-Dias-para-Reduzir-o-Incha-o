import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, HeartPulse, Stethoscope, X } from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';
import { EMERGENCY_WARNINGS } from '../data/challengeData';

interface SafetyModalProps {
  isOpen: boolean;
  onClose?: () => void;
  forceConfirmation?: boolean;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({
  isOpen,
  onClose,
  forceConfirmation = false
}) => {
  const { state, acceptDisclaimer } = useChallenge();
  const [understoodChecked, setUnderstoodChecked] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (understoodChecked || !forceConfirmation) {
      acceptDisclaimer();
      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg my-8 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-50/80 border-b border-amber-200/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
                Protocolo Verão 42
              </span>
              <h2 className="text-base font-bold text-stone-900">
                Aviso Importante & Diretrizes de Saúde
              </h2>
            </div>
          </div>
          {!forceConfirmation && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-stone-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-300/40 text-amber-950 font-medium">
            Por favor, leia atentamente estas instruções e confirme sua compreensão antes de utilizar o aplicativo.
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Finalidade Educativa e Condições Especiais
            </h3>
            <p>
              Este material tem finalidade educativa e <strong>não substitui consulta, diagnóstico ou tratamento realizado por médico, nutricionista, psicólogo ou outro profissional habilitado</strong>.
            </p>
            <p>
              As sugestões são gerais e podem não ser adequadas para todas as pessoas. <strong>Gestantes, lactantes, adolescentes, pessoas idosas, pessoas com diabetes, hipertensão, doenças renais, doenças gastrointestinais, transtornos alimentares, alergias ou outras condições de saúde devem buscar orientação individualizada</strong> antes de iniciar mudanças alimentares ou de atividade física.
            </p>
          </div>

          <div className="space-y-3 pt-1 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Individualidade e Não Obrigatoriedade de Metas
            </h3>
            <p>
              Não existe resultado igual para todas as pessoas. O objetivo deste programa é ajudar você a <strong>desenvolver hábitos mais consistentes, e não estabelecer uma meta obrigatória de peso</strong>. Variações diárias refletem água e digestão, não gordura.
            </p>
          </div>

          <div className="space-y-3 pt-1 border-t border-stone-100">
            <div className="flex items-center gap-2 text-rose-700 font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Quando interromper e buscar atendimento imediato:</span>
            </div>
            <p className="text-stone-700">
              Interrompa qualquer atividade e procure atendimento se sentir:
            </p>
            <ul className="grid grid-cols-1 gap-1.5 pl-2 text-xs text-rose-900 bg-rose-50/80 p-3 rounded-xl border border-rose-200/50">
              {EMERGENCY_WARNINGS.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold shrink-0">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-stone-500 italic">
              Sinta-se à vontade para ajustar o ritmo conforme necessário para sua segurança e bem-estar.
            </p>
          </div>

          {forceConfirmation && (
            <div className="pt-2">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={understoodChecked}
                  onChange={(e) => setUnderstoodChecked(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-stone-300"
                />
                <span className="text-xs sm:text-sm font-medium text-stone-800 leading-snug">
                  Li, compreendi e concordo com estas diretrizes de segurança e de saúde antes de prosseguir.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
          {forceConfirmation ? (
            <button
              onClick={handleConfirm}
              disabled={!understoodChecked}
              className={`w-full py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                understoodChecked
                  ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-md shadow-teal-900/10 active:scale-[0.98]'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirmar Compreensão e Começar Desafio
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 text-white font-medium text-sm hover:bg-stone-900 transition-colors"
            >
              Entendido e Ciente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
