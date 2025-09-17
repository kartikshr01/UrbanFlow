import React from 'react';

interface IconProps {
  className?: string;
}

export const FireIcon: React.FC<IconProps> = ({ className }) => (
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
    <path d="M12 22c-3.31 0-6-2.69-6-6 0-2.28 1.28-4.26 3.12-5.27A6.012 6.012 0 0 1 12 2a6.012 6.012 0 0 1 2.88 8.73C16.72 11.74 18 13.72 18 16c0 3.31-2.69 6-6 6z" fill="currentColor" fillOpacity="0.1"/>
    <path d="M12 2c1.9 2.99 4.5 6.47 4.5 9.47 0 2.49-2.01 4.5-4.5 4.5S7.5 13.96 7.5 11.47c0-2.99 2.6-6.47 4.5-9.47z"/>
  </svg>
);