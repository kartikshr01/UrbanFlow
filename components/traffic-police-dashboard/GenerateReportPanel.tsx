
import React, { useState, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { DocumentReportIcon } from '../icons/DocumentReportIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { FileTextIcon } from '../icons/FileTextIcon';
import { FileSpreadsheetIcon } from '../icons/FileSpreadsheetIcon';

const GenerateReportPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [exportFormat, setExportFormat] = useState('pdf');

  return (
    <PanelCard title={t('generate_report_panel_title')} icon={<DocumentReportIcon className="h-5 w-5 text-indigo-500" />}>
      <form className="flex flex-col h-full space-y-4">
        <div>
          <label htmlFor="report-type" className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('report_type_label')}</label>
          <select id="report-type" className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all">
            <option>{t('report_type_flow_analysis')}</option>
            <option>{t('report_type_signal_performance')}</option>
            <option>{t('report_type_incident_reports')}</option>
            <option>{t('report_type_override_log')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="junction-area" className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('junction_area_label')}</label>
          <select id="junction-area" className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all">
            <option>{t('junction_area_all')}</option>
            <option>{t('junction_chetak_circle')}</option>
            <option>{t('junction_delhi_gate')}</option>
            <option>{t('junction_ayad_bridge')}</option>
            <option>{t('dest_uch')}</option>
          </select>
        </div>

        <div>
           <label className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('date_range_label')}</label>
           <div className="flex items-center gap-2">
            <input 
              type="date" 
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all" />
            <input 
              type="date" 
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all" />
           </div>
        </div>
        
        <div className="flex-grow"></div>

        <div>
          <label className="block text-sm font-medium text-[#7a8596] mb-2">{t('export_format_label')}</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${exportFormat === 'pdf' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-100 hover:bg-slate-200'}`}>
              <input 
                type="radio" 
                name="export-format" 
                value="pdf" 
                checked={exportFormat === 'pdf'} 
                onChange={() => setExportFormat('pdf')}
                className="sr-only"
                aria-label={t('aria_export_pdf')}
              />
              <FileTextIcon className={`h-6 w-6 ${exportFormat === 'pdf' ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span className={`font-semibold ${exportFormat === 'pdf' ? 'text-indigo-700' : 'text-slate-800'}`}>PDF</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${exportFormat === 'excel' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-100 hover:bg-slate-200'}`}>
              <input 
                type="radio" 
                name="export-format" 
                value="excel" 
                checked={exportFormat === 'excel'} 
                onChange={() => setExportFormat('excel')}
                className="sr-only"
                aria-label={t('aria_export_excel')}
              />
              <FileSpreadsheetIcon className={`h-6 w-6 ${exportFormat === 'excel' ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span className={`font-semibold ${exportFormat === 'excel' ? 'text-indigo-700' : 'text-slate-800'}`}>Excel</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full mt-auto bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg hover:shadow-indigo-500/40"
        >
          {t('generate_report_button')}
        </button>
      </form>
    </PanelCard>
  );
};

export default GenerateReportPanel;
