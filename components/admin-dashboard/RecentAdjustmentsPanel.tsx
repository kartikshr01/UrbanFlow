import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { HistoryIcon } from '../icons/HistoryIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const AdjustmentItem: React.FC<{ item: any }> = ({ item }) => (
    <div className="flex items-start gap-3 p-2.5 rounded-lg odd:bg-slate-100/70 even:bg-transparent">
        <div className="flex-shrink-0 mt-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
        <div className="flex-grow">
            <p className="font-semibold text-[#1d293d] text-sm">{item.description}</p>
        </div>
        <div className="flex-shrink-0 text-xs text-[#9ca7b4] mt-0.5">
            {item.time}
        </div>
    </div>
);

const RecentAdjustmentsPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const adjustments = [
    { description: t('adj_rerouted'), time: t('adj_time_1_min') },
    { description: t('adj_green_light'), time: t('adj_time_3_min') },
    { description: t('adj_incident_flagged'), time: t('adj_time_8_min') },
    { description: t('adj_express_lane_reversed'), time: t('adj_time_25_min') },
  ];

  return (
    <PanelCard title={t('recent_ai_adjustments_panel_title')} icon={<HistoryIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="h-full space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {adjustments.map((adj, index) => (
                <AdjustmentItem key={index} item={adj} />
            ))}
        </div>
    </PanelCard>
  );
};

export default RecentAdjustmentsPanel;