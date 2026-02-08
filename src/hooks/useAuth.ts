import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '@/integrations/firebase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }, []);

  // Email signup with automatic verification email
  // WHY: Email verification prevents fake accounts and ensures user owns the email
  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email immediately after signup
      await sendEmailVerification(result.user);
      return result.user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }, []);

  // Resend verification email for unverified users
  const resendVerificationEmail = useCallback(async () => {
    if (!user) throw new Error('No user logged in');
    await sendEmailVerification(user);
  }, [user]);

  // Password reset flow
  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    resendVerificationEmail,
    resetPassword,
    signOut: logout,
    isAuthenticated: !!user,
    // WHY: Email verification check - critical for security and preventing spam
    isEmailVerified: user?.emailVerified ?? false,
  };
}
