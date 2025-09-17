import React from 'react';

interface IconProps {
  className?: string;
}

export const CorridorActivatedIcon: React.FC<IconProps> = ({ className }) => (
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
    <title>Corridor Activated</title>
    <path d="M7.8 19.3c-2 .5-3.8-1.3-3.3-3.3" />
    <path d="M16.2 19.3c2 .5 3.8-1.3 3.3-3.3" />
    <path d="M12 15a3 3 0 0 0-3 3" />
    <path d="M15 18a3 3 0 0 0-3-3" />
    <path d="M2 12l2.5-2.5" />
    <path d="M22 12l-2.5-2.5" />
    <path d="M12 2v4" />
    <path d="M12 15a6 6 0 0 0-6-6h12a6 6 0 0 0-6 6z" fill="currentColor" fillOpacity="0.1"/>
  </svg>
);