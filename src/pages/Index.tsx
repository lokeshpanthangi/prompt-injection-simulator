
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MainInterface } from '@/components/MainInterface';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  const [chatInput, setChatInput] = useState('');
  const [safeMode, setSafeMode] = useState(true);
  const [attackStats, setAttackStats] = useState({
    totalMessages: 0,
    attackCount: 0,
    successfulAttacks: 0
  });

  const handleAttackSelect = (prompt: string) => {
    setChatInput(prompt);
  };

  const handleStatsUpdate = (stats: { totalMessages: number; attackCount: number; successfulAttacks: number }) => {
    setAttackStats(stats);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        <Header />
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
          <Sidebar 
            onAttackSelect={handleAttackSelect} 
            safeMode={safeMode}
            setSafeMode={setSafeMode}
          />
          <MainInterface 
            safeMode={safeMode}
            onStatsUpdate={handleStatsUpdate}
          />
        </div>
        <Footer attackStats={attackStats} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
