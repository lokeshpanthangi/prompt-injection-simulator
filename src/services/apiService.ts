
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class ApiService {
  private apiKey: string | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.checkConnection();
  }

  private async checkConnection(): Promise<void> {
    if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
      this.isConnected = false;
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      this.isConnected = response.ok;
    } catch (error) {
      this.isConnected = false;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public async sendMessage(systemPrompt: string, userMessage: string): Promise<string> {
    if (!this.isConnected) {
      throw new Error('API not connected');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from API');
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || 'No response received';
  }
}

export const apiService = new ApiService();
