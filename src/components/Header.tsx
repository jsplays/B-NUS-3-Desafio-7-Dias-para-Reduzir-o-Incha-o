import React from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { useChallenge } from '../context/ChallengeContext';

interface HeaderProps {
  onOpenSafetyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSafetyModal }) => {
  const { state } = useChallenge();

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-white border-b border-stone-800 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight font-display text-white">
              Menos Inchaço
            </h1>
            <p className="text-[10px] text-stone-400 font-medium tracking-wide">
              Protocolo Verão 42 · Método C.A.S.A.
            </p>
          </div>
        </div>

        {/* Zone 3: Safety and Information action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSafetyModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 text-xs font-medium transition-colors"
            title="Aviso de Saúde e Diretrizes"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">Aviso</span>
          </button>
        </div>
      </div>
    </header>
  );
};
