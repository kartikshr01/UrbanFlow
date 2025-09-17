
import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { RoadIcon } from '../icons/RoadIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const Lane: React.FC<{ name: string; direction: string; isReversible: boolean; onReverse: () => void; reverseLabel: string }> = ({ name, direction, isReversible, onReverse, reverseLabel }) => (
    <div className="p-3 bg-slate-100 rounded-lg border border-slate-200/80 flex items-center justify-between">
        <div>
            <p className="font-semibold text-[#1d293d]">{name}</p>
            <p className="text-sm text-[#7a8596]">{direction}</p>
        </div>
        {isReversible && (
            <button onClick={onReverse} className="px-3 py-1.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-lg border border-indigo-200 hover:bg-indigo-200 transition-colors">
                {reverseLabel}
            </button>
        )}
    </div>
);

const LaneConfigurationPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <PanelCard title={t('lane_config_panel_title')} icon={<RoadIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="h-full max-h-[220px] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            <Lane name={t('lane_b2_1')} direction={t('direction_eastbound')} isReversible={true} onReverse={() => {}} reverseLabel={t('reverse_button')} />
            <Lane name={t('lane_b2_2')} direction={t('direction_eastbound')} isReversible={true} onReverse={() => {}} reverseLabel={t('reverse_button')} />
            <Lane name={t('lane_t1_1')} direction={t('direction_westbound')} isReversible={false} onReverse={() => {}} reverseLabel={t('reverse_button')} />
            <Lane name={t('lane_t1_2')} direction={t('direction_westbound')} isReversible={false} onReverse={() => {}} reverseLabel={t('reverse_button')} />
            <Lane name={t('lane_h5_express')} direction={t('direction_eastbound')} isReversible={true} onReverse={() => {}} reverseLabel={t('reverse_button')} />
        </div>
    </PanelCard>
  );
};

export default LaneConfigurationPanel;
