import React from 'react';

interface IconProps {
  className?: string;
}

export const JunctionIcon: React.FC<IconProps> = ({ className }) => (
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
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.1"/>
        <path d="M12 2v20" />
        <path d="M2 12h20" />
    </svg>
);