
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

const PoliceStatusPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const activeRequests = [
    { id: 1, unit: t('patrol_12'), destination: t('dest_hathi_pol_bank'), eta: 5, priority: t('priority_robbery'), priorityColor: 'bg-red-600/90', status: t('status_active'), corridorActive: true, route: ['HP-1', 'HP-4', 'HP-8'] },
    { id: 2, unit: t('swat_1'), destination: t('junction_madri_industrial'), eta: 11, priority: t('priority_hostage'), priorityColor: 'bg-red-600/90', status: t('status_en_route'), corridorActive: false, route: ['MI-2', 'MI-3'] },
    { id: 3, unit: t('k9_unit'), destination: t('dest_suspicious_pkg_location'), eta: 7, priority: t('priority_suspicious_pkg'), priorityColor: 'bg-yellow-600/90', status: t('status_on_scene'), corridorActive: false, route: ['GB-5', 'GB-6', 'GB-7'] },
  ];

  return (
    <PanelCard title={t('police_status_panel_title')} icon={<ClipboardListIcon className="h-5 w-5 text-indigo-500" />}>
      <div className="h-full max-h-[250px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {activeRequests.map((request) => (
             <div key={request.id} className="p-4 rounded-lg border border-slate-200/80 transition-all duration-300 cursor-pointer odd:bg-slate-100/70 even:bg-transparent hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-lg">
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-[#1d293d]">{request.unit} → {request.destination}</h3>
                                <p className="text-sm text-[#7a8596] mt-1">{t('common_request_time')} 15:10 | {t('common_eta')}: <span className="font-bold text-green-600">{request.eta} {t('common_minutes')}</span></p>
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

export default PoliceStatusPanel;
