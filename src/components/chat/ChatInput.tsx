import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, X, Globe } from 'lucide-react';

interface ChatInputProps {
  onSend: (content: string, files?: File[]) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/csv',
];

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [webSearch, setWebSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed && files.length === 0) return;
    if (trimmed.length > 10000) {
      alert('Message too long. Maximum 10,000 characters.');
      return;
    }
    onSend(trimmed, files.length > 0 ? files : undefined);
    setInput('');
    setFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input, files, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 10000) {
      setInput(value);
    }
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    
    for (const file of newFiles) {
      if (files.length + validFiles.length >= MAX_FILES) {
        alert(`Maximum ${MAX_FILES} files allowed`);
        break;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} exceeds 10MB limit`);
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`${file.name} has unsupported file type`);
        continue;
      }
      validFiles.push(file);
    }
    
    setFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 flex flex-wrap gap-2"
          >
            {files.map((file, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
              >
                📎 {file.name}
                <button 
                  onClick={() => removeFile(i)} 
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative rounded-2xl border border-border bg-chat-input shadow-lg transition-colors focus-within:border-primary/50 focus-within:glow-primary-sm">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Ahsan GPT anything..."
          rows={1}
          maxLength={10000}
          className="w-full resize-none bg-transparent px-4 pt-4 pb-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none scrollbar-thin"
          disabled={isLoading}
          aria-label="Chat input"
        />

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx,.pptx,.csv"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
              title="Attach files"
              disabled={files.length >= MAX_FILES}
              aria-label="Attach files"
            >
              <Paperclip size={18} />
            </button>
            <button
              onClick={() => setWebSearch(!webSearch)}
              className={`rounded-lg p-2 transition-colors ${
                webSearch
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
              title="Toggle web search"
              aria-label="Toggle web search"
            >
              <Globe size={18} />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || (!input.trim() && files.length === 0)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:glow-primary-sm disabled:opacity-30 disabled:hover:shadow-none"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Ahsan GPT can make mistakes. Verify important information.
      </p>
    </div>
  );
}
