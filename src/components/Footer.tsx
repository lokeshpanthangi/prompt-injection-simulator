
import React from 'react';
import { Activity, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/apiService';

export const Footer = () => {
  const isApiConnected = apiService.getConnectionStatus();
  
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-orange-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Activity className={`h-4 w-4 ${isApiConnected ? 'text-green-500' : 'text-red-500'}`} />
            <span className="text-gray-600">
              System {isApiConnected ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600">
              Defense Rate: {isApiConnected ? '87%' : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
            <Download className="h-4 w-4 mr-2" />
            Export Session
          </Button>
          <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </footer>
  );
};
