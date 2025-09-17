import React from 'react';

interface IconProps {
  className?: string;
}

export const RoadIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M6 3v18" />
        <path d="M18 3v18" />
        <path d="M12 3v2" />
        <path d="M12 9v2" />
        <path d="M12 15v2" />
        <path d="M12 21v0" />
    </svg>
);