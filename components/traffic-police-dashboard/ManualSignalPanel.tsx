import React, { useState, useContext, useEffect, useMemo } from 'react';
import PanelCard from '../shared/PanelCard';
import { TrafficLightIcon } from '../icons/TrafficLightIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { GearIcon } from '../icons/GearIcon';
import { AlertTriangleIcon } from '../icons/AlertTriangleIcon';

type SignalState = 'go' | 'stop';
type Direction = 'north' | 'south' | 'east' | 'west';

interface JunctionState {
  id: string;
  signals: Record<Direction, SignalState>;
  isAutoMode: boolean;
  isOverrideActive: boolean;
  timer: number;
  currentGreenIndex: number;
}

const SignalControl: React.FC<{
  state: SignalState;
  rotation?: string;
  onClick: () => void;
  disabled: boolean;
}> = ({ state, rotation = '', onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`relative flex items-center justify-center h-12 w-12 rounded-full transition-all duration-300 border-4 shadow-md disabled:cursor-not-allowed disabled:opacity-60
            ${state === 'go' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}
            ${!disabled && state === 'stop' ? 'hover:bg-green-200/70 hover:border-green-400' : ''}`}
    >
        <TrafficLightIcon state={state} className={`h-8 w-8 text-slate-700 transition-transform ${rotation}`} />
    </button>
);

const ManualSignalPanel: React.FC = () => {
    const { t } = useContext(LanguageContext);

    const directions: Direction[] = useMemo(() => ['north', 'east', 'south', 'west'], []);
    const junctionData = useMemo(() => ({
      cc: { name: t('junction_chetak_circle'), cycleTime: 20 },
      fc: { name: t('junction_fatehpura'), cycleTime: 25 },
      dg: { name: t('junction_delhi_gate'), cycleTime: 18 },
    }), [t]);

    const createInitialState = (id: string): JunctionState => ({
      id,
      signals: { north: 'stop', south: 'stop', east: 'stop', west: 'stop' },
      isAutoMode: true,
      isOverrideActive: false,
      timer: junctionData[id as keyof typeof junctionData].cycleTime,
      currentGreenIndex: 0,
    });

    const [selectedJunctionId, setSelectedJunctionId] = useState<keyof typeof junctionData>('cc');
    
    const [junctionStates, setJunctionStates] = useState<Record<keyof typeof junctionData, JunctionState>>(() => ({
        cc: createInitialState('cc'),
        fc: createInitialState('fc'),
        dg: createInitialState('dg'),
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            setJunctionStates(prevStates => {
                const newStates = { ...prevStates };
                Object.keys(newStates).forEach(key => {
                    const id = key as keyof typeof junctionData;
                    const state = newStates[id];
                    if (state.isAutoMode && !state.isOverrideActive) {
                        let newTimer = state.timer - 1;
                        if (newTimer < 0) {
                            const cycleTime = junctionData[id].cycleTime;
                            const newGreenIndex = (state.currentGreenIndex + 1) % directions.length;
                            const newSignals: Record<Direction, SignalState> = { north: 'stop', south: 'stop', east: 'stop', west: 'stop' };
                            newSignals[directions[newGreenIndex]] = 'go';
                            newStates[id] = { ...state, timer: cycleTime, currentGreenIndex: newGreenIndex, signals: newSignals };
                        } else {
                            newStates[id] = { ...state, timer: newTimer };
                        }
                    }
                });
                return newStates;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [directions, junctionData]);
    
    const currentJunction = junctionStates[selectedJunctionId];
    const cycleTime = junctionData[selectedJunctionId].cycleTime;

    const updateJunctionState = (id: keyof typeof junctionData, updates: Partial<JunctionState>) => {
        setJunctionStates(prev => ({
            ...prev,
            [id]: { ...prev[id], ...updates }
        }));
    };

    const handleSignalChange = (direction: Direction) => {
        if (!currentJunction.isOverrideActive) return;
        const newSignals: Record<Direction, SignalState> = { north: 'stop', south: 'stop', east: 'stop', west: 'stop' };
        if (currentJunction.signals[direction] === 'stop') {
            newSignals[direction] = 'go';
        }
        updateJunctionState(selectedJunctionId, { isAutoMode: false, signals: newSignals });
    };

    const handleAllStop = () => {
        if (!currentJunction.isOverrideActive) return;
        updateJunctionState(selectedJunctionId, {
            isAutoMode: false,
            signals: { north: 'stop', south: 'stop', east: 'stop', west: 'stop' },
        });
    };

    const handleEngageOverride = () => {
        updateJunctionState(selectedJunctionId, { isOverrideActive: true, isAutoMode: false });
    };

    const handleReset = () => {
        const initialGreenIndex = 0;
        const initialSignals: Record<Direction, SignalState> = { north: 'stop', south: 'stop', east: 'stop', west: 'stop' };
        initialSignals[directions[initialGreenIndex]] = 'go';

        updateJunctionState(selectedJunctionId, {
            isOverrideActive: false,
            isAutoMode: true,
            timer: cycleTime,
            currentGreenIndex: initialGreenIndex,
            signals: initialSignals,
        });
    };
    
    return (
        <PanelCard title={t('manual_signal_panel_title')} icon={<TrafficLightIcon state="wait" className="h-5 w-5 text-indigo-500" />}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[450px]">
                {/* Visualizer */}
                <div className="lg:col-span-2 bg-slate-800 rounded-lg p-4 flex items-center justify-center">
                    <div className="grid grid-cols-3 grid-rows-3 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] gap-1">
                        <div />
                        <div className="bg-slate-700 relative flex justify-center items-end p-2 border-x-2 border-slate-600">
                             <div className="absolute w-px h-full bg-yellow-400/40 border-0 border-dashed" />
                             <SignalControl state={currentJunction.signals.north} rotation="rotate-180" onClick={() => handleSignalChange('north')} disabled={!currentJunction.isOverrideActive} />
                        </div>
                        <div />
                        <div className="bg-slate-700 relative flex justify-end items-center p-2 border-y-2 border-slate-600">
                            <div className="absolute h-px w-full bg-yellow-400/40 border-0 border-dashed" />
                            <SignalControl state={currentJunction.signals.west} rotation="-rotate-90" onClick={() => handleSignalChange('west')} disabled={!currentJunction.isOverrideActive} />
                        </div>
                        <div className="bg-slate-900 rounded-md flex items-center justify-center border-2 border-slate-600 shadow-inner">
                            {currentJunction.isAutoMode && !currentJunction.isOverrideActive ? (
                                <span className="text-6xl font-bold font-mono text-white tabular-nums">{currentJunction.timer}</span>
                            ) : (
                                <AlertTriangleIcon className="h-16 w-16 text-orange-400" />
                            )}
                        </div>
                        <div className="bg-slate-700 relative flex justify-start items-center p-2 border-y-2 border-slate-600">
                             <div className="absolute h-px w-full bg-yellow-400/40 border-0 border-dashed" />
                             <SignalControl state={currentJunction.signals.east} rotation="rotate-90" onClick={() => handleSignalChange('east')} disabled={!currentJunction.isOverrideActive} />
                        </div>
                        <div />
                        <div className="bg-slate-700 relative flex justify-center items-start p-2 border-x-2 border-slate-600">
                             <div className="absolute w-px h-full bg-yellow-400/40 border-0 border-dashed" />
                             <SignalControl state={currentJunction.signals.south} onClick={() => handleSignalChange('south')} disabled={!currentJunction.isOverrideActive} />
                        </div>
                        <div />
                    </div>
                </div>

                {/* Master Controls */}
                <div className="lg:col-span-1 flex flex-col space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                     <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">{t('select_junction_label')}</label>
                        <div className="flex flex-col space-y-2">
                            {Object.entries(junctionData).map(([id, data]) => {
                                const state = junctionStates[id as keyof typeof junctionData];
                                return (
                                    <button 
                                        key={id} 
                                        onClick={() => setSelectedJunctionId(id as keyof typeof junctionData)}
                                        className={`w-full text-left p-3 rounded-lg border-l-4 transition-all flex items-center justify-between ${selectedJunctionId === id ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                                    >
                                        <div>
                                            <span className={`font-semibold ${selectedJunctionId === id ? 'text-indigo-800' : 'text-slate-800'}`}>{data.name}</span>
                                            <p className={`text-xs font-bold uppercase ${state.isOverrideActive ? 'text-orange-500' : 'text-green-600'}`}>
                                                {state.isOverrideActive ? t('status_manual_override') : t('status_auto')}
                                            </p>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full ${state.isOverrideActive ? 'bg-orange-500' : 'bg-green-500'} animate-pulse`}></div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="flex-grow"></div>
                    
                    <div className="space-y-3">
                         {currentJunction.isOverrideActive ? (
                            <div className="p-3 bg-orange-100 border border-orange-200 rounded-lg text-center space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                <AlertTriangleIcon className="h-5 w-5 text-orange-600" />
                                <h4 className="font-bold text-orange-700">{t('status_manual_override')}</h4>
                                </div>
                                <p className="text-xs text-orange-600">{t('manual_override_warning_short')}</p>
                            </div>
                            ) : (
                            <div className="p-3 bg-green-100 border border-green-200 rounded-lg text-center">
                                <div className="flex items-center justify-center gap-2">
                                <GearIcon className="h-5 w-5 text-green-600" />
                                <h4 className="font-bold text-green-700">{t('auto_mode_active')}</h4>
                                </div>
                            </div>
                        )}
                        
                        {!currentJunction.isOverrideActive ? (
                            <button onClick={handleEngageOverride} className="w-full py-3.5 font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 transition-colors shadow-lg hover:shadow-orange-500/40 flex items-center justify-center gap-2">
                                <AlertTriangleIcon className="h-5 w-5" />
                                {t('engage_manual_override_button')}
                            </button>
                        ) : (
                             <div className="grid grid-cols-2 gap-3">
                                <button onClick={handleAllStop} className="w-full py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors shadow-lg hover:shadow-red-500/40">{t('all_stop_button')}</button>
                                <button onClick={handleReset} className="w-full py-3 font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 border border-indigo-200 transition-colors">{t('reset_to_auto_button')}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center flex items-center justify-center gap-2">
                <AlertTriangleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-800 font-medium">
                    {t('manual_override_warning')}
                </p>
            </div>
        </PanelCard>
    );
};

export default ManualSignalPanel;