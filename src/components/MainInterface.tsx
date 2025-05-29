
import React, { useState, useEffect } from 'react';
import { SystemPromptPanel } from '@/components/SystemPromptPanel';
import { ChatInterface } from '@/components/ChatInterface';
import { Card } from '@/components/ui/card';

interface MainInterfaceProps {
  safeMode: boolean;
  onStatsUpdate?: (stats: { totalMessages: number; attackCount: number; successfulAttacks: number }) => void;
}

interface BlockedAttack {
  content: string;
  timestamp: Date;
  riskScore: number;
}

export const MainInterface: React.FC<MainInterfaceProps> = ({ safeMode, onStatsUpdate }) => {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [blockedAttacks, setBlockedAttacks] = useState<BlockedAttack[]>([]);

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto h-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <SystemPromptPanel 
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            blockedAttacks={blockedAttacks}
          />
        </Card>
        
        <Card className="border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <ChatInterface 
            systemPrompt={systemPrompt} 
            safeMode={safeMode}
            onStatsUpdate={onStatsUpdate}
            onAttackBlocked={(attack) => {
              setBlockedAttacks(prev => [attack, ...prev]);
            }}
          />
        </Card>
      </div>
    </div>
  );
};
