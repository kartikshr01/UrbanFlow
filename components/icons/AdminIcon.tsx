import React from 'react';

interface IconProps {
  className?: string;
}

export const AdminIcon: React.FC<IconProps> = ({ className }) => (
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
        <title>System Administration</title>
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="currentColor" fillOpacity="0.1"/>
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M12 2v2"/>
        <path d="M12 22v-2"/>
        <path d="m17 17 1.4-1.4"/>
        <path d="m5.6 5.6 1.4 1.4"/>
        <path d="M20 12h2"/>
        <path d="M2 12h2"/>
        <path d="m17 7-1.4 1.4"/>
        <path d="m5.6 17.6 1.4-1.4"/>
    </svg>
);
