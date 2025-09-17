
import React, { useState, useMemo, useContext, useEffect } from 'react';
import PanelCard from '../shared/PanelCard';
import { RoadsIcon } from '../icons/RoadsIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ArrowNarrowLeftIcon } from '../icons/ArrowNarrowLeftIcon';
import { ArrowNarrowRightIcon } from '../icons/ArrowNarrowRightIcon';

type Location = {
  id: string;
  name: string;
  totalLanes: number;
  dirAName: string;
  dirBName: string;
};

const LaneDividerControlPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const locations: Location[] = [
    { id: 'anmr', name: t('location_ashok_nagar'), totalLanes: 6, dirAName: t('dir_northbound'), dirBName: t('dir_southbound') },
    { id: 'dnr', name: t('location_durga_nursery'), totalLanes: 4, dirAName: t('dir_eastbound'), dirBName: t('dir_westbound') },
    { id: 'sm', name: t('location_saheli_marg'), totalLanes: 4, dirAName: t('dir_clockwise'), dirBName: t('dir_anticlockwise') },
  ];
  
  const [locationId, setLocationId] = useState<string>(locations[0].id);
  
  const selectedLocation = useMemo(() => locations.find(loc => loc.id === locationId)!, [locationId, t]);
  
  const [lanesDirA, setLanesDirA] = useState(Math.ceil(selectedLocation.totalLanes / 2));

  useEffect(() => {
    const newLocation = locations.find(loc => loc.id === locationId)!;
    setLanesDirA(Math.ceil(newLocation.totalLanes / 2));
  }, [locationId, t]);
  
  const shiftLeft = () => {
    if (lanesDirA > 1) {
        setLanesDirA(lanesDirA - 1);
    }
  };

  const shiftRight = () => {
    if (lanesDirA < selectedLocation.totalLanes - 1) {
        setLanesDirA(lanesDirA + 1);
    }
  };

  const handleSetDefault = () => {
    setLanesDirA(Math.ceil(selectedLocation.totalLanes / 2));
  };

  const lanesDirB = selectedLocation.totalLanes - lanesDirA;
  const dividerPosition = lanesDirA;

  return (
    <PanelCard title={t('lane_divider_panel_title')} icon={<RoadsIcon className="h-5 w-5 text-indigo-500" />}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Visualizer */}
        <div className="md:col-span-3 flex flex-col justify-center">
            <style>{`
                @keyframes move-chevron {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 -40px; }
                }
                .chevron-animate {
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        -45deg,
                        rgba(255,255,255,0.05),
                        rgba(255,255,255,0.05) 10px,
                        transparent 10px,
                        transparent 20px
                    );
                    background-size: 100% 40px;
                    animation: move-chevron 1.5s linear infinite;
                }
                .chevron-animate-b {
                    animation-direction: reverse;
                }
            `}</style>
            <div className="w-full p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-inner">
                <div className="flex justify-between items-center mb-2 px-1">
                    <span className="font-bold text-sky-300 text-sm">{selectedLocation.dirAName}</span>
                    <span className="font-bold text-fuchsia-300 text-sm">{selectedLocation.dirBName}</span>
                </div>
                <div className="relative flex w-full h-48 bg-slate-700 rounded-md overflow-hidden">
                    {[...Array(selectedLocation.totalLanes)].map((_, i) => (
                        <div key={i} className={`relative flex-1 h-full overflow-hidden transition-colors duration-500 ease-in-out ${i < dividerPosition ? 'bg-sky-500/30' : 'bg-fuchsia-500/30'}`}>
                           <div className={`chevron-animate ${i >= dividerPosition ? 'chevron-animate-b' : ''}`}></div>
                        </div>
                    ))}
                    <div 
                        className="absolute top-0 bottom-0 w-1.5 bg-yellow-400 transition-all duration-500 ease-in-out border-x-2 border-slate-800"
                        style={{ 
                            left: `calc(${(dividerPosition / selectedLocation.totalLanes) * 100}% - 3px)`,
                            backgroundImage: 'repeating-linear-gradient(to bottom, #facc15, #facc15 10px, transparent 10px, transparent 20px)'
                        }}
                    ></div>
                </div>
            </div>
        </div>
        
        {/* Controls */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#7a8596] mb-2">{t('select_location_label')}</label>
            <div className="flex flex-wrap items-center gap-2">
              {locations.map(loc => (
                <button 
                  key={loc.id} 
                  onClick={() => setLocationId(loc.id)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg border-2 transition-all ${locationId === loc.id ? 'bg-indigo-600 text-white border-transparent' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-center text-[#7a8596] mb-2">{t('lane_distribution_label')}</label>
             <div className="flex items-center justify-center gap-4">
                <button 
                    onClick={shiftLeft} 
                    disabled={lanesDirA <= 1}
                    className="p-3 bg-slate-200 rounded-full hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                    aria-label={t('shift_left_button')}
                >
                    <ArrowNarrowLeftIcon className="h-6 w-6" />
                </button>
                <div className="text-center font-semibold text-indigo-700 bg-indigo-50 py-2 px-4 w-60 rounded-lg border border-indigo-200">
                    <p>{lanesDirA} {selectedLocation.dirAName}</p>
                    <p className="text-xs text-indigo-500">|</p>
                    <p>{lanesDirB} {selectedLocation.dirBName}</p>
                </div>
                <button 
                    onClick={shiftRight} 
                    disabled={lanesDirA >= selectedLocation.totalLanes - 1}
                    className="p-3 bg-slate-200 rounded-full hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                    aria-label={t('shift_right_button')}
                >
                    <ArrowNarrowRightIcon className="h-6 w-6" />
                </button>
             </div>
          </div>
          <div className="flex-grow"></div>
           <div className="grid grid-cols-2 gap-3">
                <button onClick={handleSetDefault} className="w-full bg-slate-200 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-300 transition-all">
                    {t('set_to_default_button')}
                </button>
                <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/40">
                    {t('apply_config_button')}
                </button>
            </div>
        </div>

      </div>
    </PanelCard>
  );
};

export default LaneDividerControlPanel;
