import React from 'react';

interface IconProps {
  className?: string;
}

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="4" height="6" fill="currentColor" fillOpacity="0.1"/>
        <path d="M7 18v-6h4v6" />
        <rect x="13" y="8" width="4" height="10" fill="currentColor" fillOpacity="0.1"/>
        <path d="M13 18V8h4v10" />
    </svg>
);