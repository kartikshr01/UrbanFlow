
import React, { useState, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AmbulanceIcon } from '../icons/AmbulanceIcon';
import { PoliceBadgeIcon } from '../icons/PoliceBadgeIcon';
import { FireIcon } from '../icons/FireIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { ClipboardListIcon } from '../icons/ClipboardListIcon';

type Agency = 'Ambulance' | 'Police' | 'Fire Dept';
type CorridorRequestStatus = 'Pending' | 'Active';
interface CorridorRequest {
    id: number;
    unitId: string;
    agency: Agency;
    source: string;
    destination: string;
    status: CorridorRequestStatus;
}

const agencyDetails: { [key in Agency]: { icon: React.ReactNode; color: string } } = {
    Ambulance: { icon: <AmbulanceIcon className="h-5 w-5" />, color: 'text-indigo-500' },
    Police: { icon: <PoliceBadgeIcon className="h-5 w-5" />, color: 'text-blue-500' },
    'Fire Dept': { icon: <FireIcon className="h-5 w-5" />, color: 'text-red-500' },
};


const EmergencyCorridorPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const initialRequests: CorridorRequest[] = [
    { id: 1, unitId: t('ems_15'), agency: 'Ambulance', source: t('source_sector_14'), destination: t('dest_mbh'), status: 'Pending' },
    { id: 2, unitId: t('patrol_07'), agency: 'Police', source: t('junction_hathi_pol'), destination: t('dest_hathi_pol_incident'), status: 'Active' },
    { id: 3, unitId: t('engine_03'), agency: 'Fire Dept', source: t('junction_madri_industrial'), destination: t('dest_warehouse_fire'), status: 'Pending' },
  ];

  const [requests, setRequests] = useState(initialRequests);

  const handleToggleStatus = (id: number) => {
      setRequests(currentRequests =>
          currentRequests.map(req => {
              if (req.id === id) {
                  return { ...req, status: req.status === 'Active' ? 'Pending' : 'Active' };
              }
              return req;
          })
      );
  };

  React.useEffect(() => {
    setRequests(initialRequests);
  }, [t]);
  
  return (
    <PanelCard title={t('corridor_requests_panel_title')} icon={<ClipboardListIcon className="h-5 w-5 text-indigo-500" />}>
      <div className="h-full max-h-[220px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {requests.map((request) => {
            const isPending = request.status === 'Pending';
            const details = agencyDetails[request.agency];
            return (
                <div key={request.id} className={`p-3 rounded-lg border transition-all ${isPending ? 'bg-white hover:bg-slate-50 border-slate-200' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${details.color} bg-slate-100`}>
                                {details.icon}
                            </div>
                            <div>
                                <p className={`font-bold text-base ${details.color}`}>{request.unitId}</p>
                                <p className="text-xs text-slate-500">{t(`agency_${request.agency.toLowerCase().replace(' ', '')}` as any)}</p>
                            </div>
                        </div>
                         <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white shadow-sm ${isPending ? 'bg-orange-500' : 'bg-green-600'}`}>
                            {t(`status_${request.status.toLowerCase()}` as any)}
                        </span>
                    </div>
                    <div className="mt-3 flex items-center justify-center text-center">
                        <p className="text-sm font-semibold text-slate-600 truncate">{request.source}</p>
                        <ArrowRightIcon className="h-4 w-4 mx-2 text-slate-400 flex-shrink-0" />
                        <p className="text-sm font-semibold text-slate-800 truncate">{request.destination}</p>
                    </div>
                    <div className="mt-3">
                        {isPending ? (
                             <button onClick={() => handleToggleStatus(request.id)} className="w-full rounded-lg bg-green-600 py-2 text-sm font-semibold text-white transition-all hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-lg hover:shadow-green-500/40">
                                {t('activate_corridor_button')}
                            </button>
                        ) : (
                             <button onClick={() => handleToggleStatus(request.id)} className="w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition-all hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/50 shadow-lg hover:shadow-red-500/40">
                                {t('deactivate_corridor_button')}
                            </button>
                        )}
                    </div>
                </div>
            )
        })}
      </div>
    </PanelCard>
  );
};

export default EmergencyCorridorPanel;
