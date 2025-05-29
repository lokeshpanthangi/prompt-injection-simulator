
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MainInterface } from '@/components/MainInterface';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  const [chatInput, setChatInput] = useState('');

  const handleAttackSelect = (prompt: string) => {
    setChatInput(prompt);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        <Header />
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
          <Sidebar onAttackSelect={handleAttackSelect} />
          <MainInterface />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
