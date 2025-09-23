import React, { useState, useMemo, useContext, useEffect } from 'react';
import PanelCard from '../shared/PanelCard';
import { RoadsIcon } from '../icons/RoadsIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { TrafficConeIcon } from '../icons/TrafficConeIcon';

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
    { id: 'sm', name: t('location_saheli_marg'), totalLanes: 6, dirAName: t('dir_clockwise'), dirBName: t('dir_anticlockwise') },
  ];
  
  const [locationId, setLocationId] = useState<string>(locations[0].id);
  const selectedLocation = useMemo(() => locations.find(loc => loc.id === locationId)!, [locationId, t]);
  const [lanesDirA, setLanesDirA] = useState(Math.ceil(selectedLocation.totalLanes / 2));
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const newLocation = locations.find(loc => loc.id === locationId) || locations[0];
    setLanesDirA(Math.ceil(newLocation.totalLanes / 2));
  }, [locationId, t]);

  const handleApplyConfig = () => {
    setIsApplying(true);
    setShowSuccess(false);
    setTimeout(() => {
      setIsApplying(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    }, 1500);
  };
  
  const handleSetDefault = () => {
    setLanesDirA(Math.ceil(selectedLocation.totalLanes / 2));
  };

  const lanesDirB = selectedLocation.totalLanes - lanesDirA;
  const dividerPosition = lanesDirA;

  return (
    <PanelCard title={t('lane_divider_panel_title')} icon={<RoadsIcon className="h-5 w-5 text-indigo-500" />}>
      <style>{`
        @keyframes move-flow {
            from { background-position: center 0; }
            to { background-position: center 80px; }
        }
        .flow-animate {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M15 10 L25 20 L15 30' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-repeat: repeat-y;
            background-size: auto 80px;
            animation: move-flow 2s linear infinite;
        }
        .flow-animate-b {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M25 30 L15 20 L25 10' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
        .custom-range {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 9999px;
            background: #e2e8f0; /* slate-200 */
        }
        .custom-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #4f46e5; /* indigo-600 */
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 0 2px #c7d2fe; /* indigo-200 */
        }
        .custom-range::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #4f46e5;
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 0 2px #c7d2fe;
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Visualizer */}
        <div className="md:col-span-3 flex flex-col justify-center">
            <div className="w-full p-4 bg-slate-900 rounded-lg border border-slate-700 shadow-inner">
                <div className="relative w-full h-64 bg-slate-800 rounded-md overflow-hidden [perspective:800px] border-4 border-slate-600">
                    <div className="absolute inset-0 [transform:rotateX(25deg)] scale-[1.2] top-4">
                        <div className="w-full h-full flex">
                            {[...Array(selectedLocation.totalLanes)].map((_, i) => (
                                <div key={i} className="relative flex-1 h-full border-r-4 border-dashed border-slate-600 last:border-r-0">
                                    <div className={`flow-animate ${i >= dividerPosition ? 'flow-animate-b' : ''}`}></div>
                                </div>
                            ))}
                        </div>
                        <div 
                            className="absolute top-0 bottom-0 w-8 flex flex-col items-center justify-around transition-all duration-300 ease-out"
                            style={{ left: `calc(${(dividerPosition / selectedLocation.totalLanes) * 100}% - 16px)` }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="relative w-full h-1/6 flex items-center justify-center">
                                    <TrafficConeIcon className="h-6 w-6 text-orange-400 drop-shadow-lg" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 px-1">
                    <div className="text-left w-2/5">
                        <p className="font-bold text-sky-300 text-sm truncate">{selectedLocation.dirAName}</p>
                        <p className="text-3xl font-black text-white">{lanesDirA}</p>
                    </div>
                    <div className="text-center text-slate-400 text-xs font-mono uppercase">Lanes</div>
                    <div className="text-right w-2/5">
                        <p className="font-bold text-fuchsia-300 text-sm truncate">{selectedLocation.dirBName}</p>
                        <p className="text-3xl font-black text-white">{lanesDirB}</p>
                    </div>
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
             <label htmlFor="lane-slider" className="block text-sm font-medium text-center text-[#7a8596] mb-2">{t('lane_distribution_label')}</label>
             <div className="w-full pt-2">
                <input 
                    id="lane-slider"
                    type="range"
                    min="1"
                    max={selectedLocation.totalLanes - 1}
                    value={lanesDirA}
                    onChange={(e) => setLanesDirA(parseInt(e.target.value))}
                    className="custom-range"
                    aria-label={t('lane_distribution_label')}
                />
            </div>
          </div>
          <div className="flex-grow"></div>
           <div className="grid grid-cols-2 gap-3">
                <button onClick={handleSetDefault} className="w-full bg-slate-200 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-300 transition-all">
                    {t('set_to_default_button')}
                </button>
                <button 
                  onClick={handleApplyConfig}
                  disabled={isApplying || showSuccess} 
                  className={`w-full font-semibold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center
                  ${showSuccess 
                    ? 'bg-green-500 text-white hover:bg-green-500'
                    : `bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/40 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-wait`
                  }`}
                >
                    {isApplying ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : showSuccess ? (
                        <CheckCircleIcon className="h-6 w-6" />
                    ) : (
                        t('apply_config_button')
                    )}
                </button>
            </div>
        </div>

      </div>
    </PanelCard>
  );
};

export default LaneDividerControlPanel;