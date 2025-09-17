
import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const PerfMetric: React.FC<{ label: string; value: string; change: string; isPositive: boolean }> = ({ label, value, change, isPositive }) => (
    <div className="p-3 bg-slate-100 rounded-lg border border-slate-200/80">
        <p className="text-sm text-[#7a8596]">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
            <p className="text-xl font-bold text-[#1d293d]">{value}</p>
            <p className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change}
            </p>
        </div>
    </div>
);

const AISystemPerformancePanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <PanelCard title={t('ai_performance_panel_title')} icon={<ChartBarIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="grid grid-cols-2 gap-4">
            <PerfMetric label={t('ai_perf_trip_time_reduction')} value="12%" change="+2%" isPositive={true} />
            <PerfMetric label={t('ai_perf_incident_detection_accuracy')} value="97%" change="-0.5%" isPositive={false} />
            <PerfMetric label={t('ai_perf_model_confidence')} value="99.2%" change="+0.1%" isPositive={true} />
            <PerfMetric label={t('ai_perf_false_positives')} value="3" change="-1" isPositive={true} />
        </div>
    </PanelCard>
  );
};

export default AISystemPerformancePanel;
