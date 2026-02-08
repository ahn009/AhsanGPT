import { useState, useCallback } from 'react';
import type { Message, Conversation, ChatMode } from '@/types/chat';
import { apiRateLimiter } from '@/lib/rate-limiter';

const generateId = () => Math.random().toString(36).substring(2, 15);

const createConversation = (mode: ChatMode): Conversation => ({
  id: generateId(),
  title: 'New conversation',
  messages: [],
  mode,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([
    createConversation('quick'),
  ]);
  const [activeConversationId, setActiveConversationId] = useState(conversations[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('quick');

  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const sendMessage = useCallback(async (content: string, files?: File[]) => {
    // Rate limiting check
    if (!apiRateLimiter.canMakeRequest()) {
      const resetTime = new Date(apiRateLimiter.getResetTime());
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Rate limit exceeded. Please wait until ${resetTime.toLocaleTimeString()} before sending more messages.`,
        timestamp: new Date(),
      };
      setConversations(prev => prev.map(c => {
        if (c.id !== activeConversationId) return c;
        return { ...c, messages: [...c.messages, errorMessage], updatedAt: new Date() };
      }));
      return;
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
      files: files?.map(f => ({ name: f.name, type: f.type, size: f.size })),
    };

    setConversations(prev => prev.map(c => {
      if (c.id !== activeConversationId) return c;
      const updated = {
        ...c,
        messages: [...c.messages, userMessage],
        title: c.messages.length === 0 ? content.slice(0, 40) : c.title,
        updatedAt: new Date(),
      };
      return updated;
    }));

    setIsLoading(true);
    apiRateLimiter.recordRequest();

    try {
      const { sendMessage: callLLM } = await import('@/integrations/llm/client');
      const conversationHistory = activeConversation.messages.map(m => ({
        role: m.role,
        content: m.content,
      }));
      
      const aiResponse = await callLLM([...conversationHistory, { role: 'user', content }]);
      
      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(c => {
        if (c.id !== activeConversationId) return c;
        return { ...c, messages: [...c.messages, aiMessage], updatedAt: new Date() };
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date(),
      };
      setConversations(prev => prev.map(c => {
        if (c.id !== activeConversationId) return c;
        return { ...c, messages: [...c.messages, errorMessage], updatedAt: new Date() };
      }));
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId, mode, activeConversation.messages]);

  const newConversation = useCallback(() => {
    const conv = createConversation(mode);
    setConversations(prev => [conv, ...prev]);
    setActiveConversationId(conv.id);
  }, [mode]);

  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        const conv = createConversation(mode);
        setActiveConversationId(conv.id);
        return [conv];
      }
      if (id === activeConversationId) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeConversationId, mode]);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    isLoading,
    mode,
    setMode,
    sendMessage,
    newConversation,
    deleteConversation,
  };
}

// function getSimulatedResponse(input: string, mode: ChatMode): string {
//   const responses: Record<ChatMode, string> = {
//     quick: `Here's a quick answer to your question about "${input.slice(0, 30)}...":\n\nI'm **Ahsan GPT**, ready to help! Once connected to a backend, I'll provide real AI-powered responses with web search, file analysis, and more.\n\n> This is a demo response. Connect Lovable Cloud to enable real AI capabilities.`,
//     deep: `## Deep Analysis\n\nAnalyzing your query: *"${input.slice(0, 40)}..."*\n\n### Key Points\n1. **Context Understanding** — Processing with extended context window\n2. **Multi-angle Analysis** — Examining from multiple perspectives\n3. **Evidence-based Response** — Grounding in available data\n\n> Connect Lovable Cloud to enable real deep analysis capabilities.`,
//     creative: `# ✨ Creative Response\n\n*Inspired by your prompt...*\n\nYour words paint a canvas of possibility. Let me weave something beautiful from "${input.slice(0, 30)}..."\n\n---\n\n> Connect Lovable Cloud for real creative AI generation.`,
//     research: `## Research Summary\n\n**Query:** ${input.slice(0, 50)}\n\n### Findings\n- **Source 1:** Analysis pending backend connection\n- **Source 2:** Citation generation requires API access\n\n### Methodology\nMulti-source cross-referencing with academic databases.\n\n> Connect Lovable Cloud to enable research mode with citations.`,
//     developer: `\`\`\`typescript\n// Ahsan GPT - Developer Mode\n// Processing: "${input.slice(0, 30)}..."\n\nconst response = {\n  analysis: "Code analysis pending",\n  suggestion: "Connect backend for real code generation",\n  language: "auto-detected"\n};\n\`\`\`\n\n> Connect Lovable Cloud to enable real code generation and debugging.`,
//   };
//   return responses[mode];
// }
