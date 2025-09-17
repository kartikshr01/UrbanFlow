import React from 'react';

interface IconProps {
  className?: string;
}

export const SolidCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className={className} 
        aria-hidden="true"
    >
        <title>Solid Circle</title>
        <circle cx="12" cy="12" r="10" />
    </svg>
);