import React from 'react';

interface BrandHeaderProps {
    title: string;
    subtitle: string;
}

const BrandHeader: React.FC<BrandHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="w-full text-center animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-snug text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-sky-500">
                {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600">{subtitle}</p>
        </div>
    );
};

export default BrandHeader;