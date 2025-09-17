import React from 'react';
import EmergencyCorridorPanel from './EmergencyCorridorPanel';
import JunctionControlPanel from './JunctionControlPanel';
import ManualSignalPanel from './ManualSignalPanel';

const SignalControlPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <EmergencyCorridorPanel />
      </div>
      <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <JunctionControlPanel />
      </div>
      <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <ManualSignalPanel />
      </div>
    </div>
  );
};

export default SignalControlPage;