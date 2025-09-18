import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

interface IconProps {
  className?: string;
}

export const TrafficSystemLogoIcon: React.FC<IconProps> = ({ className }) => {
  const { t } = useContext(LanguageContext);
  const titleId = 'traffic-system-logo-title';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-labelledby={titleId}
      role="img"
    >
      <title id={titleId}>{t('logo_traffic_system')}</title>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Shield */}
        <path d="M12 22.5C12 22.5 21 18 21 12V4.5L12 1.5L3 4.5V12C3 18 12 22.5 12 22.5Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 22.5C12 22.5 21 18 21 12V4.5L12 1.5L3 4.5V12C3 18 12 22.5 12 22.5Z" />
        
        {/* Traffic Light */}
        <rect x="9.5" y="5" width="5" height="14" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="none" />
        <circle cx="12" cy="8" r="1.6" fill="#ef4444" stroke="none" />
        <circle cx="12" cy="12" r="1.6" fill="#f59e0b" stroke="none" />
        <circle cx="12" cy="16" r="1.6" fill="#22c55e" stroke="none" />
      </g>
    </svg>
  );
};