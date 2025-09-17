
import React, { useContext } from 'react';
import { StopwatchIcon } from '../../icons/StopwatchIcon';
import { LineChartIcon } from '../../icons/LineChartIcon';
import { RoadsIcon } from '../../icons/RoadsIcon';
import { LanguageContext } from '../../../contexts/LanguageContext';

const AnalyticsBlock: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3 h-full flex flex-col">
        <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-md font-semibold text-slate-700">{title}</h3>
        </div>
        <div className="flex-grow">{children}</div>
    </div>
);

const ChartBar: React.FC<{ label: string; value: number; maxValue: number }> = ({ label, value, maxValue }) => (
    <div className="flex items-center gap-3">
        <div className="w-24 text-sm text-slate-600 text-right">{label}</div>
        <div className="flex-1 bg-slate-200 rounded-full h-4">
            <div 
                className="bg-sky-500 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${(value / maxValue) * 100}%` }}
            ></div>
        </div>
        <div className="w-16 text-sm font-bold text-slate-800 text-left">{value.toLocaleString()}</div>
    </div>
);

const RouteListItem: React.FC<{ route: string; activations: number }> = ({ route, activations }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700 font-medium">{route}</span>
            <span className="font-bold text-indigo-600">{activations} {t('activations_label')}</span>
        </div>
    );
};

const DataAnalytics: React.FC = () => {
  const { t } = useContext(LanguageContext);
  
  const peakTrafficData = [
    { label: t('time_slot_1'), value: 4250 },
    { label: t('time_slot_2'), value: 3100 },
    { label: t('time_slot_3'), value: 2800 },
    { label: t('time_slot_4'), value: 3300 },
    { label: t('time_slot_5'), value: 5150 },
    { label: t('time_slot_6'), value: 4800 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in h-full">
        <AnalyticsBlock title={t('peak_traffic_volume_junction')} icon={<StopwatchIcon className="h-5 w-5 text-slate-500"/>}>
            <div className="space-y-3 pt-2">
                {peakTrafficData.map(data => (
                    <ChartBar key={data.label} label={data.label} value={data.value} maxValue={6000} />
                ))}
            </div>
        </AnalyticsBlock>
        <AnalyticsBlock title={t('corridor_usage_analysis_title')} icon={<LineChartIcon className="h-5 w-5 text-slate-500"/>}>
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-slate-800">182</p>
                        <p className="text-sm text-slate-500">{t('total_requests')}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-slate-800">7.2<span className="text-lg">{t('common_minutes').substring(0,3)}</span></p>
                        <p className="text-sm text-slate-500">{t('avg_duration')}</p>
                    </div>
                </div>
                <div className="flex-grow mt-4 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                        <RoadsIcon className="h-4 w-4 text-slate-500" />
                        <h4 className="font-semibold text-sm text-slate-600">{t('most_frequent_routes')}</h4>
                    </div>
                    <div className="space-y-2">
                        <RouteListItem route={t('route_cc_mbh')} activations={41} />
                        <RouteListItem route={t('route_hp_dg')} activations={29} />
                        <RouteListItem route={t('route_sc_madri')} activations={22} />
                    </div>
                </div>
            </div>
        </AnalyticsBlock>
    </div>
  );
};

export default DataAnalytics;
