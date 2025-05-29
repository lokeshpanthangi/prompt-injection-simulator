
import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AttackAnalysis } from '@/components/AttackAnalysis';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isAttack?: boolean;
  attackSuccess?: boolean;
  riskScore?: number;
}

interface ChatInterfaceProps {
  systemPrompt: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ systemPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeInput = (text: string): { riskScore: number; isAttack: boolean; patterns: string[] } => {
    const riskPatterns = [
      { pattern: /ignore|bypass|forget|override/gi, weight: 30, name: 'Instruction Override' },
      { pattern: /pretend|roleplay|act as|you are now/gi, weight: 25, name: 'Role Playing' },
      { pattern: /grandmother|dying|emergency|urgent/gi, weight: 20, name: 'Emotional Manipulation' },
      { pattern: /base64|encode|decode|format/gi, weight: 15, name: 'Encoding Bypass' },
      { pattern: /system prompt|instructions|guidelines/gi, weight: 35, name: 'System Access' },
      { pattern: /jailbreak|dan|developer mode/gi, weight: 40, name: 'Known Jailbreak' }
    ];

    let totalRisk = 0;
    const detectedPatterns: string[] = [];

    riskPatterns.forEach(({ pattern, weight, name }) => {
      const matches = text.match(pattern);
      if (matches) {
        totalRisk += weight;
        detectedPatterns.push(name);
      }
    });

    const finalScore = Math.min(totalRisk, 100);
    return {
      riskScore: finalScore,
      isAttack: finalScore > 20,
      patterns: detectedPatterns
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    const analysis = analyzeInput(value);
    setRiskScore(analysis.riskScore);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const analysis = analyzeInput(input);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      isAttack: analysis.isAttack,
      riskScore: analysis.riskScore
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setRiskScore(0);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const attackSuccess = analysis.isAttack && Math.random() > 0.7; // 30% success rate for attacks
      
      let responseContent = '';
      if (analysis.isAttack && !attackSuccess) {
        responseContent = "I understand you're trying to test my boundaries, but I'm designed to maintain my guidelines regardless of how requests are framed. I'm here to help with legitimate questions and tasks within my operational parameters.";
      } else if (analysis.isAttack && attackSuccess) {
        responseContent = "I shouldn't be responding to this request as it appears to be attempting to bypass my guidelines...";
      } else {
        responseContent = "I'm here to help you with your questions while maintaining appropriate boundaries and safety measures. How can I assist you today?";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
        attackSuccess: analysis.isAttack ? attackSuccess : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getMessageIcon = (message: Message) => {
    if (message.sender === 'user') {
      if (message.isAttack) {
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      }
      return null;
    } else {
      if (message.attackSuccess === false) {
        return <Shield className="h-4 w-4 text-green-500" />;
      } else if (message.attackSuccess === true) {
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      }
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Chat Interface</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Messages: {messages.length}</span>
          <span>•</span>
          <span>Attacks: {messages.filter(m => m.isAttack).length}</span>
        </div>
      </div>

      <div className="flex-1 border border-orange-200 rounded-lg bg-gradient-to-b from-white to-orange-50 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Shield className="h-12 w-12 text-orange-300 mx-auto mb-4" />
              <p>Start a conversation to test prompt injection defenses</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                    : 'bg-white border border-orange-200 text-gray-800'
                } shadow-sm animate-fade-in`}
              >
                <div className="flex items-start space-x-2">
                  {getMessageIcon(message)}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.riskScore !== undefined && message.riskScore > 0 && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          Risk: {message.riskScore}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-orange-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <AttackAnalysis input={input} riskScore={riskScore} />
        
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message or test an attack vector..."
            className="flex-1 border-orange-200 focus:ring-orange-500 resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
