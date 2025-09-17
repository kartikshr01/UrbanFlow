import React from 'react';

interface IconProps {
  className?: string;
}

export const FireTruckIcon: React.FC<IconProps> = ({ className }) => (
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
    <path d="M22 17H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Z" />
    <path d="M2 11V6.5a2.5 2.5 0 0 1 2.5-2.5h3" />
    <path d="M14 11V4" />
    <path d="M10 4h4" />
    <path d="M10 11V8" />
    <path d="m14 4 4 2.5" />
    <path d="M18 11V6.5" />
    <circle cx="5" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);