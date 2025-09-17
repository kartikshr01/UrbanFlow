
import React, { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';

const KPI: React.FC<{ title: string; value: string; change?: string; isPositive?: boolean }> = ({ title, value, change, isPositive }) => (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-500">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            {change && (
                <p className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                </p>
            )}
        </div>
    </div>
);

const agencyColors = {
    ambulance: 'bg-indigo-500',
    police: 'bg-blue-500',
    fire: 'bg-red-500',
};

const weeklyData = [
    { day: 'day_mon', ambulance: 5, police: 3, fire: 1 },
    { day: 'day_tue', ambulance: 7, police: 4, fire: 2 },
    { day: 'day_wed', ambulance: 6, police: 5, fire: 1 },
    { day: 'day_thu', ambulance: 8, police: 6, fire: 3 },
    { day: 'day_fri', ambulance: 11, police: 8, fire: 4 },
    { day: 'day_sat', ambulance: 9, police: 7, fire: 2 },
    { day: 'day_sun', ambulance: 4, police: 3, fire: 1 },
];

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-sm ${color}`}></div>
        <span className="text-xs text-slate-600">{label}</span>
    </div>
);

const CorridorAnalytics: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const maxDailyTotal = Math.max(...weeklyData.map(d => d.ambulance + d.police + d.fire)) + 5; // Add padding

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPI title={t('kpi_activations_24h')} value="34" />
            <KPI title={t('kpi_avg_clearance_time')} value={`4.2 ${t('common_minutes').substring(0,3)}`} change={`-0.2 ${t('common_minutes').substring(0,3)}`} isPositive={true} />
            <KPI title={t('kpi_avg_activation_duration')} value={`6.8 ${t('common_minutes').substring(0,3)}`} />
            <KPI title={t('kpi_peak_activation_hour')} value="6 PM - 8 PM" />
        </div>
        <div>
            <h3 className="text-md font-semibold text-slate-700 mb-3">{t('weekly_activations_title')}</h3>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-end h-48 space-x-2">
                    {weeklyData.map(data => {
                        const total = data.ambulance + data.police + data.fire;
                        const totalHeight = total > 0 ? (total / maxDailyTotal) * 100 : 0;
                        const ambulanceHeight = total > 0 ? (data.ambulance / total) * 100 : 0;
                        const policeHeight = total > 0 ? (data.police / total) * 100 : 0;
                        const fireHeight = total > 0 ? (data.fire / total) * 100 : 0;

                        return (
                            <div key={data.day} className="flex-1 h-full flex flex-col-reverse items-center group relative">
                                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded-md pointer-events-none">
                                    {t('total_label')}: {total}
                                </div>
                                <div 
                                    className="w-full flex flex-col rounded-t-sm overflow-hidden"
                                    style={{ height: `${totalHeight}%` }}
                                >
                                    <div className={`${agencyColors.ambulance} transition-all duration-300`} style={{ height: `${ambulanceHeight}%` }}></div>
                                    <div className={`${agencyColors.police} transition-all duration-300`} style={{ height: `${policeHeight}%` }}></div>
                                    <div className={`${agencyColors.fire} transition-all duration-300`} style={{ height: `${fireHeight}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between items-center mt-1 border-t border-slate-200 pt-1">
                    {weeklyData.map(data => (
                        <div key={data.day} className="flex-1 text-center text-sm font-medium text-slate-500">{t(data.day as any)}</div>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-4 mt-4 pt-3 border-t border-slate-200">
                    <LegendItem color={agencyColors.ambulance} label={t('legend_ambulance')} />
                    <LegendItem color={agencyColors.police} label={t('legend_police')} />
                    <LegendItem color={agencyColors.fire} label={t('legend_fire')} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default CorridorAnalytics;
