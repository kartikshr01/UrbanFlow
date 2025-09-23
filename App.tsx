import React, { useState, useEffect } from 'react';
import LoginCard from './components/LoginCard';
import Dashboard from './components/Dashboard';
import FireDashboard from './components/FireDashboard';
import PoliceDashboard from './components/PoliceDashboard';
import TrafficPoliceDashboard from './components/TrafficPoliceDashboard';
import AdminDashboard from './components/AdminDashboard';
import { AgencyRole } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<AgencyRole | null>(null);
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/login');

  useEffect(() => {
    const onHashChange = () => {
      setPath(window.location.hash.slice(1) || '/login');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  
  const roleToPath: { [key in AgencyRole]?: string } = {
      [AgencyRole.AMBULANCE]: '/ems',
      [AgencyRole.FIRE_DEPT]: '/fire',
      [AgencyRole.POLICE_DEPT]: '/police',
      [AgencyRole.TRAFFIC_POLICE]: '/traffic-police',
      [AgencyRole.ADMIN]: '/admin',
  };

  const handleLoginSuccess = (role: AgencyRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    const newPath = roleToPath[role] || '/';
    window.location.hash = newPath;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.hash = '/login';
  };
  
  // Effect for redirecting if not logged in
  useEffect(() => {
    const protectedRoutes = Object.values(roleToPath);
    if (!isLoggedIn && protectedRoutes.includes(path)) {
      window.location.hash = '/login';
    }
     if (isLoggedIn && userRole && roleToPath[userRole] !== path) {
       // If logged in user tries to access another dashboard, redirect them to their own
       const correctPath = roleToPath[userRole];
       if (correctPath) {
         window.location.hash = correctPath;
       }
    }
  }, [path, isLoggedIn, userRole]);


  const renderContent = () => {
    // If not logged in, always show login card.
    if (!isLoggedIn) {
        return <LoginCard onLoginSuccess={handleLoginSuccess} />;
    }

    switch (path) {
      case '/ems':
        return userRole === AgencyRole.AMBULANCE ? <Dashboard onLogout={handleLogout} /> : null;
      case '/fire':
        return userRole === AgencyRole.FIRE_DEPT ? <FireDashboard onLogout={handleLogout} /> : null;
      case '/police':
        return userRole === AgencyRole.POLICE_DEPT ? <PoliceDashboard onLogout={handleLogout} /> : null;
      case '/traffic-police':
        return userRole === AgencyRole.TRAFFIC_POLICE ? <TrafficPoliceDashboard onLogout={handleLogout} /> : null;
      case '/admin':
        return userRole === AgencyRole.ADMIN ? <AdminDashboard onLogout={handleLogout} /> : null;
      default:
         const correctPath = userRole ? roleToPath[userRole] : '/login';
         window.location.hash = correctPath || '/login';
         return null;
    }
  };

  return (
    <LanguageProvider>
      <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-inter text-slate-800 bg-slate-50 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/google/aistudio/main/assets/app-assets/ems-grid-bg.svg')] bg-repeat opacity-10"></div>
        {renderContent()}
      </main>
    </LanguageProvider>
  );
};

export default App;