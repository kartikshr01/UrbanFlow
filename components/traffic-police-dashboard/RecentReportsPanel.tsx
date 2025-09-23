import React, { useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { HistoryIcon } from '../icons/HistoryIcon';
import { LineChartIcon } from '../icons/LineChartIcon';
import { FileTextIcon } from '../icons/FileTextIcon';
import { TrafficLightIcon } from '../icons/TrafficLightIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const ReportItem: React.FC<{ item: any }> = ({ item }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg odd:bg-slate-100/70 even:bg-transparent">
            <div className="flex items-center gap-4 w-full">
                <div className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-white border border-slate-200">
                    {item.icon}
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-[#1d293d]">{item.title}</p>
                    <p className="text-sm text-[#7a8596]">{t('report_generated_label')} {item.date}</p>
                </div>
            </div>
            <div className="w-full sm:w-auto flex-shrink-0 flex items-center justify-end gap-2">
                <button className="px-3 py-1.5 text-sm font-semibold text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">
                    {t('view_button')}
                </button>
                <button className="px-3 py-1.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-lg border border-indigo-200 hover:bg-indigo-200 transition-colors">
                    {t('download_button')}
                </button>
            </div>
        </div>
    );
};


const RecentReportsPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const reportData = [
    { type: 'flow', icon: <LineChartIcon className="h-5 w-5 text-green-600" />, title: t('report_title_flow_cc'), date: '2023-10-26 14:30' },
    { type: 'incident', icon: <FileTextIcon className="h-5 w-5 text-red-500" />, title: t('report_title_incident_4512'), date: '2023-10-26 11:15' },
    { type: 'signal', icon: <TrafficLightIcon state="wait" className="h-5 w-5 text-orange-500" />, title: t('report_title_signal_all'), date: '2023-10-25 18:00' },
    { type: 'flow', icon: <LineChartIcon className="h-5 w-5 text-green-600" />, title: t('report_title_flow_arb'), date: '2023-10-25 09:00' },
  ];

  return (
    <PanelCard title={t('recent_reports_panel_title')} icon={<HistoryIcon className="h-5 w-5 text-indigo-500" />}>
        <div className="h-full space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {reportData.length > 0 ? (
                reportData.map((report, index) => (
                    <ReportItem key={index} item={report} />
                ))
            ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                    <p>{t('common_no_data')}</p>
                </div>
            )}
        </div>
    </PanelCard>
  );
};

export default RecentReportsPanel;