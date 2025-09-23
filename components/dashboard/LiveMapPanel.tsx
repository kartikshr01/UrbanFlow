
import React, { useState, useEffect, useContext } from 'react';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';

const LegendItem: React.FC<{ visual: React.ReactNode; label: string }> = ({ visual, label }) => (
    <div className="flex items-center gap-2">
        {visual}
        <span className="text-xs text-[#cad1de]">{label}</span>
    </div>
);

interface TrafficMarkerProps {
    color: string;
    count: number;
    top: string;
    left: string;
    animationDelay?: string;
    junctionName: string;
}

const TrafficMarker: React.FC<TrafficMarkerProps> = ({ color, count, top, left, animationDelay = '0s', junctionName }) => (
  <div className="absolute flex items-center justify-center w-8 h-8 rounded-full transition-all duration-1000 ease-in-out group" style={{ top, left, transform: 'translate(-50%, -50%)' }}>
    <div 
        className={`absolute w-full h-full rounded-full ${color} pulse-marker transition-colors duration-500 group-hover:scale-125`}
        style={{ animationDelay }}
    ></div>
    <div className={`relative w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold border-2 border-white/50 shadow-lg transition-colors duration-500`}>
      {count}
    </div>
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-white text-xs rounded-md px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
        {junctionName}
    </div>
  </div>
);

interface TrafficMarkerData extends TrafficMarkerProps {
    id: number;
}

const getCongestionColor = (count: number): string => {
    if (count > 12) return 'bg-red-500';
    if (count > 8) return 'bg-orange-500';
    if (count > 4) return 'bg-yellow-500';
    return 'bg-green-500';
};

const LiveMapPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const getInitialTrafficData = (): TrafficMarkerData[] => [
    { id: 1, color: "bg-red-500", count: 3, top: "30%", left: "40%", animationDelay: "0s", junctionName: t('junction_chetak_circle') },
    { id: 2, color: "bg-orange-500", count: 1, top: "50%", left: "65%", animationDelay: "0.5s", junctionName: t('junction_delhi_gate') },
    { id: 3, color: "bg-yellow-500", count: 5, top: "75%", left: "25%", animationDelay: "1s", junctionName: t('junction_fatehpura') },
    { id: 4, color: "bg-green-500", count: 8, top: "20%", left: "75%", animationDelay: "0.2s", junctionName: t('junction_shastri_circle') },
    { id: 5, color: "bg-red-500", count: 2, top: "80%", left: "80%", animationDelay: "0.8s", junctionName: t('junction_udaipole') },
  ];

  const [trafficData, setTrafficData] = useState<TrafficMarkerData[]>(getInitialTrafficData);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prevData =>
        prevData.map(marker => {
          if (Math.random() > 0.3) {
            const newCount = Math.floor(Math.random() * 15) + 1;
            const newColor = getCongestionColor(newCount);
            return { ...marker, count: newCount, color: newColor };
          }
          return marker;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const newJunctionNames: { [key: number]: string } = {
        1: t('junction_chetak_circle'),
        2: t('junction_delhi_gate'),
        3: t('junction_fatehpura'),
        4: t('junction_shastri_circle'),
        5: t('junction_udaipole'),
    };
    setTrafficData(currentData =>
        currentData.map(marker => ({
            ...marker,
            junctionName: newJunctionNames[marker.id] || marker.junctionName
        }))
    );
  }, [t]);


  return (
    <PanelCard 
      title={t('live_map_panel_title')}
      badge={<span className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-200">
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
        {t('common_active_corridor')}
      </span>}
    >
      <style>{`
        @keyframes pulse-marker {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(2.5); opacity: 0; }
        }
        .pulse-marker { animation: pulse-marker 2s infinite ease-out; }

        @keyframes pulse-path {
            0% { stroke-opacity: 1; stroke-width: 3px; }
            50% { stroke-opacity: 0.5; stroke-width: 4px; }
            100% { stroke-opacity: 1; stroke-width: 3px; }
        }
        .emergency-corridor-path { animation: pulse-path 2s ease-in-out infinite; }
        
        @keyframes scan {
          0% { transform: translateY(-10%); }
          100% { transform: translateY(100vh); }
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to bottom, rgba(34, 197, 94, 0), rgba(34, 197, 94, 0.4), rgba(34, 197, 94, 0));
          animation: scan 5s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="relative w-full h-full min-h-[300px] bg-slate-800 rounded-lg overflow-hidden border border-slate-700/80">
        <img src="https://raw.githubusercontent.com/google/aistudio/main/assets/app-assets/ems-map-bg-dark.png" alt={t('alt_map')} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        
        <div className="absolute inset-0 bg-[radial-gradient(#4f5a7a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="scan-line"></div>
        
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 50,250 Q 150,50 350,50"
            stroke="#22c55e"
            fill="none"
            strokeLinecap="round"
            className="emergency-corridor-path"
            style={{ filter: 'url(#glow)' }}
          />
        </svg>

        {trafficData.map(marker => (
            <TrafficMarker
                key={marker.id}
                color={marker.color}
                count={marker.count}
                top={marker.top}
                left={marker.left}
                animationDelay={marker.animationDelay}
                junctionName={marker.junctionName}
            />
        ))}

        <div className="absolute top-3 right-3 bg-slate-800/80 p-3 rounded-lg border border-slate-600/80 space-y-2 backdrop-blur-sm text-white">
            <h3 className="text-xs font-semibold text-slate-200 mb-1">{t('legend_title')}</h3>
            <LegendItem visual={<div className="w-3 h-3 rounded-full bg-green-500"></div>} label={t('legend_low_congestion')} />
            <LegendItem visual={<div className="w-3 h-3 rounded-full bg-yellow-500"></div>} label={t('legend_medium_congestion')} />
            <LegendItem visual={<div className="w-3 h-3 rounded-full bg-orange-500"></div>} label={t('legend_high_congestion')} />
            <LegendItem visual={<div className="w-3 h-3 rounded-full bg-red-500"></div>} label={t('legend_critical_congestion')} />
            <LegendItem 
              visual={<svg width="12" height="12" viewBox="0 0 12 12"><line x1="0" y1="6" x2="12" y2="6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" /></svg>} 
              label={t('legend_active_corridor')}
            />
        </div>
      </div>
    </PanelCard>
  );
};

export default LiveMapPanel;