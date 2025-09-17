import React, { useState } from 'react';
import TrafficPoliceHeader from './traffic-police-dashboard/TrafficPoliceHeader';
import QuickStatsPanel from './traffic-police-dashboard/QuickStatsPanel';
import RecentActivitiesPanel from './traffic-police-dashboard/RecentActivitiesPanel';
import SignalControlPage from './traffic-police-dashboard/SignalControlPage';
import LaneManagementPage from './traffic-police-dashboard/LaneManagementPage';
import ReportsPage from './traffic-police-dashboard/ReportsPage';
import BrandHeader from './shared/BrandHeader';

interface TrafficPoliceDashboardProps {
  onLogout: () => void;
}

export type TrafficPoliceTab = 'overview' | 'signal_control' | 'lane_management' | 'reports';

const TrafficPoliceDashboard: React.FC<TrafficPoliceDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TrafficPoliceTab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'signal_control':
        return <SignalControlPage />;
      case 'lane_management':
        return <LaneManagementPage />;
      case 'reports':
        return <ReportsPage />;
      case 'overview':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <QuickStatsPanel />
            </div>
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <RecentActivitiesPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto p-4 lg:p-6 flex flex-col gap-6 animate-fade-in">
      <BrandHeader />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <TrafficPoliceHeader onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {renderContent()}
    </div>
  );
};

export default TrafficPoliceDashboard;