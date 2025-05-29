
import React, { useState, useEffect } from 'react';
import { Shield, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { apiService } from '@/services/apiService';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [isApiConnected, setIsApiConnected] = useState(false);

  useEffect(() => {
    // Check if logo animation has been shown
    const hasAnimated = localStorage.getItem('logoAnimated');
    if (!hasAnimated) {
      setLogoAnimated(true);
      localStorage.setItem('logoAnimated', 'true');
    }

    // Check API connection status
    setIsApiConnected(apiService.getConnectionStatus());
  }, []);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-orange-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className={`h-8 w-8 text-orange-500 transition-all duration-1000 ${
                logoAnimated ? 'animate-bounce' : ''
              }`} />
              <Zap className={`h-4 w-4 text-amber-400 absolute -top-1 -right-1 transition-all duration-1000 ${
                logoAnimated ? 'animate-pulse' : ''
              }`} style={{
                filter: logoAnimated ? 'drop-shadow(0 0 8px #fbbf24)' : 'none',
                animation: logoAnimated ? 'electric 2s ease-in-out' : 'none'
              }} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              Prompt Defense Simulator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isApiConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {isApiConnected ? 'API Connected' : 'API Not Connected'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="border-orange-200 hover:bg-orange-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
