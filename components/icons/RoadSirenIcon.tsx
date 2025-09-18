import React from 'react';

interface IconProps {
  className?: string;
}

export const RoadSirenIcon: React.FC<IconProps> = ({ className }) => (
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
        <g transform="translate(4, 4) scale(0.66)">
            <path d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0" fill="currentColor" fillOpacity="0.2"/>
            <path d="M12 8l-2 4h4l-2 4" />
            <path d="M18.36 5.64 12 12" />
            <path d="M12 12l-6.36 6.36" />
            <path d="m5.64 5.64 6.36 6.36" />
            <path d="M12 12l6.36 6.36" />
        </g>
    </svg>
);
