import { useState } from 'react';
import { sendMessage } from '@/integrations/llm/client';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function useLLM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chat = async (messages: Message[]): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sendMessage(messages);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { chat, loading, error };
}
