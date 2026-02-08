import { motion } from 'framer-motion';
import type { ChatMode } from '@/types/chat';
import { MODE_CONFIG } from '@/types/chat';

interface ModeSelectorProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  const modes = Object.entries(MODE_CONFIG) as [ChatMode, typeof MODE_CONFIG[ChatMode]][];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {modes.map(([key, config]) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            mode === key
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          }`}
        >
          {mode === key && (
            <motion.div
              layoutId="mode-pill"
              className="absolute inset-0 rounded-xl bg-primary glow-primary-sm"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span>{config.icon}</span>
            <span className="hidden sm:inline">{config.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
