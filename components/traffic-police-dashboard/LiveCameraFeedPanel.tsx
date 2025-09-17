import React, { useState, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { CameraIcon } from '../icons/CameraIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

const LiveCameraFeedPanel: React.FC = () => {
  const [isFeedEnabled, setIsFeedEnabled] = useState(true);
  const { t } = useContext(LanguageContext);

  return (
    <PanelCard title={t('live_camera_panel_title')} icon={<CameraIcon className="h-5 w-5 text-indigo-500" />}>
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #22c55e; /* Equivalent to green-500 */
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #22c55e; /* Equivalent to green-500 */
        }
      `}</style>
      <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-center p-4">
        <div className="flex items-center gap-4">
          <label htmlFor="camera-feed-toggle" className="font-semibold text-lg text-[#1d293d]">
            {t('enable_real_time_feed_label')}
          </label>
          <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
            <input 
              type="checkbox" 
              name="camera-feed-toggle" 
              id="camera-feed-toggle" 
              checked={isFeedEnabled} 
              onChange={() => setIsFeedEnabled(!isFeedEnabled)}
              className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label 
              htmlFor="camera-feed-toggle" 
              className="toggle-label block overflow-hidden h-7 rounded-full bg-slate-300 cursor-pointer"
            ></label>
          </div>
        </div>
        <p className="mt-4 text-base text-[#7a8596]">
          {isFeedEnabled 
            ? t('live_feed_active_message')
            : t('live_feed_disabled_message')
          }
        </p>
      </div>
    </PanelCard>
  );
};

export default LiveCameraFeedPanel;