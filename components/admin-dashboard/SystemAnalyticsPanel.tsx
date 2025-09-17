import React, { useState, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import CorridorAnalytics from './analytics-tabs/CorridorAnalytics';
import LaneAnalytics from './analytics-tabs/LaneAnalytics';
import DataAnalytics from './analytics-tabs/DataAnalytics';

type AnalyticsTab = 'corridors' | 'lanes' | 'analytics';

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
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

    const renderContent = () => {
        switch (activeTab) {
            case 'lanes':
                return <LaneAnalytics />;
            case 'analytics':
                return <DataAnalytics />;
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
                <nav className="hidden lg:flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                    <NavButton label={t('corridors_tab')} isActive={activeTab === 'corridors'} onClick={() => setActiveTab('corridors')} />
                    <NavButton label={t('lanes_tab')} isActive={activeTab === 'lanes'} onClick={() => setActiveTab('lanes')} />
                    <NavButton label={t('analytics_tab')} isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                </nav>
            }
        >
            <div className="mt-4 h-full">
                {renderContent()}
            </div>
        </PanelCard>
    );
};

export default SystemAnalyticsPanel;