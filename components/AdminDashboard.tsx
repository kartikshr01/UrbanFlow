import React, { useState, useContext, useMemo, useRef, useEffect } from 'react';
import AdminHeader from './admin-dashboard/AdminHeader';
import SystemOverviewPanel from './admin-dashboard/SystemOverviewPanel';
import CorridorAnalytics from './admin-dashboard/analytics-tabs/CorridorAnalytics';
import LaneAnalytics from './admin-dashboard/analytics-tabs/LaneAnalytics';
import DataAnalytics from './admin-dashboard/analytics-tabs/DataAnalytics';
import BrandHeader from './shared/BrandHeader';
import { LanguageContext } from '../contexts/LanguageContext';
import { LayoutDashboardIcon } from './icons/LayoutDashboardIcon';
import { RoadSirenIcon } from './icons/RoadSirenIcon';
import { RoadsIcon } from './icons/RoadsIcon';
import { PieChartIcon } from './icons/PieChartIcon';
import PanelCard from './shared/PanelCard';

interface AdminDashboardProps {
  onLogout: () => void;
}

export type AdminTab = 'overview' | 'corridors' | 'lanes' | 'analytics';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { t } = useContext(LanguageContext);
  const [sliderStyle, setSliderStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = useMemo(() => [
    { id: 'overview', label: t('overview_tab'), icon: <LayoutDashboardIcon className="h-4 w-4" /> },
    { id: 'corridors', label: t('corridors_tab'), icon: <RoadSirenIcon className="h-4 w-4" /> },
    { id: 'lanes', label: t('lanes_tab'), icon: <RoadsIcon className="h-4 w-4" /> },
    { id: 'analytics', label: t('analytics_tab'), icon: <PieChartIcon className="h-4 w-4" /> },
  ], [t]);
  
  useEffect(() => {
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
    
    updateSlider(); // initial positioning

    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeTab, tabs]);

  const renderContent = () => {
    switch (activeTab) {
        case 'corridors':
            return (
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                     <PanelCard title={t('corridors_tab')} icon={<RoadSirenIcon className="h-5 w-5 text-indigo-500"/>}>
                        <CorridorAnalytics />
                    </PanelCard>
                </div>
            );
        case 'lanes':
            return (
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <PanelCard title={t('lanes_tab')} icon={<RoadsIcon className="h-5 w-5 text-indigo-500"/>}>
                        <LaneAnalytics />
                    </PanelCard>
                </div>
            );
        case 'analytics':
             return (
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <PanelCard title={t('analytics_tab')} icon={<PieChartIcon className="h-5 w-5 text-indigo-500"/>}>
                        <DataAnalytics />
                    </PanelCard>
                </div>
            );
        case 'overview':
        default:
            return (
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <SystemOverviewPanel />
                    </div>
                </div>
            );
    }
  };

  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      <BrandHeader />
      <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
        <AdminHeader onLogout={onLogout} />
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
                  onClick={() => setActiveTab(tab.id as AdminTab)}
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

export default AdminDashboard;