import React from 'react';

interface IconProps {
  className?: string;
}

export const LaneChangeIcon: React.FC<IconProps> = ({ className }) => (
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
    <title>Lane Direction Changed</title>
    <path d="M6 3v18" />
    <path d="M18 3v18" />
    <path d="m10 6-4 4 4 4" />
    <path d="m14 10 4 4-4 4" />
  </svg>
);