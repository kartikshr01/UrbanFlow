import React, { useState, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { JunctionIcon } from '../icons/JunctionIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

type JunctionStatus = 'Auto' | 'Manual Override' | 'Corridor Active' | 'Offline';
type Junction = { id: string; name: string; status: JunctionStatus };

const statusDetails: { [key in JunctionStatus]: { labelKey: 'status_auto' | 'status_manual_override' | 'status_corridor_active' | 'status_offline'; color: string } } = {
    'Auto': { labelKey: 'status_auto', color: 'bg-green-100 text-green-700 border-green-200' },
    'Manual Override': { labelKey: 'status_manual_override', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    'Corridor Active': { labelKey: 'status_corridor_active', color: 'bg-red-100 text-red-700 border-red-200' },
    'Offline': { labelKey: 'status_offline', color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const ManageStatusModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    junction: Junction;
    onStatusChange: (newStatus: JunctionStatus) => void;
}> = ({ isOpen, onClose, junction, onStatusChange }) => {
    const { t } = useContext(LanguageContext);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" style={{ animationDuration: '0.2s' }} onClick={onClose}>
            <div className="w-full max-w-md rounded-2xl bg-[#fdfeff] p-6 shadow-lg border border-slate-200/80" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-slate-800">{t('manage_junction_status_title')}</h2>
                <p className="mt-1 text-sm text-slate-500">{t('select_new_status_label')} <span className="font-semibold">{junction.name}</span>:</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    {Object.keys(statusDetails).map(status => (
                        <button
                            key={status}
                            onClick={() => onStatusChange(status as JunctionStatus)}
                            className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all ${junction.status === status ? `${statusDetails[status as JunctionStatus].color} border-transparent ring-2 ring-indigo-500` : 'bg-slate-100 border-slate-200 hover:bg-slate-200 hover:border-slate-300'}`}
                        >
                            {t(statusDetails[status as JunctionStatus].labelKey)}
                        </button>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors">
                        {t('close_button')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const JunctionControlPanel: React.FC = () => {
    const { t } = useContext(LanguageContext);
    
    const getInitialJunctions = (): Junction[] => [
        { id: 'CC', name: t('junction_chetak_circle'), status: 'Auto' },
        { id: 'FC', name: t('junction_fatehpura'), status: 'Manual Override' },
        { id: 'DG', name: t('junction_delhi_gate'), status: 'Corridor Active' },
        { id: 'SC', name: t('junction_shastri_circle'), status: 'Auto' },
        { id: 'UC', name: t('junction_udaipole'), status: 'Offline' },
    ];

    const [junctions, setJunctions] = useState<Junction[]>(getInitialJunctions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJunction, setSelectedJunction] = useState<Junction | null>(null);

    React.useEffect(() => {
        setJunctions(currentJunctions => {
            const newNames: { [key: string]: string } = {
                'CC': t('junction_chetak_circle'),
                'FC': t('junction_fatehpura'),
                'DG': t('junction_delhi_gate'),
                'SC': t('junction_shastri_circle'),
                'UC': t('junction_udaipole'),
            };
            return currentJunctions.map(j => ({
                ...j,
                name: newNames[j.id] || j.name
            }));
        });
    }, [t]);

    const handleOpenModal = (junction: Junction) => {
        setSelectedJunction(junction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJunction(null);
    };

    const handleStatusChange = (newStatus: JunctionStatus) => {
        if (selectedJunction) {
            setJunctions(prevJunctions =>
                prevJunctions.map(j => j.id === selectedJunction.id ? { ...j, status: newStatus } : j)
            );
        }
        handleCloseModal();
    };

    return (
        <>
            <PanelCard title={t('junction_control_panel_title')} icon={<JunctionIcon className="h-5 w-5 text-indigo-500" />}>
                 <div className="h-full space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                    {junctions.length > 0 ? (
                        junctions.map((junction) => (
                            <div key={junction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg odd:bg-slate-100/70 even:bg-transparent">
                                <div>
                                    <p className="font-semibold text-[#1d293d]">{junction.id}: {junction.name}</p>
                                </div>
                                <div className="flex items-center gap-4 self-end sm:self-center">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusDetails[junction.status].color}`}>
                                        {t(statusDetails[junction.status].labelKey)}
                                    </span>
                                    <button
                                        onClick={() => handleOpenModal(junction)}
                                        className="px-4 py-1.5 text-sm font-semibold text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                                    >
                                        {t('manage_button')}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            <p>{t('common_no_data')}</p>
                        </div>
                    )}
                </div>
            </PanelCard>
            {selectedJunction && (
                <ManageStatusModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    junction={selectedJunction}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    );
};

export default JunctionControlPanel;