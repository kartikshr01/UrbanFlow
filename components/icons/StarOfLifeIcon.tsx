import React from 'react';

interface IconProps {
  className?: string;
}

export const StarOfLifeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <title>Star of Life</title>
    <path d="M12 2 L10.12 7.24 L4.24 6.2 L6.2 10.12 L2 12 L6.2 13.88 L4.24 17.8 L10.12 16.76 L12 22 L13.88 16.76 L19.76 17.8 L17.8 13.88 L22 12 L17.8 10.12 L19.76 6.2 L13.88 7.24 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M12 2 L10.12 7.24 L4.24 6.2 L6.2 10.12 L2 12 L6.2 13.88 L4.24 17.8 L10.12 16.76 L12 22 L13.88 16.76 L19.76 17.8 L17.8 13.88 L22 12 L17.8 10.12 L19.76 6.2 L13.88 7.24 Z" />
    <path d="M12 16V8" />
    <path d="M14 9s-1-1.5-2-1.5S10 9 10 9" />
    <path d="m13.5 14.5-1.5-2-1.5 2" />
    <path d="m10.5 11.5 1.5 2 1.5-2" />
  </svg>
);
