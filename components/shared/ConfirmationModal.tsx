
import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangleIcon } from '../icons/AlertTriangleIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { t } = useContext(LanguageContext);
  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      style={{ animationDuration: '0.2s' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#fdfeff] p-8 shadow-lg shadow-slate-300/60 border border-slate-200/80 animate-fade-in"
        style={{ animationDuration: '0.3s' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 border border-red-200">
                <AlertTriangleIcon className="h-6 w-6 text-red-500" />
            </div>
            <div>
                 <h2 id="modal-title" className="text-xl font-bold text-[#1d293d]">{title}</h2>
            </div>
        </div>
       
        <p className="mt-4 text-[#7a8596]">{message}</p>
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-400"
          >
            {t('cancel_button')}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors focus:outline-none focus:ring-4 focus:ring-red-500/50 shadow-lg hover:shadow-red-500/40"
          >
            {t('end_shift_button')}
          </button>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(modalContent, modalRoot) : null;
};

export default ConfirmationModal;
