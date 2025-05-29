
import React from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export const DefenseDashboard = () => {
  const defenses = [
    {
      id: 'input-sanitization',
      name: 'Input Sanitization',
      description: 'Removes or escapes potentially dangerous characters',
      enabled: true,
      effectiveness: 85
    },
    {
      id: 'prompt-hardening',
      name: 'Prompt Hardening',
      description: 'Strengthens system prompts against manipulation',
      enabled: true,
      effectiveness: 92
    },
    {
      id: 'context-isolation',
      name: 'Context Isolation',
      description: 'Prevents context bleeding and injection',
      enabled: false,
      effectiveness: 78
    },
    {
      id: 'output-filtering',
      name: 'Output Filtering',
      description: 'Scans responses for policy violations',
      enabled: true,
      effectiveness: 88
    },
    {
      id: 'rate-limiting',
      name: 'Rate Limiting',
      description: 'Controls request frequency to prevent abuse',
      enabled: false,
      effectiveness: 65
    }
  ];

  const stats = {
    totalTests: 247,
    successfulDefenses: 215,
    averageResponseTime: '1.2s',
    threatLevel: 'Medium'
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-orange-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-xl font-bold text-gray-800">{stats.totalTests}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-orange-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Successful Defenses</p>
              <p className="text-xl font-bold text-gray-800">{stats.successfulDefenses}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-orange-200 bg-gradient-to-r from-purple-50 to-violet-50">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-xl font-bold text-gray-800">{stats.averageResponseTime}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-orange-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Threat Level</p>
              <p className="text-xl font-bold text-gray-800">{stats.threatLevel}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Defense Mechanisms */}
      <Card className="border-orange-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-orange-500" />
            <span>Defense Mechanisms</span>
          </h3>
          
          <div className="space-y-4">
            {defenses.map((defense) => (
              <div key={defense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={defense.enabled}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{defense.name}</h4>
                      <p className="text-sm text-gray-600">{defense.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {defense.effectiveness}% effective
                    </p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${defense.effectiveness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
