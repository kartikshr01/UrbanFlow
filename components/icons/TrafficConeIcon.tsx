import React from 'react';

interface IconProps {
  className?: string;
}

export const TrafficConeIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M10.29 2.86 3.2 21h17.6l-7.09-18.14a2 2 0 0 0-3.42 0Z" fill="currentColor" fillOpacity="0.1"/>
        <path d="M10.29 2.86 3.2 21h17.6l-7.09-18.14a2 2 0 0 0-3.42 0Z" />
        <path d="M8.5 9h7" />
        <path d="M6.5 15h11" />
    </svg>
);