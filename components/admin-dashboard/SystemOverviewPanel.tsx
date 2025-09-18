import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';
import { JunctionIcon } from '../icons/JunctionIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { StopwatchIcon } from '../icons/StopwatchIcon';
import { LayoutDashboardIcon } from '../icons/LayoutDashboardIcon';
import { ShieldIcon } from '../icons/ShieldIcon';
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

const SystemOverviewPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <PanelCard title={t('system_overview_panel_title')} icon={<LayoutDashboardIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-full">
            <StatItem 
                icon={<JunctionIcon className="h-6 w-6" />}
                value="4"
                label={t('stat_total_junctions')}
                iconBg="bg-indigo-100"
                iconColor="text-indigo-500"
            />
            <StatItem 
                icon={<UsersIcon className="h-6 w-6" />}
                value="28"
                label={t('stat_active_officers')}
                iconBg="bg-sky-100"
                iconColor="text-sky-500"
            />
            <StatItem 
                icon={<ShieldIcon className="h-6 w-6" />}
                value="47"
                label={t('stat_emergency_vehicles')}
                iconBg="bg-teal-100"
                iconColor="text-teal-500"
            />
            <StatItem 
                icon={<StopwatchIcon className="h-6 w-6" />}
                value="2.8m"
                label={t('stat_avg_response_time')}
                iconBg="bg-green-100"
                iconColor="text-green-600"
            />
            <StatItem 
                icon={<SolidCircleIcon className="h-6 w-6" />}
                value="8"
                label={t('stat_active_corridors')}
                iconBg="bg-red-100"
                iconColor="text-red-500"
            />
        </div>
    </PanelCard>
  );
};

export default SystemOverviewPanel;