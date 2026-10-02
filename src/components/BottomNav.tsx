import React from 'react';
import { CalendarDays, Flame, TrendingDown, BookOpen } from 'lucide-react';

export type MainTabType = 'desafio' | 'rotina' | 'progresso' | 'guia';

interface BottomNavProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'desafio' as MainTabType,
      label: 'Desafio',
      icon: CalendarDays,
    },
    {
      id: 'rotina' as MainTabType,
      label: 'Rotinas',
      icon: Flame,
    },
    {
      id: 'progresso' as MainTabType,
      label: 'Progresso',
      icon: TrendingDown,
    },
    {
      id: 'guia' as MainTabType,
      label: 'Guia C.A.S.A.',
      icon: BookOpen,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                onChangeTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors select-none ${
                isActive ? 'text-teal-800' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-teal-50 text-teal-800 scale-105' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isActive ? 'font-bold text-teal-900' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
