import React from 'react';

interface IconProps {
  className?: string;
}

export const CorridorDeactivatedIcon: React.FC<IconProps> = ({ className }) => (
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
    <title>Corridor Deactivated</title>
    <path d="M12 15a6 6 0 0 0-6-6h12a6 6 0 0 0-6 6z" fill="currentColor" fillOpacity="0.1"/>
    <path d="M12 15a3 3 0 0 0-3 3" />
    <path d="M15 18a3 3 0 0 0-3-3" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);