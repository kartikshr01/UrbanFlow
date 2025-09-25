import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangleIcon } from '../icons/AlertTriangleIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import type { RequestDetails } from '../../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requestDetails: RequestDetails | null;
}

const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <h3 className="text-sm font-semibold text-slate-500 mb-1">{label}</h3>
        <div className="p-3 bg-slate-100 rounded-lg border border-slate-200/80 text-slate-800">
            {children}
        </div>
    </div>
);


const EmergencyRequestConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, requestDetails }) => {
  const { t } = useContext(LanguageContext);
  if (!isOpen || !requestDetails) return null;

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
        className="w-full max-w-lg rounded-2xl bg-[#fdfeff] p-6 sm:p-8 shadow-lg shadow-slate-300/60 border border-slate-200/80 animate-fade-in"
        style={{ animationDuration: '0.3s' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 border border-red-200">
                <AlertTriangleIcon className="h-6 w-6 text-red-500" />
            </div>
            <div>
                 <h2 id="modal-title" className="text-xl font-bold text-[#1d293d]">{t('confirm_request_title')}</h2>
            </div>
        </div>
       
        <p className="mt-3 text-[#7a8596]">{t('confirm_request_message')}</p>

        <div className="mt-6 space-y-4">
            <DetailItem label={t('details_priority')}>
                <p className="font-bold">{requestDetails.priority.label}</p>
                <p className="text-sm text-slate-600">{requestDetails.priority.description}</p>
            </DetailItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <DetailItem label={t('details_destination')}>
                    <p className="font-semibold">{requestDetails.destination}</p>
                </DetailItem>
                 <DetailItem label={t('details_location')}>
                    <p className="text-sm font-mono tracking-tighter">{requestDetails.latitude}, {requestDetails.longitude}</p>
                </DetailItem>
            </div>
           
            <DetailItem label={t('details_description')}>
                <p className="text-sm italic text-slate-700">
                    {requestDetails.description.trim() ? `"${requestDetails.description}"` : t('details_not_provided')}
                </p>
            </DetailItem>
        </div>


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
            {t('confirm_button_text')}
          </button>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(modalContent, modalRoot) : null;
};

export default EmergencyRequestConfirmationModal;