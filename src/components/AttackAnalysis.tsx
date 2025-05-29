
import React from 'react';
import { AlertTriangle, Shield, CheckCircle, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AttackAnalysisProps {
  input: string;
  riskScore: number;
  safeMode?: boolean;
}

export const AttackAnalysis: React.FC<AttackAnalysisProps> = ({ input, riskScore, safeMode = false }) => {
  const getRiskLevel = (score: number) => {
    if (score < 20) return { level: 'Low', color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700' };
    if (score < 50) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700' };
    return { level: 'High', color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700' };
  };

  const risk = getRiskLevel(riskScore);
  const threshold = safeMode ? 15 : 20;

  if (!input.trim()) return null;

  return (
    <Card className="p-3 border-orange-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {riskScore > threshold ? (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            ) : (
              <Shield className="h-4 w-4 text-green-500" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Threat Analysis
            </span>
            {safeMode && (
              <Badge className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700">
                <Activity className="h-3 w-3 mr-1" />
                Enhanced
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={`text-xs border ${risk.color}`}>
            {risk.level} Risk
          </Badge>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {riskScore}%
          </span>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              riskScore < 20 ? 'bg-green-400' : 
              riskScore < 50 ? 'bg-yellow-400' : 
              'bg-red-400'
            }`}
            style={{ width: `${Math.min(riskScore, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {riskScore > threshold && (
        <div className="mt-2 text-xs text-red-600 dark:text-red-400">
          ⚠️ Potential injection attack detected
          {safeMode && " - Enhanced scanning active"}
        </div>
      )}
    </Card>
  );
};
