import React from 'react';

interface IconProps {
  className?: string;
}

export const RoadsIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M4 19l4-14" />
        <path d="M16 5l4 14" />
        <path d="M12 8V6" />
        <path d="M12 13v-2" />
        <path d="M12 18v-2" />
    </svg>
);