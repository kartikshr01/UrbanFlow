import React, { useContext } from 'react';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ClipboardListIcon } from '../icons/ClipboardListIcon';
import { MapPinIcon } from '../icons/MapPinIcon';
import { StopwatchIcon } from '../icons/StopwatchIcon';
import { SolidGreenCircleIcon } from '../icons/SolidGreenCircleIcon';

const StatusTag: React.FC<{ label: string; color: string }> = ({ label, color }) => (
    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white shadow-md ${color}`}>{label}</span>
);

const RouteBadge: React.FC<{ label: string }> = ({ label }) => (
    <span className="px-3 py-1 text-sm bg-slate-200 text-slate-700 border border-slate-300 rounded-full">{label}</span>
);

const StatusPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  
  const activeRequests = [
    { id: 1, unit: t('unit_15'), destination: t('dest_mbh'), eta: 4, priority: t('priority_status_critical'), priorityColor: 'bg-red-600/90', status: t('status_active'), corridorActive: true, route: ['CC', 'DG', 'UC'] },
    { id: 2, unit: t('unit_07'), destination: t('dest_enc'), eta: 8, priority: t('priority_status_high'), priorityColor: 'bg-orange-600/90', status: t('status_en_route'), corridorActive: false, route: ['FC', 'SC'] },
    { id: 3, unit: t('unit_21'), destination: t('dest_hmd'), eta: 12, priority: t('priority_status_medium'), priorityColor: 'bg-yellow-600/90', status: t('status_on_scene'), corridorActive: false, route: ['SC', 'UC', 'HP'] },
  ];

  return (
    <PanelCard title={t('status_panel_title')} icon={<ClipboardListIcon className="h-5 w-5 text-indigo-500" />}>
      <div className="h-full space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {activeRequests.map((request) => (
            <div key={request.id} className="p-4 rounded-lg border border-slate-200/80 transition-all duration-300 odd:bg-slate-100/70 even:bg-transparent hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-lg">
                <div className="flex flex-col gap-3">
                    {/* Header: Unit ID and Status Tags */}
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-[#1d293d]">{request.unit}</h3>
                        <div className="flex gap-2 flex-shrink-0 ml-2">
                            <StatusTag label={request.priority} color={request.priorityColor} />
                            <StatusTag label={request.status} color="bg-green-600/90" />
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <p className="font-semibold text-slate-700">{request.destination}</p>
                    </div>

                    {/* ETA and Route */}
                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <StopwatchIcon className="h-5 w-5 text-green-600"/>
                            <div>
                                <p className="text-xs text-slate-500">{t('common_eta')}</p>
                                <p className="font-bold text-green-700">{request.eta} {t('common_minutes')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end max-w-[60%]">
                            {request.route.map((junction, index) => (
                                <React.Fragment key={junction}>
                                    <RouteBadge label={junction} />
                                    {index < request.route.length - 1 && <ArrowRightIcon className="h-4 w-4 text-slate-400" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Corridor Banner */}
                    {request.corridorActive && (
                        <div className="p-2 bg-green-100 border border-green-200 rounded-lg text-center flex items-center justify-center gap-2">
                            <SolidGreenCircleIcon className="h-3 w-3 text-green-500 animate-pulse" />
                            <p className="font-semibold text-green-800 text-sm">{t('common_active_corridor_title')}</p>
                        </div>
                    )}

                    {/* Request Time */}
                     <p className="text-xs text-slate-400 text-right -mt-2">{t('common_request_time')} 14:32</p>
                </div>
            </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default StatusPanel;
