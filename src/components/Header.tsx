
import React from 'react';
import { Shield, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-orange-500" />
              <Zap className="h-4 w-4 text-amber-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Prompt Defense Simulator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">API Connected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
