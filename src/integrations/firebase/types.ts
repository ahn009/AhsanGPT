import type { User } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Timestamp;
  isAI: boolean;
  chatId: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  messageCount: number;
}

export type { User };
