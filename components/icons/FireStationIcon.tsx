import React from 'react';

interface IconProps {
  className?: string;
}

export const FireStationIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <title>Fire Station</title>
    <path d="M12 22V10" />
    <path d="M4 10h16" />
    <path d="M4 10l8-8 8 8" />
    <path d="M3 22h18" />
    <path d="M9 16h6v6H9z" fill="currentColor" fillOpacity="0.1" />
    <path d="M9 16h6v6H9z" />
  </svg>
);
