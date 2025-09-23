import React, { useState, useContext, useRef, useLayoutEffect, useMemo } from 'react';
import TrafficPoliceHeader from './traffic-police-dashboard/TrafficPoliceHeader';
import QuickStatsPanel from './traffic-police-dashboard/QuickStatsPanel';
import RecentActivitiesPanel from './traffic-police-dashboard/RecentActivitiesPanel';
import SignalControlPage from './traffic-police-dashboard/SignalControlPage';
import LaneManagementPage from './traffic-police-dashboard/LaneManagementPage';
import ReportsPage from './traffic-police-dashboard/ReportsPage';
import BrandHeader from './shared/BrandHeader';
import { LanguageContext } from '../contexts/LanguageContext';
import { LayoutDashboardIcon } from './icons/LayoutDashboardIcon';
import { TrafficLightIcon } from './icons/TrafficLightIcon';
import { RoadsIcon } from './icons/RoadsIcon';
import { DocumentReportIcon } from './icons/DocumentReportIcon';


interface TrafficPoliceDashboardProps {
  onLogout: () => void;
}

export type TrafficPoliceTab = 'overview' | 'signal_control' | 'lane_management' | 'reports';

const TrafficPoliceDashboard: React.FC<TrafficPoliceDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TrafficPoliceTab>('overview');
  const { t } = useContext(LanguageContext);
  const [sliderStyle, setSliderStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = useMemo(() => [
    { id: 'overview', label: t('overview_tab'), icon: <LayoutDashboardIcon className="h-4 w-4" /> },
    { id: 'signal_control', label: t('signal_control_tab'), icon: <TrafficLightIcon state="go" className="h-4 w-4" /> },
    { id: 'lane_management', label: t('lane_management_tab'), icon: <RoadsIcon className="h-4 w-4" /> },
    { id: 'reports', label: t('reports_tab'), icon: <DocumentReportIcon className="h-4 w-4" /> },
  ], [t]);

  useLayoutEffect(() => {
    const updateSlider = () => {
        const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
        const activeTabElem = tabsRef.current[activeTabIndex];

        if (activeTabElem) {
            const { offsetLeft, offsetWidth } = activeTabElem;
            setSliderStyle({
                transform: `translateX(${offsetLeft}px)`,
                width: `${offsetWidth}px`,
            });
        }
    }
    
    updateSlider();

    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeTab, tabs]);


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
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      <BrandHeader />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <TrafficPoliceHeader onLogout={onLogout} />
      </div>

       <nav className="relative w-full bg-white p-1 rounded-xl border border-slate-200/80 shadow-md shadow-slate-200/60 flex items-center justify-between gap-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div 
              className="absolute top-1 left-1 h-[calc(100%-0.5rem)] rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all duration-300 ease-in-out" 
              style={sliderStyle}
          ></div>
          {tabs.map((tab, index) => (
              <button
                  key={tab.id}
                  ref={el => { tabsRef.current[index] = el; }}
                  onClick={() => setActiveTab(tab.id as TrafficPoliceTab)}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
              </button>
          ))}
      </nav>

      <div className="flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};

export default TrafficPoliceDashboard;