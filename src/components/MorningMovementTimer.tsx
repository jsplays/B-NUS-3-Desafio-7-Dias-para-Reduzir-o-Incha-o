import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Footprints, Activity, Compass, ArrowUpCircle } from 'lucide-react';

interface RoutineStep {
  name: string;
  duration: number; // in seconds
  description: string;
  icon: React.ElementType;
}

const STEPS: RoutineStep[] = [
  {
    name: "Caminhada Leve pelo Ambiente",
    duration: 60,
    description: "Caminhe descalço ou com calçado confortável, soltando os braços e despertando o corpo.",
    icon: Footprints
  },
  {
    name: "Círculos com os Ombros",
    duration: 30,
    description: "Faça movimentos circulares suaves para trás e para frente, destravando o pescoço.",
    icon: Activity
  },
  {
    name: "Rotação dos Tornozelos",
    duration: 60,
    description: "Gire suavemente os pés em círculos (30 segundos pé direito, 30 segundos pé esquerdo).",
    icon: Compass
  },
  {
    name: "Alongamento Superior",
    duration: 30,
    description: "Eleve os braços acima da cabeça, estique a coluna e respire profundamente sem prender o ar.",
    icon: ArrowUpCircle
  },
  {
    name: "Movimento Livre e Caminhada",
    duration: 120,
    description: "Mantenha o corpo em movimento suave, oxigenando os pulmões e ativando a digestão.",
    icon: Footprints
  }
];

export const MorningMovementTimer: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepSecondsLeft, setStepSecondsLeft] = useState(STEPS[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = STEPS.reduce((a, b) => a + b.duration, 0); // 300 seconds (5 min)
  
  // Calculate total seconds elapsed
  const elapsedBeforeCurrent = STEPS.slice(0, currentStepIndex).reduce((a, b) => a + b.duration, 0);
  const totalElapsed = elapsedBeforeCurrent + (STEPS[currentStepIndex].duration - stepSecondsLeft);

  const currentStep = STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // Audio not permitted
    }
  };

  useEffect(() => {
    if (isRunning && !isFinished) {
      timerRef.current = setInterval(() => {
        setStepSecondsLeft(prev => {
          if (prev <= 1) {
            playBeep();
            if (currentStepIndex < STEPS.length - 1) {
              const nextIndex = currentStepIndex + 1;
              setCurrentStepIndex(nextIndex);
              return STEPS[nextIndex].duration;
            } else {
              setIsRunning(false);
              setIsFinished(true);
              if (onComplete) onComplete();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isFinished, currentStepIndex, onComplete]);

  const handleTogglePlay = () => {
    if (isFinished) {
      setCurrentStepIndex(0);
      setStepSecondsLeft(STEPS[0].duration);
      setIsFinished(false);
      setIsRunning(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setCurrentStepIndex(0);
    setStepSecondsLeft(STEPS[0].duration);
  };

  const formatMinSec = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-700">
            Despertar Ativo · 5 Minutos
          </span>
          <h4 className="text-base font-bold text-stone-900">
            Movimento Matinal sem Impacto
          </h4>
        </div>
        <div className="px-3 py-1 bg-stone-200/70 rounded-full font-mono font-semibold text-stone-800 text-sm tabular-nums">
          {formatMinSec(totalDuration - totalElapsed)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-teal-700 h-full transition-all duration-300 rounded-full"
          style={{ width: `${Math.min(100, (totalElapsed / totalDuration) * 100)}%` }}
        />
      </div>

      {/* Visual Step Display */}
      <div className="p-5 bg-white rounded-xl border border-stone-100 flex flex-col items-center text-center space-y-3 min-h-[190px] justify-center">
        {isFinished ? (
          <div className="space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Check className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-stone-900">
              Corpo Desperto e Ativado!
            </p>
            <p className="text-xs text-stone-500 max-w-xs">
              Você completou seus 5 minutos de ativação e circulação suave. Tome um copo de água fresca!
            </p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-200/70 flex items-center justify-center text-teal-800">
              <StepIcon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-medium text-stone-400">
                Passo {currentStepIndex + 1} de {STEPS.length}
              </span>
              <h5 className="text-base font-bold text-stone-900">
                {currentStep.name}
              </h5>
              <p className="text-xs text-stone-600 mt-1 max-w-xs">
                {currentStep.description}
              </p>
            </div>
            <div className="text-2xl font-black font-mono text-teal-800 tabular-nums">
              {formatMinSec(stepSecondsLeft)}
            </div>
          </>
        )}
      </div>

      {/* Step Indicator Bullets */}
      <div className="flex gap-1.5 justify-center">
        {STEPS.map((step, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              idx < currentStepIndex
                ? 'bg-teal-700'
                : idx === currentStepIndex
                ? 'bg-teal-400'
                : 'bg-stone-200'
            }`}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleTogglePlay}
          className="flex-1 py-3 px-4 rounded-xl bg-teal-800 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-teal-900 active:scale-[0.98] transition-all shadow-sm"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Pausar
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> {isFinished ? 'Reiniciar Rotina' : 'Começar 5 Minutos'}
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-3 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 active:scale-[0.98] transition-all"
          title="Reiniciar"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
