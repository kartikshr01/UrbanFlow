import React from 'react';

interface IconProps { 
  className?: string; 
}

export const SignalOverrideIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className} 
        aria-hidden="true"
    >
        <title>Signal Override</title>
        <path d="M21 4h-7" />
        <path d="M10 4H3" />
        <path d="M21 12h-9" />
        <path d="M8 12H3" />
        <path d="M21 20h-5" />
        <path d="M12 20H3" />
        <line x1="14" y1="2" x2="14" y2="6" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="16" y1="18" x2="16" y2="22" />
    </svg>
);