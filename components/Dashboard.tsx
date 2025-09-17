import React from 'react';
import Header from './dashboard/Header';
import RequestCorridorPanel from './dashboard/RequestCorridorPanel';
import StatusPanel from './dashboard/StatusPanel';
import BrandHeader from './shared/BrandHeader';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto p-4 lg:p-6 flex flex-col gap-6 animate-fade-in">
      <BrandHeader />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <Header onLogout={onLogout} />
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <RequestCorridorPanel />
        </div>
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <StatusPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
