import React from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  HeartHandshake, 
  FileText 
} from 'lucide-react';
import { EMERGENCY_WARNINGS } from '../data/challengeData';

export const GuideView: React.FC<{ onOpenSafetyModal: () => void }> = ({ onOpenSafetyModal }) => {
  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">
            Fundamentos & Segurança
          </span>
          <h2 className="text-2xl font-bold font-display text-white">
            Guia do Método C.A.S.A.
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Entenda como seu corpo regula líquidos, por que o inchaço acontece e como cuidar da sua saúde sem extremismos.
          </p>
        </div>
      </div>

      {/* Official Disclaimer Banner with Trigger Button */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Diretrizes Oficiais de Saúde & Aviso Legal</span>
        </div>
        <p className="text-xs text-amber-950 leading-relaxed">
          Este material tem finalidade exclusivamente educativa e não substitui consulta ou tratamento médico/nutricional individualizado.
        </p>
        <button
          onClick={onOpenSafetyModal}
          className="w-full py-2.5 px-4 bg-amber-800 text-white text-xs font-semibold rounded-xl hover:bg-amber-900 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Ver Termos & Aviso Médico Completo</span>
        </button>
      </div>

      {/* O que é o Método C.A.S.A. */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="border-b border-stone-100 pb-2">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Protocolo Verão 42
          </span>
          <h3 className="text-lg font-bold text-stone-900 mt-0.5">
            Os 4 Pilares do Método C.A.S.A.
          </h3>
        </div>

        <div className="space-y-3">
          {[
            {
              letter: 'C',
              title: 'Consciência & Ritmo',
              desc: 'Comer devagar, mastigar sem pressa e reconhecer quando o estômago está satisfeito, diminuindo a ingestão de ar.'
            },
            {
              letter: 'A',
              title: 'Alimentação Limpa & Pouco Sódio',
              desc: 'Priorizar comida de verdade feita em casa, reduzindo embutidos, temperos em pó prontos e ultraprocessados.'
            },
            {
              letter: 'S',
              title: 'Sono & Descanso Reparador',
              desc: 'Jantar com leveza 2h antes de dormir para permitir que o sistema digestivo repouse sem refluxo ou sensação de peso.'
            },
            {
              letter: 'A',
              title: 'Água Fracionada ao Longo do Dia',
              desc: 'Goles regulares mantêm a função renal ativa e reduzem a retenção compensatória sem sobrecarregar o organismo.'
            }
          ].map(item => (
            <div key={item.letter} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                {item.letter}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Não é uma limpeza mágica */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-teal-700" />
          <h3>Por que seu corpo não precisa de "Detox"</h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Seu corpo já possui órgãos especializados de altíssima eficiência para filtrar substâncias e manter o equilíbrio de fluidos: rins, fígado, pulmões, intestino e pele.
        </p>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          O inchaço passageiro quase sempre resulta de excesso transitório de sódio, digestão desacelerada por alimentos ultraprocessados, aerofagia (engolir ar ao comer correndo) ou constipação. Ajustar esses hábitos resolve o problema na raiz sem a necessidade de chás laxativos ou dietas líquidas perigosas.
        </p>
      </div>

      {/* Red Flags / Emergency Warnings */}
      <div className="bg-rose-50/80 rounded-2xl p-5 border border-rose-200/80 space-y-3">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-rose-700" />
          <h3>Quando Buscar Atendimento Médico Imediato</h3>
        </div>
        <p className="text-xs text-rose-950">
          O inchaço persistente ou acompanhado dos sinais abaixo exige investigação médica urgente:
        </p>
        <ul className="grid grid-cols-1 gap-1.5 text-xs text-rose-900 pl-1">
          {EMERGENCY_WARNINGS.map((warn, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              <span>{warn}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Closing Card */}
      <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 text-center space-y-2">
        <HeartHandshake className="w-8 h-8 text-teal-800 mx-auto" />
        <h4 className="text-sm font-bold text-teal-950 font-display">
          Protocolo Verão 42
        </h4>
        <p className="text-xs text-teal-900 max-w-sm mx-auto">
          Um passo de cada vez. Um dia de cada vez. Seu corpo não precisa de agressões; ele precisa de respeito e regularidade.
        </p>
      </div>
    </div>
  );
};
