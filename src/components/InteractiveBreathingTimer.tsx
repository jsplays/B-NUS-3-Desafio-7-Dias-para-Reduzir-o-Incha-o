import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';

interface InteractiveBreathingTimerProps {
  onComplete?: () => void;
}

export const InteractiveBreathingTimer: React.FC<InteractiveBreathingTimerProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes total
  const [phase, setPhase] = useState<'intro' | 'minute1' | 'minute2' | 'minute3' | 'completed'>('intro');
  const [breathState, setBreathState] = useState<'inspire' | 'expire'>('inspire');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play subtle sound click via Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setPhase('completed');
            playChime();
            if (onComplete) onComplete();
            return 0;
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
  }, [isRunning, secondsLeft, onComplete]);

  // Determine current phase based on remaining seconds
  useEffect(() => {
    if (secondsLeft > 120) {
      setPhase('minute1');
    } else if (secondsLeft > 60) {
      setPhase('minute2');
    } else if (secondsLeft > 0) {
      setPhase('minute3');
    }
  }, [secondsLeft]);

  // Minute 1: 4s inhale / 6s exhale cycle
  useEffect(() => {
    if (phase === 'minute1' && isRunning) {
      const cycleTime = (180 - secondsLeft) % 10;
      if (cycleTime < 4) {
        setBreathState('inspire');
      } else {
        setBreathState('expire');
      }
    }
  }, [secondsLeft, phase, isRunning]);

  const handleTogglePlay = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(180);
      setPhase('minute1');
      setIsRunning(true);
      return;
    }
    if (phase === 'intro') {
      setPhase('minute1');
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(180);
    setPhase('intro');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-700">
            Prática Guiada · 3 Minutos
          </span>
          <h4 className="text-base font-bold text-stone-900">
            Massagem Abdominal e Respiração
          </h4>
        </div>
        <div className="px-3 py-1 bg-stone-200/70 rounded-full font-mono font-semibold text-stone-800 text-sm tabular-nums">
          {formatTime(secondsLeft)}
        </div>
      </div>

      {/* Safety Alert Mini Note */}
      <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          Pressão sempre muito leve e confortável. Nunca force o abdômen. Interrompa se sentir dor ou desconforto.
        </span>
      </div>

      {/* Phase Visualizer */}
      <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-stone-100 min-h-[220px]">
        {phase === 'intro' && (
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-stone-800">
              Deite-se confortavelmente ou sente-se relaxado
            </p>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Coloque uma mão sobre a barriga. Clique em Iniciar para conduzir a respiração e os movimentos circulares.
            </p>
          </div>
        )}

        {phase === 'minute1' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center">
              {/* Expanding and contracting circle */}
              <div
                className={`w-32 h-32 rounded-full border-4 border-teal-500/40 bg-teal-50/60 flex items-center justify-center transition-all duration-1000 ${
                  breathState === 'inspire' ? 'scale-125 bg-teal-100/80 border-teal-600' : 'scale-90 bg-teal-50/30'
                }`}
              >
                <span className="text-sm font-bold text-teal-900 uppercase tracking-wider">
                  {breathState === 'inspire' ? 'Inspire (4s)' : 'Expire (6s)'}
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-teal-800">Minuto 1: Respiração Diafragmática</p>
              <p className="text-xs text-stone-500">Inspire pelo nariz inflando a barriga, solte o ar devagar pela boca.</p>
            </div>
          </div>
        )}

        {phase === 'minute2' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-teal-600/60 flex items-center justify-center">
              {/* Clockwise rotating pointer */}
              <div className="absolute inset-0 animate-clockwise flex items-start justify-center">
                <div className="w-3.5 h-3.5 bg-teal-600 rounded-full shadow-sm -mt-1.5" />
              </div>
              <span className="text-xs font-semibold text-stone-700 text-center px-4">
                Sentido Horário
              </span>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-teal-800">Minuto 2: Círculos Suaves</p>
              <p className="text-xs text-stone-500">Palma da mão ao redor do umbigo, movimentos amplos e carinhosos.</p>
            </div>
          </div>
        )}

        {phase === 'minute3' && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 animate-pulse">
              <span className="text-xs font-bold text-center px-2">Deslizar Suave</span>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-teal-800">Minuto 3: Relaxamento Final</p>
              <p className="text-xs text-stone-500">Deslize as mãos com leveza pela lateral e faça 3 respirações lentas.</p>
            </div>
          </div>
        )}

        {phase === 'completed' && (
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Check className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-stone-900">
              Prática Concluída com Sucesso!
            </p>
            <p className="text-xs text-stone-500">
              Observe como a sua musculatura abdominal está mais solta e relaxada.
            </p>
          </div>
        )}
      </div>

      {/* Steps bar */}
      <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
        <div className={`p-2 rounded-lg border transition-colors ${phase === 'minute1' ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold' : 'bg-white border-stone-200 text-stone-500'}`}>
          1. Respiração (4s/6s)
        </div>
        <div className={`p-2 rounded-lg border transition-colors ${phase === 'minute2' ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold' : 'bg-white border-stone-200 text-stone-500'}`}>
          2. Círculos Horários
        </div>
        <div className={`p-2 rounded-lg border transition-colors ${phase === 'minute3' ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold' : 'bg-white border-stone-200 text-stone-500'}`}>
          3. Deslizamento & Fim
        </div>
      </div>

      {/* Action Buttons */}
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
              <Play className="w-4 h-4" /> {phase === 'completed' ? 'Repetir Prática' : 'Iniciar Massagem Guiada'}
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
