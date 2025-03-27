
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Parse mode from URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get('mode');
    
    if (modeParam === 'signin' || modeParam === 'signup') {
      setMode(modeParam);
    }
  }, [location]);

  const handleAuth = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mode === 'signup') {
        // In a real application, this would be a signup API call
        console.log('Signing up with:', { email, password, name });
        
        // Simulate a successful signup and email verification sent
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
        
        // For the demo, navigate to the signin page
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('mode', 'signin');
        navigate({ search: searchParams.toString() });
      } else {
        // In a real application, this would be a signin API call
        console.log('Signing in with:', { email, password });
        
        // Simulate a successful login for the demo
        localStorage.setItem('isAuthenticated', 'true');
        
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Authentication error",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="w-full max-w-md px-4">
          <AuthForm 
            mode={mode} 
            onSubmit={handleAuth} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
};

export default Auth;
