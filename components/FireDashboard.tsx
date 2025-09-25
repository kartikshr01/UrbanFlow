import React, { useContext } from 'react';
import FireHeader from './fire-dashboard/FireHeader';
import RequestCorridorPanel from './dashboard/RequestCorridorPanel';
import FireStatusPanel from './fire-dashboard/FireStatusPanel';
import BrandHeader from './shared/BrandHeader';
import { LanguageContext } from '../contexts/LanguageContext';

interface FireDashboardProps {
  onLogout: () => void;
}

const FireDashboard: React.FC<FireDashboardProps> = ({ onLogout }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      <BrandHeader title={t('login_title')} subtitle={t('login_system_name')} />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <FireHeader onLogout={onLogout} />
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <RequestCorridorPanel />
        </div>
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <FireStatusPanel />
        </div>
      </div>
    </div>
  );
};

export default FireDashboard;