import React from 'react';
import GenerateReportPanel from './GenerateReportPanel';
import RecentReportsPanel from './RecentReportsPanel';

const ReportsPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <GenerateReportPanel />
      </div>
      <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <RecentReportsPanel />
      </div>
    </div>
  );
};

export default ReportsPage;