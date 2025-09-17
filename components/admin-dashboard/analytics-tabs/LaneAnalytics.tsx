
import React, { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';

const KPI: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
);

const ComparisonBar: React.FC<{ label: string; valueA: number; valueB: number; max: number }> = ({ label, valueA, valueB, max }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div>
            <p className="text-sm text-slate-600 mb-2">{label}</p>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-24 text-xs text-slate-500">{t('without_ai')}</div>
                    <div className="flex-1 bg-slate-200 rounded-full h-3">
                        <div className="bg-orange-400 h-3 rounded-full" style={{ width: `${(valueA/max)*100}%`}}></div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-24 text-xs text-slate-500">{t('with_ai')}</div>
                    <div className="flex-1 bg-slate-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(valueB/max)*100}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LaneAnalytics: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPI title={t('kpi_reconfigs_24h')} value="12" />
            <KPI title={t('kpi_avg_flow_improvement')} value="+18%" />
            <KPI title={t('kpi_incidents_avoided')} value="3" />
        </div>
        <div>
            <h3 className="text-md font-semibold text-slate-700 mb-3">{t('impact_ai_lane_title')}</h3>
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <ComparisonBar label={t('morning_rush_flow')} valueA={1200} valueB={1550} max={2000} />
                <ComparisonBar label={t('evening_rush_flow')} valueA={1150} valueB={1400} max={2000} />
            </div>
        </div>
    </div>
  );
};

export default LaneAnalytics;
