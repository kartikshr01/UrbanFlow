import React from 'react';

interface IconProps {
  className?: string;
  state: 'go' | 'wait' | 'stop';
}

export const TrafficLightIcon: React.FC<IconProps> = ({ className, state }) => (
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
        <rect x="7" y="2" width="10" height="20" rx="3" fill="currentColor" fillOpacity="0.1"/>
        <rect x="7" y="2" width="10" height="20" rx="3" />
        <circle cx="12" cy="7" r="2.5" fill={state === 'stop' ? '#ef4444' : 'currentColor'} opacity={state === 'stop' ? '1' : '0.2'} stroke="none" />
        <circle cx="12" cy="12" r="2.5" fill={state === 'wait' ? '#f59e0b' : 'currentColor'} opacity={state === 'wait' ? '1' : '0.2'} stroke="none" />
        <circle cx="12" cy="17" r="2.5" fill={state === 'go' ? '#22c55e' : 'currentColor'} opacity={state === 'go' ? '1' : '0.2'} stroke="none" />
    </svg>
);