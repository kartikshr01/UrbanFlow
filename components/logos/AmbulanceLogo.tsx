import React from 'react';

interface LogoProps {
  className?: string;
  title: string;
}

export const AmbulanceLogo: React.FC<LogoProps> = ({ className, title }) => {
  const titleId = 'ambulance-logo-title';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-labelledby={titleId}
      role="img"
    >
      <title id={titleId}>{title}</title>
      <g fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4h-4v6H4v4h6v6h4v-6h6v-4h-6z" fillOpacity="0.1" stroke="none"/>
        <path d="M14 4h-4v6H4v4h6v6h4v-6h6v-4h-6z" />
      </g>
    </svg>
  );
};
