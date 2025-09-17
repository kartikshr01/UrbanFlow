import React from 'react';

interface IconProps {
  className?: string;
}

export const AmbulanceIcon: React.FC<IconProps> = ({ className }) => (
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
    <path d="M10 10H6" />
    <path d="M8 8v4" />
    <path d="M18 18h-2.12" />
    <path d="M9 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h12v7a2 2 0 0 1-2 2Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M9 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h12v7a2 2 0 0 1-2 2Z" />
    <path d="m18 18-1.5-6H13a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2" />
    <circle cx="6.5" cy="18.5" r="1.5" />
    <circle cx="15.5" cy="18.5" r="1.5" />
  </svg>
);