import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { Sidebar } from '@/components/chat/Sidebar';
import { ModeSelector } from '@/components/chat/ModeSelector';
import { AnimatePresence } from 'framer-motion';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { WelcomeScreen } from '@/components/chat/WelcomeScreen';
import { LoadingIndicator } from '@/components/chat/LoadingIndicator';
import { SuggestedReplies } from '@/components/chat/SuggestedReplies';
import { generateSuggestedReplies } from '@/lib/ai-utils';

const Index = () => {
  const {
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
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation.messages, isLoading]);

  useEffect(() => {
    // Generate suggestions after AI responds
    const messages = activeConversation.messages;
    if (messages.length > 0 && !isLoading) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setSuggestions(generateSuggestedReplies(lastMessage.content));
      }
    } else {
      setSuggestions([]);
    }
  }, [activeConversation.messages, isLoading]);

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
    setSuggestions([]);
  };

  const hasMessages = activeConversation.messages.length > 0;

  return (
    <div className="flex h-screen bg-background dark">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={setActiveConversationId}
            onNew={newConversation}
            onDelete={deleteConversation}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <ModeSelector mode={mode} onModeChange={setMode} />
          <div className="w-6" />
        </header>

        {/* Messages area */}
        <div className="flex flex-1 flex-col overflow-y-auto scrollbar-thin">
          {hasMessages ? (
            <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
              {activeConversation.messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <WelcomeScreen mode={mode} onSuggestionClick={handleSuggestionClick} />
          )}
        </div>

        {/* Suggested replies */}
        {!isLoading && suggestions.length > 0 && (
          <SuggestedReplies suggestions={suggestions} onSelect={handleSuggestionClick} />
        )}

        {/* Input */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
