import React from 'react';

interface IconProps {
  className?: string;
}

export const PoliceSirenIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <title>Police Department</title>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="12" cy="12" r="9" />
    </g>
    <path d="M12 3 A 9 9 0 0 1 12 21" fill="#3b82f6" />
    <path d="M12 3 A 9 9 0 0 0 12 21" fill="#ef4444" />
    <path d="M4.2 8.5 l 15.6 7" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path d="M4.2 15.5 l 15.6 -7" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
