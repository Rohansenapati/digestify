
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header = ({ isAuthenticated = false, onLogout = () => {} }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container px-6 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            DigestSpace
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "link-underline focus-ring font-medium",
              location.pathname === "/" ? "text-primary" : "text-foreground/70 hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className={cn(
              "link-underline focus-ring font-medium",
              location.pathname === "/features" ? "text-primary" : "text-foreground/70 hover:text-foreground"
            )}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "link-underline focus-ring font-medium",
              location.pathname === "/about" ? "text-primary" : "text-foreground/70 hover:text-foreground"
            )}
          >
            About
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={cn(
                  "link-underline focus-ring font-medium",
                  location.pathname.includes("/dashboard") ? "text-primary" : "text-foreground/70 hover:text-foreground"
                )}
              >
                Dashboard
              </Link>
              <div className="relative group">
                <button className="rounded-full w-10 h-10 bg-secondary flex items-center justify-center hover:bg-secondary/80 focus-ring transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right glass rounded-lg shadow-lg overflow-hidden scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent group">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-accent group">
                      <div className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Settings</span>
                      </div>
                    </Link>
                    <button 
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent group"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Log out</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth?mode=signin" className="focus-ring text-foreground/70 hover:text-foreground font-medium">
                Sign in
              </Link>
              <Link to="/auth?mode=signup" className="focus-ring rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 font-medium">
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden focus-ring rounded-md p-2 hover:bg-accent"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/" 
              className={cn(
                "block py-2 font-medium",
                location.pathname === "/" ? "text-primary" : "text-foreground/70"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={cn(
                "block py-2 font-medium",
                location.pathname === "/features" ? "text-primary" : "text-foreground/70"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "block py-2 font-medium",
                location.pathname === "/about" ? "text-primary" : "text-foreground/70"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "block py-2 font-medium",
                    location.pathname.includes("/dashboard") ? "text-primary" : "text-foreground/70"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="block py-2 text-foreground/70 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block py-2 text-foreground/70 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block py-2 text-destructive font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link 
                  to="/auth?mode=signin" 
                  className="focus-ring rounded-lg border border-border px-4 py-2 text-center hover:bg-accent/50 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  to="/auth?mode=signup" 
                  className="focus-ring rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
