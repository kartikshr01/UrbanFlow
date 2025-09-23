import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { HistoryIcon } from '../icons/HistoryIcon';
import { SolidGreenCircleIcon } from '../icons/SolidGreenCircleIcon';
import { SolidRedCircleIcon } from '../icons/SolidRedCircleIcon';
import { SignalOverrideIcon } from '../icons/SignalOverrideIcon';
import { SignalOverrideEndIcon } from '../icons/SignalOverrideEndIcon';
import { LaneChangeIcon } from '../icons/LaneChangeIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const ActivityItem: React.FC<{ item: any }> = ({ item }) => (
    <div className="flex items-start gap-4 p-3 rounded-lg odd:bg-slate-100/70 even:bg-transparent">
        <div className="flex-shrink-0 mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-white border border-slate-200">
            {item.icon}
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-[#1d293d]">{item.description}</p>
            <p className="text-sm text-[#7a8596]">{item.details}</p>
        </div>
        <div className="flex-shrink-0 text-sm text-[#9ca7b4] mt-1">
            {item.time}
        </div>
    </div>
);


const RecentActivitiesPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const activities = [
    { type: 'corridor_activated', icon: <SolidGreenCircleIcon className="h-5 w-5 text-green-600" />, description: t('activity_corridor_activated_desc'), time: t('activity_time_2_min'), details: t('activity_corridor_activated_details') },
    { type: 'override_start', icon: <SignalOverrideIcon className="h-5 w-5 text-orange-500" />, description: t('activity_override_start_desc'), time: t('activity_time_5_min'), details: t('activity_override_start_details') },
    { type: 'lane_change', icon: <LaneChangeIcon className="h-5 w-5 text-indigo-500" />, description: t('activity_lane_change_desc'), time: t('activity_time_12_min'), details: t('activity_lane_change_details') },
    { type: 'corridor_deactivated', icon: <SolidRedCircleIcon className="h-5 w-5 text-red-500" />, description: t('activity_corridor_deactivated_desc'), time: t('activity_time_15_min'), details: t('activity_corridor_deactivated_details') },
    { type: 'override_end', icon: <SignalOverrideEndIcon className="h-5 w-5 text-slate-500" />, description: t('activity_override_end_desc'), time: t('activity_time_28_min'), details: t('activity_override_end_details') },
  ];
  
  return (
    <PanelCard title={t('recent_activities_panel_title')} icon={<HistoryIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="h-full space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {activities.length > 0 ? (
                activities.map((activity, index) => (
                    <ActivityItem key={index} item={activity} />
                ))
            ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                    <p>{t('common_no_data')}</p>
                </div>
            )}
        </div>
    </PanelCard>
  );
};

export default RecentActivitiesPanel;