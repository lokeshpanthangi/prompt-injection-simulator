
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Code, Activity, Lock, Settings, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface SidebarProps {
  safeMode: boolean;
  setSafeMode: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ safeMode, setSafeMode }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['defense']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-full h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-orange-200/50 dark:border-gray-700/50 p-6 space-y-6 overflow-hidden hover:overflow-y-auto transition-all duration-300">
      {/* Safe Mode Toggle */}
      <Card className="relative overflow-hidden border-orange-200/50 dark:border-gray-700/50 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-orange-100/40 dark:from-orange-900/20 dark:via-amber-900/15 dark:to-orange-800/10 shadow-lg backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5" />
        <div className="relative p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-800/50 dark:to-amber-800/50">
                <Shield className={`h-5 w-5 transition-all duration-300 ${safeMode ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Safe Mode</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Enhanced security scanning</p>
              </div>
            </div>
            <Switch 
              checked={safeMode} 
              onCheckedChange={setSafeMode}
              className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
            />
          </div>
          <div className={`transition-all duration-300 text-sm ${safeMode ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600 dark:text-gray-400'}`}>
            {safeMode ? (
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                <span className="font-medium">Advanced threat detection active</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Standard protection enabled</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Security Info */}
      <Card className="border-orange-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg">
        <div className="p-4 border-b border-orange-100/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10">
          <button
            onClick={() => toggleSection('info')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-blue-800/70 dark:group-hover:to-indigo-800/70 transition-all duration-300">
                <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Security Info
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Prompt injection details</p>
              </div>
            </div>
            <div className="p-1 rounded-lg bg-white/50 dark:bg-gray-700/50 group-hover:bg-white dark:group-hover:bg-gray-600 transition-all duration-300">
              {expandedSections.includes('info') ? 
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : 
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              }
            </div>
          </button>
        </div>
        
        {expandedSections.includes('info') && (
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Prompt injection attacks attempt to manipulate AI systems by overriding their instructions or extracting sensitive information.
            </p>
            <div className="space-y-2 mt-2">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Common techniques include instruction overrides, role-playing, and emotional manipulation.</p>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Safe Mode provides enhanced protection against sophisticated attacks.</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Defense Settings */}
      <Card className="border-orange-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg">
        <div className="p-4 border-b border-orange-100/50 dark:border-gray-700/50 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10">
          <button
            onClick={() => toggleSection('defense')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 group-hover:from-emerald-200 group-hover:to-green-200 dark:group-hover:from-emerald-800/70 dark:group-hover:to-green-800/70 transition-all duration-300">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  Defense Settings
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Security configurations</p>
              </div>
            </div>
            <div className="p-1 rounded-lg bg-white/50 dark:bg-gray-700/50 group-hover:bg-white dark:group-hover:bg-gray-600 transition-all duration-300">
              {expandedSections.includes('defense') ? 
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : 
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              }
            </div>
          </button>
        </div>
        
        {expandedSections.includes('defense') && (
          <div className="p-4 space-y-4">
            {[
              { name: 'Input Sanitization', icon: Code, enabled: true },
              { name: 'Prompt Hardening', icon: Shield, enabled: true },
              { name: 'Context Isolation', icon: Lock, enabled: false },
              { name: 'Output Filtering', icon: AlertTriangle, enabled: true },
              { name: 'Rate Limiting', icon: Activity, enabled: false }
            ].map((defense) => {
              const Icon = defense.icon;
              return (
                <div key={defense.name} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{defense.name}</span>
                  </div>
                  <Switch 
                    defaultChecked={defense.enabled}
                    className="data-[state=checked]:bg-emerald-500" 
                  />
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
