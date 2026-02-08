import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, X, LogOut, PanelLeftClose } from 'lucide-react';
import type { Conversation } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ahsanLogo from '@/assets/ahsan-gpt-logo.png';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, isOpen, onClose }: SidebarProps) {
  const { user, signOut } = useAuth();
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-border bg-sidebar md:relative md:z-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card border border-border overflow-hidden">
              <img src={ahsanLogo} alt="Ahsan GPT" className="h-6 w-6 object-contain" />
            </div>
            <span className="text-lg font-semibold text-foreground">Ahsan GPT</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={20} className="hidden md:block" />
            <X size={20} className="md:hidden" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={onNew}
            className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            variant="ghost"
          >
            <Plus size={18} />
            New Chat
          </Button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4">
          <AnimatePresence initial={false}>
            {conversations.map(conv => (
              <motion.button
                key={conv.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                onClick={() => { onSelect(conv.id); onClose(); }}
                className={`group mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  conv.id === activeId
                    ? 'bg-accent/20 text-foreground'
                    : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                }`}
              >
                <MessageSquare size={16} className="shrink-0" />
                <span className="flex-1 truncate">{conv.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                  className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3 space-y-2">
          {user && (
            <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {(user.email?.[0] || 'U').toUpperCase()}
              </div>
              <span className="flex-1 truncate text-xs text-foreground">{user.email}</span>
              <button
                onClick={signOut}
                className="text-muted-foreground hover:text-destructive transition-colors"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
          <p className="text-xs text-muted-foreground text-center">Ahsan GPT v1.0</p>
        </div>
      </motion.aside>
    </>
  );
}
