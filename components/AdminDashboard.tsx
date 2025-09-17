import React from 'react';
import AdminHeader from './admin-dashboard/AdminHeader';
import SystemOverviewPanel from './admin-dashboard/SystemOverviewPanel';
import SystemAnalyticsPanel from './admin-dashboard/SystemAnalyticsPanel';
import BrandHeader from './shared/BrandHeader';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto p-4 lg:p-6 flex flex-col gap-6 animate-fade-in">
      <BrandHeader />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <AdminHeader onLogout={onLogout} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SystemOverviewPanel />
        </div>
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <SystemAnalyticsPanel />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
