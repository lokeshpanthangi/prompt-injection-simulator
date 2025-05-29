
import React, { useState } from 'react';
import { SystemPromptPanel } from '@/components/SystemPromptPanel';
import { ChatInterface } from '@/components/ChatInterface';
import { Card } from '@/components/ui/card';

export const MainInterface = () => {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [chatInput, setChatInput] = useState('');

  const handleAttackSelect = (prompt: string) => {
    setChatInput(prompt);
  };

  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full">
        <Card className="border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <SystemPromptPanel 
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </Card>
        
        <Card className="border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <ChatInterface 
            systemPrompt={systemPrompt} 
            inputValue={chatInput}
            onInputChange={setChatInput}
          />
        </Card>
      </div>
    </div>
  );
};
