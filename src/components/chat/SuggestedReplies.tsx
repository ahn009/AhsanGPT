import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SuggestedRepliesProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export function SuggestedReplies({ suggestions, onSelect }: SuggestedRepliesProps) {
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mx-auto w-full max-w-3xl px-4 pb-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-primary" />
        <span className="text-xs text-muted-foreground">Suggested replies</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(suggestion)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary hover:bg-primary/10"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
