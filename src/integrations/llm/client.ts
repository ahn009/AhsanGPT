interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 10000);
};

export async function sendMessage(messages: Message[], model: string = 'gemini-2.5-flash'): Promise<string> {
  const apiKey = import.meta.env.VITE_LLM_API_KEY;

  if (!apiKey) {
    throw new Error('LLM API key not configured');
  }

  const sanitizedMessages = messages.map(m => ({
    ...m,
    content: sanitizeInput(m.content),
  }));

  const prompt = sanitizedMessages.map(m => `${m.role}: ${m.content}`).join('\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    if (model === 'gemini-2.5-flash') {
      return sendMessage(messages, 'gemini-2.5-pro');
    }
    throw new Error(`API error: ${error}`);
  }

  const data: GeminiResponse = await response.json();
  return data.candidates[0].content.parts[0].text;
}
