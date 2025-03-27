
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (email: string, password: string, name?: string) => void;
  isLoading: boolean;
}

const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
    }
    
    if (!password) {
      return toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
    }
    
    if (mode === 'signup' && !name) {
      return toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
    }
    
    onSubmit(email, password, mode === 'signup' ? name : undefined);
  };

  return (
    <div className="w-full max-w-md px-8 py-10 bg-white rounded-xl shadow-sm border border-border/50 animate-scale-in">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'signup' && (
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2.5 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2.5 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="you@example.com"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <Mail className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2.5 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="•••••••••"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
              <button
                type="button"
                className="focus-ring"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus-ring disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white/100 rounded-full animate-spin mr-2"></div>
              <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
            </div>
          ) : (
            <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
          )}
        </button>
      </form>

      {mode === 'signin' && (
        <div className="mt-4 text-center">
          <a href="#reset-password" className="text-sm text-primary hover:text-primary/80 focus-ring">
            Forgot your password?
          </a>
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <a
            href={mode === 'signin' ? '?mode=signup' : '?mode=signin'}
            className="text-primary hover:text-primary/80 font-medium focus-ring"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
