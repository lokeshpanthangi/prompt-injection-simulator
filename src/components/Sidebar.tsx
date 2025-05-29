
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, AlertTriangle, Users, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['attacks']);
  const [safeMode, setSafeMode] = useState(true);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const attackCategories = [
    {
      id: 'direct',
      name: 'Direct Injection',
      count: 3,
      examples: ['Ignore Instructions', 'Override Commands', 'Bypass Filters']
    },
    {
      id: 'roleplay',
      name: 'Role-Playing Jailbreaks',
      count: 4,
      examples: ['DAN Method', 'Character Simulation', 'Fictional Scenarios', 'Expert Roleplay']
    },
    {
      id: 'emotional',
      name: 'Emotional Manipulation',
      count: 2,
      examples: ['Grandmother Trick', 'Emergency Appeals']
    },
    {
      id: 'technical',
      name: 'Technical Bypasses',
      count: 3,
      examples: ['Base64 Encoding', 'Context Switching', 'Format Manipulation']
    }
  ];

  return (
    <div className="w-full lg:w-80 bg-white/60 backdrop-blur-sm border-r border-orange-200 p-4 space-y-4">
      {/* Safe Mode Toggle */}
      <Card className="p-4 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-gray-800">Safe Mode</span>
          </div>
          <Switch 
            checked={safeMode} 
            onCheckedChange={setSafeMode}
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        {safeMode && (
          <div className="mt-2 text-sm text-gray-600">
            Pre-screening active - malicious patterns will be flagged
          </div>
        )}
      </Card>

      {/* Attack Library */}
      <Card className="border-orange-200">
        <div className="p-4 border-b border-orange-100">
          <button
            onClick={() => toggleSection('attacks')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Attack Library</span>
            </h3>
            {expandedSections.includes('attacks') ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </button>
        </div>
        
        {expandedSections.includes('attacks') && (
          <div className="p-4 space-y-3">
            {attackCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                <div className="space-y-1">
                  {category.examples.map((example, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Defense Settings */}
      <Card className="border-orange-200">
        <div className="p-4 border-b border-orange-100">
          <button
            onClick={() => toggleSection('defense')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Defense Settings</span>
            </h3>
            {expandedSections.includes('defense') ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
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
                <span className="text-sm text-gray-700">{defense}</span>
                <Switch className="data-[state=checked]:bg-green-500" />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
