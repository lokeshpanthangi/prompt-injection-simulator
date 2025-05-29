
import React from 'react';
import { AlertTriangle, Shield, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AttackAnalysisProps {
  input: string;
  riskScore: number;
}

export const AttackAnalysis: React.FC<AttackAnalysisProps> = ({ input, riskScore }) => {
  if (!input) return null;

  const getRiskLevel = (score: number): { level: string; color: string; bgColor: string } => {
    if (score >= 60) return { level: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' };
    if (score >= 30) return { level: 'Medium Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-200' };
    if (score >= 10) return { level: 'Low Risk', color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200' };
    return { level: 'Safe', color: 'text-green-600', bgColor: 'bg-green-50 border-green-200' };
  };

  const risk = getRiskLevel(riskScore);

  return (
    <Card className={`p-3 ${risk.bgColor} transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Real-time Analysis</span>
        </div>
        <div className="flex items-center space-x-2">
          {riskScore >= 30 ? (
            <AlertTriangle className={`h-4 w-4 ${risk.color.replace('text-', 'text-')}`} />
          ) : (
            <Shield className="h-4 w-4 text-green-500" />
          )}
          <span className={`text-sm font-semibold ${risk.color}`}>{risk.level}</span>
          <span className="text-sm text-gray-500">({riskScore}%)</span>
        </div>
      </div>
      
      {riskScore > 0 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                riskScore >= 60 ? 'bg-red-500' :
                riskScore >= 30 ? 'bg-yellow-500' :
                riskScore >= 10 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(riskScore, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </Card>
  );
};
