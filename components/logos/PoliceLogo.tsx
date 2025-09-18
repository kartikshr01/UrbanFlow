import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

interface LogoProps {
  className?: string;
}

export const PoliceLogo: React.FC<LogoProps> = ({ className }) => {
  const { t } = useContext(LanguageContext);
  const titleId = 'police-logo-title';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-labelledby={titleId}
      role="img"
    >
      <title id={titleId}>{t('logo_police_department')}</title>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m12 8 1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5L12 8z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
      </g>
    </svg>
  );
};
