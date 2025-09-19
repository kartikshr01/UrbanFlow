import React from 'react';
import PoliceHeader from './police-dashboard/PoliceHeader';
import RequestCorridorPanel from './dashboard/RequestCorridorPanel';
import PoliceStatusPanel from './police-dashboard/PoliceStatusPanel';
import BrandHeader from './shared/BrandHeader';

interface PoliceDashboardProps {
  onLogout: () => void;
}

const PoliceDashboard: React.FC<PoliceDashboardProps> = ({ onLogout }) => {
  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      <BrandHeader />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <PoliceHeader onLogout={onLogout} />
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <RequestCorridorPanel />
        </div>
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <PoliceStatusPanel />
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;