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
  
  // FIX: Changed component to accept an 'element' prop instead of 'children' to resolve TypeScript errors where the 'children' prop was not being recognized within React Router's 'element' prop.
  const ProtectedRoute = ({ element, requiredRole }: { element: React.ReactNode; requiredRole: AgencyRole; }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (userRole !== requiredRole) {
      const correctPath = roleToPath[userRole!];
      return <Navigate to={correctPath} replace />;
    }

    return element;
  };

  // FIX: Changed component to accept an 'element' prop instead of 'children' to resolve TypeScript errors where the 'children' prop was not being recognized within React Router's 'element' prop.
  const LoginRoute = ({ element }: { element: React.ReactNode }) => {
    if (isLoggedIn && userRole) {
        const correctPath = roleToPath[userRole];
        return <Navigate to={correctPath} replace />;
    }
    return element;
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
      <main className={`relative min-h-screen w-full flex justify-center p-2 sm:p-4 lg:p-6 overflow-hidden font-inter text-slate-800 bg-slate-50 transition-colors duration-300 ${isLoggedIn ? 'items-start' : 'items-center'}`}>
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/google/aistudio/main/assets/app-assets/ems-grid-bg.svg')] bg-repeat opacity-10"></div>
        <Routes>
          <Route path="/login" element={
              // FIX: Changed to use 'element' prop to pass the component to the route wrapper.
              <LoginRoute element={<LoginCard onLoginSuccess={handleLoginSuccess} />} />
          } />
          <Route path="/ems" element={
              // FIX: Changed to use 'element' prop to pass the component to the route wrapper.
              <ProtectedRoute requiredRole={AgencyRole.AMBULANCE} element={<Dashboard onLogout={handleLogout} />} />
          }/>
          <Route path="/fire" element={
              // FIX: Changed to use 'element' prop to pass the component to the route wrapper.
              <ProtectedRoute requiredRole={AgencyRole.FIRE_DEPT} element={<FireDashboard onLogout={handleLogout} />} />
          }/>
          <Route path="/police" element={
              // FIX: Changed to use 'element' prop to pass the component to the route wrapper.
              <ProtectedRoute requiredRole={AgencyRole.POLICE_DEPT} element={<PoliceDashboard onLogout={handleLogout} />} />
          }/>
          <Route path="/traffic-police" element={
              // FIX: Changed to use 'element' prop to pass the component to the route wrapper.
              <ProtectedRoute requiredRole={AgencyRole.TRAFFIC_POLICE} element={<TrafficPoliceDashboard onLogout={handleLogout} />} />
          }/>
           <Route path="/admin" element={
              // FIX: Changed to use 'element' prop to pass the component to the route wrapper.
              <ProtectedRoute requiredRole={AgencyRole.ADMIN} element={<AdminDashboard onLogout={handleLogout} />} />
          }/>
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </main>
    </LanguageProvider>
  );
};

export default App;