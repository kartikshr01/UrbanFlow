import React from 'react';

interface IconProps {
  className?: string;
}

export const TrafficSystemLogoIcon: React.FC<IconProps> = ({ className }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(99, 102, 241, 0.15)" />
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m8.5 14.5 7-5" />
    <path d="m15.5 14.5-7-5" />
    <path d="M12 12.5v-4" />
  </svg>
);