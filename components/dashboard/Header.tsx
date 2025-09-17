
import React, { useState, useContext } from 'react';
import { AmbulanceIcon } from '../icons/AmbulanceIcon';
import ConfirmationModal from '../shared/ConfirmationModal';
import { LanguageContext } from '../../contexts/LanguageContext';
import LanguageSelector from '../shared/LanguageSelector';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
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
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 border border-indigo-200">
            <AmbulanceIcon className="h-7 w-7 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1d293d]">{t('ems_header_title')}</h1>
            <p className="text-sm text-[#7a8596]">{t('ems_header_subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600/80 rounded-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-green-500/40">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
            {t('unit_online')}
          </button>
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

export default Header;
