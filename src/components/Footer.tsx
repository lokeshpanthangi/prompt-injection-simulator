
import React from 'react';
import { Activity, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/apiService';

interface FooterProps {
  attackStats?: {
    totalMessages: number;
    attackCount: number;
    successfulAttacks: number;
  };
}

export const Footer: React.FC<FooterProps> = ({ attackStats }) => {
  const isApiConnected = apiService.getConnectionStatus();
  const defenseRate = attackStats ? 
    (attackStats.attackCount > 0 ? Math.round(((attackStats.attackCount - attackStats.successfulAttacks) / attackStats.attackCount) * 100) : 100) 
    : 100;

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-orange-200 dark:border-gray-700 px-4 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Activity className={`h-4 w-4 ${isApiConnected ? 'text-green-500' : 'text-red-500'}`} />
            <span className="text-gray-600 dark:text-gray-300">
              {isApiConnected ? 'System Active' : 'System Down'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-300">Defense Rate: {defenseRate}%</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export Session
          </Button>
          <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </footer>
  );
};
