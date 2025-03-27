
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // If not authenticated, redirect to login
      if (!authStatus) {
        navigate('/auth?mode=signin');
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated && !isLoading) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} onLogout={handleLogout} />
      <Dashboard isLoading={isLoading} />
    </div>
  );
};

export default DashboardPage;
