import React, { useState, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import CorridorAnalytics from './analytics-tabs/CorridorAnalytics';
import LaneAnalytics from './analytics-tabs/LaneAnalytics';
import DataAnalytics from './analytics-tabs/DataAnalytics';
import PerformanceAnalytics from './analytics-tabs/PerformanceAnalytics';

type AnalyticsTab = 'corridors' | 'lanes' | 'analytics' | 'performance';

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

const SystemAnalyticsPanel: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [activeTab, setActiveTab] = useState<AnalyticsTab>('corridors');

    const tabs = [
        { id: 'corridors', label: t('corridors_tab') },
        { id: 'lanes', label: t('lanes_tab') },
        { id: 'analytics', label: t('analytics_tab') },
        { id: 'performance', label: 'Performance' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'lanes':
                return <LaneAnalytics />;
            case 'analytics':
                return <DataAnalytics />;
            case 'performance':
                return <PerformanceAnalytics />;
            case 'corridors':
            default:
                return <CorridorAnalytics />;
        }
    };

    return (
        <PanelCard 
            title={t('system_analytics_panel_title')} 
            icon={<ChartBarIcon className="h-5 w-5 text-indigo-500" />}
            badge={
                 <div className="w-full lg:w-auto">
                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                        {tabs.map(tab => (
                            <NavButton key={tab.id} label={tab.label} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id as AnalyticsTab)} />
                        ))}
                    </nav>
                 </div>
            }
        >
            {/* Mobile Nav */}
            <div className="lg:hidden w-full -mt-2 mb-4">
                <label htmlFor="admin-analytics-tabs" className="sr-only">Select a tab</label>
                <select
                    id="admin-analytics-tabs"
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as AnalyticsTab)}
                    className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-base font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all"
                >
                    {tabs.map(tab => (
                        <option key={tab.id} value={tab.id}>{tab.label}</option>
                    ))}
                </select>
            </div>
            <div className="h-full">
                {renderContent()}
            </div>
        </PanelCard>
    );
};

export default SystemAnalyticsPanel;