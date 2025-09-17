import React from 'react';

interface IconProps {
  className?: string;
}

export const TruckIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M10 17h4V5H2v12h3" />
        <path d="M22 17h-2.12" />
        <path d="M2 17H1" />
        <path d="M5 17H4" />
        <path d="M14 17h1" />
        <path d="M18 17h-2.12" />
        <path d="M22 17h-2.12" />
        <path d="m16 5 4 4" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
);