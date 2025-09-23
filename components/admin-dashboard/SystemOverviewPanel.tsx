import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';
import { JunctionIcon } from '../icons/JunctionIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { LayoutDashboardIcon } from '../icons/LayoutDashboardIcon';
import { ShieldIcon } from '../icons/ShieldIcon';
import { StopwatchIcon } from '../icons/StopwatchIcon';
import { RoadSirenIcon } from '../icons/RoadSirenIcon';

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; iconBg: string; iconColor: string; }> = ({ icon, value, label, iconBg, iconColor }) => (
    <div className="flex flex-col items-center text-center p-6 bg-slate-50/70 rounded-xl border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-slate-300/80 hover:-translate-y-1">
        <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${iconBg} ${iconColor} shadow-lg mb-4`}>
            {icon}
        </div>
        <p className="text-4xl font-bold text-[#1d293d]">{value}</p>
        <p className="text-base text-[#7a8596] mt-1">{label}</p>
    </div>
);

const SystemOverviewPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <PanelCard title={t('system_overview_panel_title')} icon={<LayoutDashboardIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-lg border-2 border-dashed border-green-200">
                <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </span>
                <p className="text-lg font-semibold text-green-800">All Systems Operational</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                <StatCard 
                    icon={<JunctionIcon className="h-8 w-8" />}
                    value="4"
                    label={t('stat_total_junctions')}
                    iconBg="bg-indigo-100"
                    iconColor="text-indigo-500"
                />
                <StatCard 
                    icon={<UsersIcon className="h-8 w-8" />}
                    value="28"
                    label={t('stat_active_officers')}
                    iconBg="bg-sky-100"
                    iconColor="text-sky-500"
                />
                <StatCard 
                    icon={<ShieldIcon className="h-8 w-8" />}
                    value="47"
                    label={t('stat_emergency_vehicles')}
                    iconBg="bg-teal-100"
                    iconColor="text-teal-500"
                />
                <StatCard 
                    icon={<RoadSirenIcon className="h-8 w-8" />}
                    value="8"
                    label={t('stat_active_corridors')}
                    iconBg="bg-red-100"
                    iconColor="text-red-500"
                />
                <div className="lg:col-span-2">
                    <StatCard 
                        icon={<StopwatchIcon className="h-8 w-8" />}
                        value="99.98%"
                        label={"System Uptime (90d)"}
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                    />
                </div>
            </div>
        </div>
    </PanelCard>
  );
};

export default SystemOverviewPanel;