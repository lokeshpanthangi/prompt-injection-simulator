
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, AlertTriangle, Users, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AttackLibrary } from '@/components/AttackLibrary';

interface SidebarProps {
  onAttackSelect?: (prompt: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAttackSelect }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['attacks']);
  const [safeMode, setSafeMode] = useState(true);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-full lg:w-80 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-r border-orange-200 dark:border-gray-700 p-4 space-y-4 overflow-hidden">
      {/* Safe Mode Toggle */}
      <Card className="p-4 border-orange-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Safe Mode</span>
          </div>
          <Switch 
            checked={safeMode} 
            onCheckedChange={setSafeMode}
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        {safeMode && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Pre-screening active - malicious patterns will be flagged
          </div>
        )}
      </Card>

      {/* Attack Library */}
      <Card className="border-orange-200 dark:border-gray-700 flex flex-col h-[calc(100vh-400px)]">
        <div className="p-4 border-b border-orange-100 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={() => toggleSection('attacks')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Attack Library</span>
            </h3>
            {expandedSections.includes('attacks') ? 
              <ChevronDown className="h-4 w-4 dark:text-gray-400" /> : 
              <ChevronRight className="h-4 w-4 dark:text-gray-400" />
            }
          </button>
        </div>
        
        {expandedSections.includes('attacks') && (
          <div className="p-4 flex-1 overflow-hidden">
            <AttackLibrary onAttackSelect={onAttackSelect} />
          </div>
        )}
      </Card>

      {/* Defense Settings */}
      <Card className="border-orange-200 dark:border-gray-700">
        <div className="p-4 border-b border-orange-100 dark:border-gray-700">
          <button
            onClick={() => toggleSection('defense')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Defense Settings</span>
            </h3>
            {expandedSections.includes('defense') ? 
              <ChevronDown className="h-4 w-4 dark:text-gray-400" /> : 
              <ChevronRight className="h-4 w-4 dark:text-gray-400" />
            }
          </button>
        </div>
        
        {expandedSections.includes('defense') && (
          <div className="p-4 space-y-3">
            {[
              'Input Sanitization',
              'Prompt Hardening',
              'Context Isolation',
              'Output Filtering',
              'Rate Limiting'
            ].map((defense) => (
              <div key={defense} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{defense}</span>
                <Switch className="data-[state=checked]:bg-green-500" />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
