import React, { useState, useContext } from 'react';
import ConfirmationModal from '../shared/ConfirmationModal';
import { LanguageContext } from '../../contexts/LanguageContext';
import LanguageSelector from '../shared/LanguageSelector';
import { UserIcon } from '../icons/UserIcon';

interface HeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useContext(LanguageContext);

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    onLogout();
  };

  return (
    <>
      <header className="flex flex-wrap items-center justify-between w-full bg-white border-slate-200 border rounded-2xl p-4 shadow-md shadow-slate-200/60 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-200 border border-slate-300">
            <UserIcon className="h-7 w-7 text-slate-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1d293d]">{t('admin_header_title')}</h1>
            <p className="text-sm text-[#7a8596]">{t('admin_header_subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSelector />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
            aria-label={t('aria_logout')}
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

export default AdminHeader;