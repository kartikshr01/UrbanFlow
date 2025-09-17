import React from 'react';

interface IconProps {
  className?: string;
}

export const LayoutDashboardIcon: React.FC<IconProps> = ({ className }) => (
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
    <rect x="3" y="3" width="7" height="9" fill="currentColor" fillOpacity="0.1" />
    <rect x="14" y="3" width="7" height="5" fill="currentColor" fillOpacity="0.1" />
    <rect x="14" y="12" width="7" height="9" fill="currentColor" fillOpacity="0.1" />
    <rect x="3" y="16" width="7" height="5" fill="currentColor" fillOpacity="0.1" />
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);
