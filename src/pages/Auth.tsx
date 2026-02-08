import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import ahsanLogo from '@/assets/ahsan-gpt-logo.png';
import { useState } from 'react';

const Auth = () => {
  const { user, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // WHY: Terms acceptance is legally required for GDPR, CCPA, and liability protection
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background dark">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Welcome to Ahsan GPT!');
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
      console.error('Sign in error:', error);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
      setIsForgotPassword(false);
      setEmail('');
    } catch (error: any) {
      const message = error?.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : 'Failed to send reset email';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    // WHY: Enforce terms acceptance before account creation (legal requirement)
    if (isSignUp && !termsAccepted) {
      toast.error('You must accept the Terms and Privacy Policy');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        // WHY: Inform user about verification email immediately
        toast.success('Account created! Please check your email to verify.');
      } else {
        await signInWithEmail(email, password);
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      const message = error?.code === 'auth/email-already-in-use' 
        ? 'Email already in use' 
        : error?.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : 'Authentication failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot Password Screen
  if (isForgotPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background dark px-4">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="mb-8 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border glow-primary overflow-hidden"
            >
              <img src={ahsanLogo} alt="Ahsan GPT" className="h-14 w-14 object-contain" />
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
            <p className="mt-1 text-muted-foreground">Enter your email to receive a reset link</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Send Reset Link'}
              </button>
            </form>

            <button
              onClick={() => setIsForgotPassword(false)}
              className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground"
            >
              Back to sign in
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background dark px-4">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border glow-primary overflow-hidden"
          >
            <img src={ahsanLogo} alt="Ahsan GPT" className="h-14 w-14 object-contain" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground">Ahsan GPT</h1>
          <p className="mt-1 text-muted-foreground">Your intelligent AI assistant</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            {isSignUp ? 'Create an account' : 'Sign in to continue'}
          </h2>

          <form onSubmit={handleEmailAuth} className="space-y-4 mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />

            {/* WHY: Terms acceptance checkbox - legally required before account creation */}
            {isSignUp && (
              <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border bg-secondary accent-primary"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {!isSignUp && (
            <button
              onClick={() => setIsForgotPassword(true)}
              className="w-full text-xs text-primary hover:underline mb-2"
            >
              Forgot password?
            </button>
          )}

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setTermsAccepted(false);
            }}
            className="w-full text-xs text-muted-foreground hover:text-foreground mb-4"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-secondary py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/80 hover:border-primary/40"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Powered by Ahsan GPT — AI-driven intelligence
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
