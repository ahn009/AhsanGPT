import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * AuthCallback Component
 * 
 * Handles OAuth redirect from Google after authentication.
 * 
 * WHY THIS IS NEEDED:
 * - Google OAuth redirects to a URL like: https://yourdomain.com/auth/callback
 * - Without proper SPA routing config, Vercel returns 404 for this route
 * - This component processes the OAuth response and redirects to home
 */
const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase automatically handles the OAuth redirect
    // We just need to wait briefly and redirect to home
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-background dark">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-foreground">Signing you in…</p>
      </div>
    </div>
  );
};

export default AuthCallback;
