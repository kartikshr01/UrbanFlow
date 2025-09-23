

import React, { useState, useContext, useRef, useEffect } from 'react';
import PanelCard from '../shared/PanelCard';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import CorridorAnalytics from './analytics-tabs/CorridorAnalytics';
import LaneAnalytics from './analytics-tabs/LaneAnalytics';
import DataAnalytics from './analytics-tabs/DataAnalytics';
import { RoadSirenIcon } from '../icons/RoadSirenIcon';
import { RoadIcon } from '../icons/RoadIcon';
import { PieChartIcon } from '../icons/PieChartIcon';

type AnalyticsTab = 'corridors' | 'lanes' | 'analytics';

const SystemAnalyticsPanel: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [activeTab, setActiveTab] = useState<AnalyticsTab>('corridors');
    const [sliderStyle, setSliderStyle] = useState({});
    
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const navRef = useRef<HTMLElement>(null);

    const tabs = [
        { id: 'corridors', label: t('corridors_tab'), icon: <RoadSirenIcon className="h-4 w-4" /> },
        { id: 'lanes', label: t('lanes_tab'), icon: <RoadIcon className="h-4 w-4" /> },
        { id: 'analytics', label: t('analytics_tab'), icon: <PieChartIcon className="h-4 w-4" /> },
    ];

    useEffect(() => {
        const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
        const activeTabElem = tabsRef.current[activeTabIndex];

        if (activeTabElem) {
            const { offsetLeft, offsetWidth } = activeTabElem;
            setSliderStyle({
                transform: `translateX(${offsetLeft}px)`,
                width: `${offsetWidth}px`,
            });
        }
    }, [activeTab, t]);

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
                <nav ref={navRef} className="relative w-full sm:w-auto bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center justify-between sm:justify-center gap-1">
                    <div 
                        className="absolute top-1 left-1 h-[calc(100%-0.5rem)] rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out" 
                        style={sliderStyle}
                    ></div>
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            ref={el => { tabsRef.current[index] = el; }}
                            onClick={() => setActiveTab(tab.id as AnalyticsTab)}
                            className={`relative z-10 flex-1 sm:flex-auto flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                            aria-current={activeTab === tab.id ? 'page' : undefined}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            }
        >
            <div className="h-full pt-4 sm:pt-0">
                {renderContent()}
            </div>
        </PanelCard>
    );
};

export default SystemAnalyticsPanel;