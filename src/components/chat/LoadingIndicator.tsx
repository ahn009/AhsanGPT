import { motion } from 'framer-motion';
import ahsanLogo from '@/assets/ahsan-gpt-logo.png';

export function LoadingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card border border-border overflow-hidden">
        <img src={ahsanLogo} alt="Ahsan GPT" className="h-5 w-5 object-contain" />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-chat-ai-bubble px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
