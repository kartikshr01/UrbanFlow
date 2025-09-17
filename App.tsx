import React, { useState } from 'react';
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

  const handleLoginSuccess = (role: AgencyRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const renderDashboard = () => {
    if (!isLoggedIn || !userRole) {
      return <LoginCard onLoginSuccess={handleLoginSuccess} />;
    }

    switch (userRole) {
      case AgencyRole.AMBULANCE:
        return <Dashboard onLogout={handleLogout} />;
      case AgencyRole.FIRE_DEPT:
        return <FireDashboard onLogout={handleLogout} />;
      case AgencyRole.POLICE_DEPT:
        return <PoliceDashboard onLogout={handleLogout} />;
      case AgencyRole.TRAFFIC_POLICE:
        return <TrafficPoliceDashboard onLogout={handleLogout} />;
      case AgencyRole.ADMIN:
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Login Successful</h1>
            <p className="text-slate-500 mt-2">Dashboard for '{userRole}' is not yet available.</p>
             <button onClick={handleLogout} className="mt-4 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200/60 rounded-lg hover:bg-slate-300 transition-colors">
                Logout
            </button>
          </div>
        );
    }
  };

  return (
    <LanguageProvider>
      <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden font-inter text-slate-800 animated-gradient-bg transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/google/aistudio/main/assets/app-assets/ems-grid-bg.svg')] bg-repeat opacity-10"></div>
        {renderDashboard()}
      </main>
    </LanguageProvider>
  );
};

export default App;