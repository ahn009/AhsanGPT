import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Docs from "./pages/Docs";
import { Loader2 } from "lucide-react";

console.log('App.tsx loaded');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// WHY: ProtectedRoute enforces both authentication AND email verification
// This prevents unverified users from accessing the app (security + spam prevention)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isEmailVerified } = useAuth();
  
  console.log('ProtectedRoute - loading:', loading, 'user:', user, 'verified:', isEmailVerified);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background dark">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/auth" replace />;

  // WHY: Block unverified email/password users (Google OAuth users are auto-verified)
  if (!isEmailVerified) return <Navigate to="/verify-email" replace />;

  return <>{children}</>;
}

const App = () => {
  console.log('App rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* WHY: Email verification route - required before accessing protected routes */}
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
