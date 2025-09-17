import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { JunctionIcon } from '../icons/JunctionIcon';
import { StopwatchIcon } from '../icons/StopwatchIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { SettingsIcon } from '../icons/SettingsIcon';
import { SolidCircleIcon } from '../icons/SolidCircleIcon';

const StatItem: React.FC<{ icon: React.ReactNode; value: string; label: string; iconBg: string; iconColor: string; }> = ({ icon, value, label, iconBg, iconColor }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-50/70 rounded-lg border border-slate-200/80">
        <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${iconBg} ${iconColor} shadow-inner`}>
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-[#1d293d]">{value}</p>
            <p className="text-sm text-[#7a8596]">{label}</p>
        </div>
    </div>
);

const QuickStatsPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <PanelCard title={t('quick_stats_panel_title')} icon={<ChartBarIcon className="h-5 w-5 text-indigo-500" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-full">
            <StatItem 
                icon={<JunctionIcon className="h-6 w-6" />}
                value="18"
                label={t('stat_active_junctions')}
                iconBg="bg-indigo-100"
                iconColor="text-indigo-500"
            />
            <StatItem 
                icon={<SettingsIcon className="h-6 w-6" />}
                value="4"
                label={t('stat_manual_overrides')}
                iconBg="bg-orange-100"
                iconColor="text-orange-500"
            />
            <StatItem 
                icon={<SolidCircleIcon className="h-6 w-6" />}
                value="2"
                label={t('stat_emergency_corridors')}
                iconBg="bg-red-100"
                iconColor="text-red-500"
            />
            <StatItem 
                icon={<StopwatchIcon className="h-6 w-6" />}
                value="3.2s"
                label={t('stat_avg_response_time')}
                iconBg="bg-green-100"
                iconColor="text-green-600"
            />
        </div>
    </PanelCard>
  );
};

export default QuickStatsPanel;