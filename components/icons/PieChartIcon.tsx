import React from 'react';

interface IconProps {
  className?: string;
}

export const PieChartIcon: React.FC<IconProps> = ({ className }) => (
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
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" fill="currentColor" fillOpacity="0.1" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
);