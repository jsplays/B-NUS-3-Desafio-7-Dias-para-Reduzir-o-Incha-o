import React, { useState } from 'react';
import { ChallengeProvider, useChallenge } from './context/ChallengeContext';
import { Header } from './components/Header';
import { DaySelector } from './components/DaySelector';
import { DailyView } from './components/DailyView';
import { RoutinesView } from './components/RoutinesView';
import { ProgressView } from './components/ProgressView';
import { GuideView } from './components/GuideView';
import { BottomNav, MainTabType } from './components/BottomNav';
import { SafetyModal } from './components/SafetyModal';

const AppContent: React.FC = () => {
  const { state } = useChallenge();
  const [activeTab, setActiveTab] = useState<MainTabType>('desafio');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-800 flex justify-center selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Mobile App Canvas Container (responsive mobile frame, max-w-md on desktop) */}
      <div className="w-full max-w-md bg-stone-50 min-h-screen flex flex-col shadow-xl border-x border-stone-200/80 relative">
        {/* Top Header */}
        <Header onOpenSafetyModal={() => setIsSafetyModalOpen(true)} />

        {/* Day Selector (only visible on 'desafio' tab) */}
        {activeTab === 'desafio' && <DaySelector />}

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'desafio' && <DailyView />}
          {activeTab === 'rotina' && <RoutinesView />}
          {activeTab === 'progresso' && <ProgressView />}
          {activeTab === 'guia' && <GuideView onOpenSafetyModal={() => setIsSafetyModalOpen(true)} />}
        </main>

        {/* Bottom Navigation Anchor */}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* Mandatory Safety Onboarding Modal (if not yet accepted) */}
        {!state.disclaimerAccepted && (
          <SafetyModal isOpen={true} forceConfirmation={true} />
        )}

        {/* On-Demand Safety Modal (accessible anytime via header or guide) */}
        {state.disclaimerAccepted && (
          <SafetyModal
            isOpen={isSafetyModalOpen}
            onClose={() => setIsSafetyModalOpen(false)}
            forceConfirmation={false}
          />
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ChallengeProvider>
      <AppContent />
    </ChallengeProvider>
  );
}
