import React from 'react';
import LaneDividerControlPanel from './LaneDividerControlPanel';

const LaneManagementPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <LaneDividerControlPanel />
      </div>
    </div>
  );
};

export default LaneManagementPage;
