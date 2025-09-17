
import React, { useContext } from 'react';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ClipboardListIcon } from '../icons/ClipboardListIcon';

const StatusTag: React.FC<{ label: string; color: string }> = ({ label, color }) => (
    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white shadow-md ${color}`}>{label}</span>
);

const RouteBadge: React.FC<{ label: string }> = ({ label }) => (
    <span className="px-3 py-1 text-sm bg-slate-200 text-slate-700 border border-slate-300 rounded-full">{label}</span>
);

const FireStatusPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const activeRequests = [
    { id: 1, unit: t('fire_engine_08'), destination: t('dest_bapu_bazar'), eta: 6, priority: t('priority_structure_fire'), priorityColor: 'bg-orange-600/90', status: t('status_active'), corridorActive: true, route: ['BN-1', 'BN-5', 'BN-9'] },
    { id: 2, unit: t('ladder_03'), destination: t('dest_shakti_nagar'), eta: 9, priority: t('priority_alarm'), priorityColor: 'bg-yellow-600/90', status: t('status_en_route'), corridorActive: false, route: ['SN-2', 'SN-3'] },
    { id: 3, unit: t('rescue_01'), destination: t('dest_pratap_nagar'), eta: 5, priority: t('priority_mva'), priorityColor: 'bg-red-600/90', status: t('status_active'), corridorActive: false, route: ['PN-8', 'PN-9', 'PN-12'] },
  ];

  return (
    <PanelCard title={t('fire_status_panel_title')} icon={<ClipboardListIcon className="h-5 w-5 text-indigo-500" />}>
       <div className="h-full max-h-[250px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {activeRequests.map((request) => (
             <div key={request.id} className="p-4 rounded-lg border border-slate-200/80 transition-all duration-300 cursor-pointer odd:bg-slate-100/70 even:bg-transparent hover:bg-red-50 hover:border-red-200 hover:shadow-lg">
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-[#1d293d]">{request.unit} → {request.destination}</h3>
                                <p className="text-sm text-[#7a8596] mt-1">{t('common_request_time')} 14:32 | {t('common_eta')}: <span className="font-bold text-green-600">{request.eta} {t('common_minutes')}</span></p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0 ml-2">
                                <StatusTag label={request.priority} color={request.priorityColor} />
                                <StatusTag label={request.status} color="bg-green-600/90" />
                            </div>
                        </div>

                        {request.corridorActive && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center shadow-inner-lg">
                                <p className="font-semibold text-green-800 text-base">{t('common_active_corridor_title')}</p>
                                <p className="text-xs text-green-600/80 mt-1">{t('common_active_corridor_subtitle')}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-[#9ca7b4] mb-2">{t('common_optimized_route')}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                            {request.route.map((junction, index) => (
                                <React.Fragment key={junction}>
                                    <RouteBadge label={junction} />
                                    {index < request.route.length - 1 && <ArrowRightIcon className="h-4 w-4 text-slate-400" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default FireStatusPanel;
