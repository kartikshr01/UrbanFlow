import React from 'react';

interface PanelCardProps {
  title: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const PanelCard: React.FC<PanelCardProps> = ({ title, icon, badge, children, className = '' }) => (
  <div className={`h-full flex flex-col bg-white border-slate-200 border rounded-2xl p-6 shadow-md shadow-slate-200/60 ${className}`}>
    <div className={`flex items-center gap-3 mb-4 ${badge ? 'justify-between' : ''}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-100">
             {icon}
          </div>
        )}
        <h2 className="text-lg font-semibold text-[#1d293d]">{title}</h2>
      </div>
      {badge}
    </div>
    <div className="flex-grow min-h-0">
      {children}
    </div>
  </div>
);

export default PanelCard;