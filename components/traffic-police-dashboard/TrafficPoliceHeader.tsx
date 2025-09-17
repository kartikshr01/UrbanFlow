
import React, { useState, useContext } from 'react';
import { TrafficConeIcon } from '../icons/TrafficConeIcon';
import ConfirmationModal from '../shared/ConfirmationModal';
import { TrafficPoliceTab } from '../TrafficPoliceDashboard';
import { LanguageContext } from '../../contexts/LanguageContext';
import LanguageSelector from '../shared/LanguageSelector';

interface HeaderProps {
  onLogout: () => void;
  activeTab: TrafficPoliceTab;
  setActiveTab: (tab: TrafficPoliceTab) => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

const TrafficPoliceHeader: React.FC<HeaderProps> = ({ onLogout, activeTab, setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useContext(LanguageContext);

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    onLogout();
  };

  return (
    <>
      <header className="flex items-center justify-between w-full bg-[#fdfeff] border-slate-200/80 border rounded-2xl p-4 shadow-lg shadow-slate-200/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 border border-orange-200">
            <TrafficConeIcon className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1d293d]">{t('traffic_police_header_title')}</h1>
            <p className="text-sm text-[#7a8596]">{t('traffic_police_header_subtitle')}</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <NavButton label={t('overview_tab')} isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavButton label={t('signal_control_tab')} isActive={activeTab === 'signal_control'} onClick={() => setActiveTab('signal_control')} />
            <NavButton label={t('lane_management_tab')} isActive={activeTab === 'lane_management'} onClick={() => setActiveTab('lane_management')} />
            <NavButton label={t('reports_tab')} isActive={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
            aria-label={t('aria_end_shift')}
          >
            {t('end_shift_button')}
          </button>
        </div>
      </header>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title={t('confirm_end_shift_title')}
        message={t('confirm_end_shift_message')}
      />
    </>
  );
};

export default TrafficPoliceHeader;
