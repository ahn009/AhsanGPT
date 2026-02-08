import { motion } from 'framer-motion';
import { Mail, Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import ahsanLogo from '@/assets/ahsan-gpt-logo.png';

// WHY: Email verification screen prevents unverified users from accessing the app
// This is critical for security, spam prevention, and ensuring valid user contact info
const VerifyEmail = () => {
  const { user, loading, isEmailVerified, resendVerificationEmail, signOut } = useAuth();
  const [isResending, setIsResending] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background dark">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) return <Navigate to="/auth" replace />;

  // Redirect if already verified
  if (isEmailVerified) return <Navigate to="/" replace />;

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail();
      toast.success('Verification email sent! Check your inbox.');
    } catch (error) {
      toast.error('Failed to send email. Try again later.');
    } finally {
      setIsResending(false);
    }
  };

  const handleRefresh = () => {
    // Reload user to check verification status
    window.location.reload();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

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
          <h1 className="text-3xl font-bold text-foreground">Verify Your Email</h1>
          <p className="mt-1 text-muted-foreground text-center">
            We sent a verification link to
          </p>
          <p className="text-sm font-medium text-foreground">{user?.email}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Check your inbox
              </h2>
              <p className="text-sm text-muted-foreground">
                Click the verification link in the email to activate your account.
              </p>
            </div>

            <div className="w-full space-y-3 pt-4">
              <button
                onClick={handleRefresh}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4" />
                I've verified my email
              </button>

              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full rounded-xl border border-border bg-secondary py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/80 disabled:opacity-50"
              >
                {isResending ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  'Resend verification email'
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-border w-full">
              <p className="text-xs text-muted-foreground mb-3">
                Didn't receive the email? Check your spam folder or try resending.
              </p>
              <button
                onClick={handleSignOut}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Powered by Ahsan GPT — AI-driven intelligence
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
