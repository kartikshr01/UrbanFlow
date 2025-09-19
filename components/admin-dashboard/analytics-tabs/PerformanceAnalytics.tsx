import React, { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';

const KPI: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-500">{title}</p>
        <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
    </div>
);

const LoadBar: React.FC<{ label: string; percentage: number; color: string }> = ({ label, percentage, color }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm text-slate-600">{label}</span>
            <span className="text-sm font-bold text-slate-800">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const getLoadColor = (percentage: number) => {
    if (percentage > 85) return 'bg-red-500';
    if (percentage > 60) return 'bg-orange-500';
    return 'bg-green-500';
};

const PerformanceAnalytics: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const cpuLoad = 45;
    const memLoad = 62;
    const netLoad = 28;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <KPI title={t('kpi_uptime')} value="99.991%" color="text-green-600" />
                <KPI title={t('kpi_api_latency')} value="112 ms" color="text-orange-500" />
                <KPI title={t('kpi_ai_decision_latency')} value="45 ms" color="text-green-600" />
                <KPI title={t('kpi_db_query_time')} value="15 ms" color="text-green-600" />
            </div>
            <div>
                <h3 className="text-md font-semibold text-slate-700 mb-3">{t('real_time_server_load')}</h3>
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <LoadBar label={t('cpu_utilization')} percentage={cpuLoad} color={getLoadColor(cpuLoad)} />
                    <LoadBar label={t('memory_usage')} percentage={memLoad} color={getLoadColor(memLoad)} />
                    <LoadBar label={t('network_traffic')} percentage={netLoad} color={getLoadColor(netLoad)} />
                </div>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;