import React, { useState, useContext } from 'react';
import { TrafficSystemLogoIcon } from '../icons/TrafficSystemLogoIcon';
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
  
  const tabs = [
    { id: 'overview', label: t('overview_tab') },
    { id: 'signal_control', label: t('signal_control_tab') },
    { id: 'lane_management', label: t('lane_management_tab') },
    { id: 'reports', label: t('reports_tab') },
  ];


  return (
    <>
      <header className="w-full bg-white border-slate-200 border rounded-2xl p-4 shadow-md shadow-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          {/* Left: Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 border border-indigo-200">
              <TrafficSystemLogoIcon className="h-7 w-7 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1d293d]">{t('traffic_police_header_title')}</h1>
              <p className="text-sm text-[#7a8596]">{t('traffic_police_header_subtitle')}</p>
            </div>
          </div>
          
          {/* Center: Nav (Desktop) */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
               {tabs.map(tab => (
                  <NavButton key={tab.id} label={tab.label} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id as TrafficPoliceTab)} />
              ))}
          </nav>
          
          {/* Right: Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
              aria-label={t('aria_end_shift')}
            >
              {t('end_shift_button')}
            </button>
          </div>

          {/* Mobile Nav - Spanning full width */}
          <div className="w-full lg:hidden">
              <label htmlFor="mobile-nav-tabs" className="sr-only">Select a tab</label>
              <select
                  id="mobile-nav-tabs"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as TrafficPoliceTab)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2.5 text-base font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all"
              >
                  {tabs.map(tab => (
                      <option key={tab.id} value={tab.id}>{tab.label}</option>
                  ))}
              </select>
          </div>
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