import React from 'react';

interface IconProps {
  className?: string;
}

export const LineChartIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M19 17.5V9l-5 5-4-4-3 3v4.5z" fill="currentColor" fillOpacity="0.1" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);