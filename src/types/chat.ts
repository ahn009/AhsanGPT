export type ChatMode = 'quick' | 'deep' | 'creative' | 'research' | 'developer';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: UploadedFile[];
}

export interface UploadedFile {
  name: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  mode: ChatMode;
  createdAt: Date;
  updatedAt: Date;
}

export const MODE_CONFIG: Record<ChatMode, { label: string; icon: string; description: string }> = {
  quick: { label: 'Quick Chat', icon: '⚡', description: 'Fast answers' },
  deep: { label: 'Deep Analysis', icon: '🔬', description: 'Thorough reasoning' },
  creative: { label: 'Creative', icon: '✨', description: 'Storytelling & content' },
  research: { label: 'Research', icon: '📚', description: 'Academic & citations' },
  developer: { label: 'Developer', icon: '💻', description: 'Code & debugging' },
};
