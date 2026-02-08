import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { Message } from '@/types/chat';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ahsanLogo from '@/assets/ahsan-gpt-logo.png';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card border border-border overflow-hidden">
          <img src={ahsanLogo} alt="Ahsan GPT" className="h-5 w-5 object-contain" />
        </div>
      )}

      <div className={`group relative max-w-[80%] md:max-w-[70%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-chat-user-bubble text-chat-user-bubble-foreground rounded-br-md'
              : 'bg-chat-ai-bubble text-chat-ai-bubble-foreground rounded-bl-md'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none [&>*]:text-chat-ai-bubble-foreground prose-headings:text-chat-ai-bubble-foreground prose-p:text-chat-ai-bubble-foreground prose-p:break-words prose-strong:text-primary prose-code:text-foreground prose-code:bg-black/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:break-all prose-pre:bg-black/30 prose-pre:border prose-pre:border-border prose-pre:text-foreground prose-pre:overflow-x-auto prose-blockquote:border-primary/50 prose-blockquote:text-muted-foreground prose-li:text-chat-ai-bubble-foreground prose-a:text-primary prose-a:break-words">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {message.files && message.files.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {message.files.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-md bg-black/20 px-2 py-1 text-xs break-all">
                  📎 {f.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-6 left-2 flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
            aria-label="Copy message"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <span className="text-xs font-medium text-secondary-foreground">You</span>
        </div>
      )}
    </motion.div>
  );
}
