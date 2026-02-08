import { motion } from 'framer-motion';
import type { ChatMode } from '@/types/chat';
import { MODE_CONFIG } from '@/types/chat';
import ahsanLogo from '@/assets/ahsan-gpt-logo.png';

interface WelcomeScreenProps {
  mode: ChatMode;
  onSuggestionClick: (text: string) => void;
}

const SUGGESTIONS: Record<ChatMode, string[]> = {
  quick: [
    'Explain quantum computing in simple terms',
    'What are the best practices for React?',
    'Help me plan a trip to Japan',
    'Compare TypeScript vs JavaScript',
  ],
  deep: [
    'Analyze the impact of AI on education',
    'Compare microservices vs monolithic architecture',
    'Explain the implications of GPT-5',
  ],
  creative: [
    'Write a short story about time travel',
    'Create a poem about the ocean at night',
    'Help me brainstorm startup ideas',
  ],
  research: [
    'Summarize recent advances in mRNA vaccines',
    'What are the key findings in climate science 2024?',
    'Compare different machine learning paradigms',
  ],
  developer: [
    'Build a REST API with authentication',
    'Debug this React performance issue',
    'Design a scalable database schema',
  ],
};

export function WelcomeScreen({ mode, onSuggestionClick }: WelcomeScreenProps) {
  const config = MODE_CONFIG[mode];
  const suggestions = SUGGESTIONS[mode];

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col items-center justify-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border glow-primary overflow-hidden"
      >
        <img src={ahsanLogo} alt="Ahsan GPT" className="h-14 w-14 object-contain" />
      </motion.div>

      <h1 className="mb-2 text-2xl font-bold text-foreground">
        Ahsan GPT
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {config.label} Mode — {config.description}
      </p>

      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {suggestions.map((text, i) => (
          <motion.button
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => onSuggestionClick(text)}
            className="rounded-xl border border-border bg-card p-4 text-left text-sm text-card-foreground transition-all hover:border-primary/40 hover:bg-accent/10 hover:glow-primary-sm"
          >
            {text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
