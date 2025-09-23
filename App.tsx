import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const roleToPath: { [key in AgencyRole]: string } = {
      [AgencyRole.AMBULANCE]: '/ems',
      [AgencyRole.FIRE_DEPT]: '/fire',
      [AgencyRole.POLICE_DEPT]: '/police',
      [AgencyRole.TRAFFIC_POLICE]: '/traffic-police',
      [AgencyRole.ADMIN]: '/admin',
  };

  const handleLoginSuccess = (role: AgencyRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    const newPath = roleToPath[role];
    navigate(newPath);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };
  
  // FIX: Changed children prop type from JSX.Element to React.ReactNode to resolve TS errors with JSX namespace.
  const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole: AgencyRole; }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (userRole !== requiredRole) {
      const correctPath = roleToPath[userRole!];
      return <Navigate to={correctPath} replace />;
    }

    return children;
  };

  // FIX: Changed children prop type from JSX.Element to React.ReactNode to resolve TS errors with JSX namespace.
  const LoginRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoggedIn && userRole) {
        const correctPath = roleToPath[userRole];
        return <Navigate to={correctPath} replace />;
    }
    return children;
  };

  const HomeRedirect = () => {
    if (isLoggedIn && userRole) {
        // FIX: Corrected typo from `roleToToPath` to `roleToPath`.
        const correctPath = roleToPath[userRole];
        return <Navigate to={correctPath} replace />;
    }
    return <Navigate to="/login" replace />;
  };


  return (
    <LanguageProvider>
      <main className={`relative min-h-screen w-full flex justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-inter text-slate-800 bg-slate-50 transition-colors duration-300 ${isLoggedIn ? 'items-start' : 'items-center'}`}>
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/google/aistudio/main/assets/app-assets/ems-grid-bg.svg')] bg-repeat opacity-10"></div>
        <Routes>
          <Route path="/login" element={
              <LoginRoute>
                  <LoginCard onLoginSuccess={handleLoginSuccess} />
              </LoginRoute>
          } />
          <Route path="/ems" element={
              <ProtectedRoute requiredRole={AgencyRole.AMBULANCE}>
                  <Dashboard onLogout={handleLogout} />
              </ProtectedRoute>
          }/>
          <Route path="/fire" element={
              <ProtectedRoute requiredRole={AgencyRole.FIRE_DEPT}>
                  <FireDashboard onLogout={handleLogout} />
              </ProtectedRoute>
          }/>
          <Route path="/police" element={
              <ProtectedRoute requiredRole={AgencyRole.POLICE_DEPT}>
                  <PoliceDashboard onLogout={handleLogout} />
              </ProtectedRoute>
          }/>
          <Route path="/traffic-police" element={
              <ProtectedRoute requiredRole={AgencyRole.TRAFFIC_POLICE}>
                  <TrafficPoliceDashboard onLogout={handleLogout} />
              </ProtectedRoute>
          }/>
           <Route path="/admin" element={
              <ProtectedRoute requiredRole={AgencyRole.ADMIN}>
                  <AdminDashboard onLogout={handleLogout} />
              </ProtectedRoute>
          }/>
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </main>
    </LanguageProvider>
  );
};

export default App;
