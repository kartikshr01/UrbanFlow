
import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { BrainCircuitIcon } from '../icons/BrainCircuitIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const Toggle: React.FC<{ label: string; enabled: boolean; }> = ({ label, enabled }) => (
    <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg border border-slate-200/80">
        <label className="font-semibold text-[#1d293d]" htmlFor={label.replace(' ', '-')}>{label}</label>
        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name={label.replace(' ', '-')} id={label.replace(' ', '-')} defaultChecked={enabled} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor={label.replace(' ', '-')} className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
        </div>
    </div>
);

const AIAutoAdjustmentPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <PanelCard title={t('ai_auto_adjust_panel_title')} icon={<BrainCircuitIcon className="h-5 w-5 text-indigo-500" />}>
        <style>{`
            .toggle-checkbox:checked {
              right: 0;
              border-color: #22c55e; /* Equivalent to green-500 */
            }
            .toggle-checkbox:checked + .toggle-label {
              background-color: #22c55e; /* Equivalent to green-500 */
            }
        `}</style>
        <div className="space-y-3">
            <Toggle label={t('ai_congestion_prediction')} enabled={true} />
            <Toggle label={t('ai_dynamic_lane_reversal')} enabled={true} />
            <Toggle label={t('ai_incident_detection')} enabled={true} />
            <Toggle label={t('ai_signal_optimization')} enabled={false} />
        </div>
        <p className="mt-4 text-xs text-center text-[#9ca7b4]">{t('ai_beta_warning')}</p>
    </PanelCard>
  );
};

export default AIAutoAdjustmentPanel;
