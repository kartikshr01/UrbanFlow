import React from 'react';

interface IconProps {
  className?: string;
}

export const BrainCircuitIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5v.5a4.5 4.5 0 0 0 1.2 3.1L5 14" />
        <path d="M12 2a4.5 4.5 0 0 1 4.5 4.5v.5a4.5 4.5 0 0 1-1.2 3.1L19 14" />
        <path d="M12 21a4.5 4.5 0 0 1-4.5-4.5v-.5a4.5 4.5 0 0 1 1.2-3.1L5 9" />
        <path d="M12 21a4.5 4.5 0 0 0 4.5-4.5v-.5a4.5 4.5 0 0 0-1.2-3.1L19 9" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="12" cy="12" r="4"/>
    </svg>
);