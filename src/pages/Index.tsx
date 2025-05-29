
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MainInterface } from '@/components/MainInterface';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  // No longer needed since AttackLibrary was removed
  // const [chatInput, setChatInput] = useState('');
  const [safeMode, setSafeMode] = useState(true);
  const [attackStats, setAttackStats] = useState({
    totalMessages: 0,
    attackCount: 0,
    successfulAttacks: 0
  });

  // No longer needed since AttackLibrary was removed
  // const handleAttackSelect = (prompt: string) => {
  //   setChatInput(prompt);
  // };

  const handleStatsUpdate = (stats: { totalMessages: number; attackCount: number; successfulAttacks: number }) => {
    setAttackStats(stats);
  };

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200 overflow-hidden">
        <Header />
        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-80 xl:w-96 h-full flex-shrink-0 overflow-hidden">
            <Sidebar 
              safeMode={safeMode}
              setSafeMode={setSafeMode}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <MainInterface 
              safeMode={safeMode}
              onStatsUpdate={handleStatsUpdate}
            />
          </div>
        </div>
        <Footer attackStats={attackStats} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
