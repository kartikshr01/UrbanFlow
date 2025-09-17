
import React, { useState, useContext, useEffect } from 'react';
import PanelCard from '../shared/PanelCard';
import { TrafficLightIcon } from '../icons/TrafficLightIcon';
import { LanguageContext } from '../../contexts/LanguageContext';
import { JunctionIcon } from '../icons/JunctionIcon';
import { LockClosedIcon } from '../icons/LockClosedIcon';

type SignalState = 'go' | 'stop';
type Direction = 'north' | 'south' | 'east' | 'west';

const SignalButton: React.FC<{ direction: string; state: SignalState; onClick: () => void; disabled: boolean; ariaLabel: string }> = ({ direction, state, onClick, disabled, ariaLabel }) => (
    <div className="flex flex-col items-center gap-2">
        <p className="font-bold text-lg text-[#1d293d]">{direction}</p>
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center h-16 w-16 rounded-full transition-all border-4 ${state === 'go' ? 'bg-green-100 border-green-300 ring-4 ring-green-400' : 'bg-red-100 border-red-300'} ${disabled ? 'cursor-not-allowed' : 'hover:bg-red-200'}`} 
            aria-label={ariaLabel}
        >
            <TrafficLightIcon state={state} className="h-10 w-10 text-slate-700" />
        </button>
    </div>
);

const ManualSignalPanel: React.FC = () => {
    const { t } = useContext(LanguageContext);

    const junctions = [
      { id: 'cc', name: t('junction_chetak_circle') },
      { id: 'fc', name: t('junction_fatehpura') },
      { id: 'dg', name: t('junction_delhi_gate') },
    ];

    const [selectedJunctionId, setSelectedJunctionId] = useState(junctions[0].id);
    const [signals, setSignals] = useState<Record<Direction, SignalState>>({ north: 'stop', south: 'stop', east: 'stop', west: 'stop' });
    const [isAutoMode, setIsAutoMode] = useState(true);
    const [isOverrideActive, setIsOverrideActive] = useState(false);
    const [timer, setTimer] = useState(20);
    const [currentGreenIndex, setCurrentGreenIndex] = useState(0);

    const directions: Direction[] = ['north', 'east', 'south', 'west'];

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isAutoMode && !isOverrideActive) {
            const newSignals: Record<Direction, SignalState> = { north: 'stop', south: 'stop', east: 'stop', west: 'stop' };
            newSignals[directions[currentGreenIndex]] = 'go';
            setSignals(newSignals);

            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setCurrentGreenIndex(i => (i + 1) % directions.length);
                        return 20;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isAutoMode, isOverrideActive, currentGreenIndex]);

    const handleSignalChange = (direction: Direction) => {
        if (!isOverrideActive) return;
        setIsAutoMode(false);
        const newSignals: Record<Direction, SignalState> = { north: 'stop', south: 'stop', east: 'stop', west: 'stop' };
        if (signals[direction] === 'stop') {
             newSignals[direction] = 'go';
        }
        setSignals(newSignals);
    };
    
    const handleAllStop = () => {
        if (!isOverrideActive) return;
        setIsAutoMode(false);
        setSignals({ north: 'stop', south: 'stop', east: 'stop', west: 'stop' });
    };

    const handleEngageOverride = () => {
        setIsOverrideActive(true);
        setIsAutoMode(false);
        setTimer(0);
    };

    const handleReset = () => {
        setIsOverrideActive(false);
        setIsAutoMode(true);
        setCurrentGreenIndex(0);
        setTimer(20);
    };

    return (
        <PanelCard title={t('manual_signal_panel_title')} icon={<TrafficLightIcon state="wait" className="h-5 w-5 text-indigo-500" />}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Control Section */}
                <div className="relative lg:col-span-2">
                    <div className={`grid grid-cols-3 grid-rows-3 gap-4 items-center justify-center p-4 bg-slate-100 rounded-lg border border-slate-200/80 transition-opacity ${!isOverrideActive ? 'opacity-50' : ''}`}>
                        <div className="col-start-2 row-start-1 flex justify-center">
                            {/* FIX: The 't' function does not handle interpolation. Using string.replace() to insert dynamic values. */}
                            <SignalButton direction={t('direction_north')} state={signals.north} onClick={() => handleSignalChange('north')} disabled={!isOverrideActive} ariaLabel={t(signals.north === 'go' ? 'aria_set_direction_stop' : 'aria_set_direction_go').replace('{direction}', t('direction_north'))} />
                        </div>
                        <div className="col-start-1 row-start-2 flex justify-center">
                            {/* FIX: The 't' function does not handle interpolation. Using string.replace() to insert dynamic values. */}
                            <SignalButton direction={t('direction_west')} state={signals.west} onClick={() => handleSignalChange('west')} disabled={!isOverrideActive} ariaLabel={t(signals.west === 'go' ? 'aria_set_direction_stop' : 'aria_set_direction_go').replace('{direction}', t('direction_west'))} />
                        </div>
                        <div className="col-start-2 row-start-2 flex justify-center items-center">
                            <JunctionIcon className="h-20 w-20 text-slate-400" />
                        </div>
                        <div className="col-start-3 row-start-2 flex justify-center">
                            {/* FIX: The 't' function does not handle interpolation. Using string.replace() to insert dynamic values. */}
                            <SignalButton direction={t('direction_east')} state={signals.east} onClick={() => handleSignalChange('east')} disabled={!isOverrideActive} ariaLabel={t(signals.east === 'go' ? 'aria_set_direction_stop' : 'aria_set_direction_go').replace('{direction}', t('direction_east'))} />
                        </div>
                        <div className="col-start-2 row-start-3 flex justify-center">
                            {/* FIX: The 't' function does not handle interpolation. Using string.replace() to insert dynamic values. */}
                            <SignalButton direction={t('direction_south')} state={signals.south} onClick={() => handleSignalChange('south')} disabled={!isOverrideActive} ariaLabel={t(signals.south === 'go' ? 'aria_set_direction_stop' : 'aria_set_direction_go').replace('{direction}', t('direction_south'))} />
                        </div>
                    </div>
                    {!isOverrideActive && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="text-center bg-slate-800/80 text-white p-6 rounded-xl backdrop-blur-sm">
                                <LockClosedIcon className="h-10 w-10 mx-auto text-yellow-300" />
                                <p className="mt-2 font-bold text-lg">{t('controls_locked')}</p>
                                <p className="text-sm text-slate-300">{t('engage_override_prompt')}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Master Controls & Info Section */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                     <div>
                        <label className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('select_junction_label')}</label>
                        <div className="flex flex-wrap items-center gap-2">
                            {junctions.map(j => (
                                <button 
                                    key={j.id} 
                                    onClick={() => setSelectedJunctionId(j.id)}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg border-2 transition-all ${selectedJunctionId === j.id ? 'bg-indigo-600 text-white border-transparent' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    {j.name}
                                </button>
                            ))}
                        </div>
                     </div>
                     
                     {isAutoMode && !isOverrideActive && (
                        <div className="text-center bg-indigo-50 p-3 rounded-lg border border-indigo-200 animate-fade-in">
                            <p className="font-semibold text-sm text-indigo-700">{t('auto_mode_active')}</p>
                            <p className="text-4xl font-bold text-indigo-900">{timer}<span className="text-xl">{t('seconds_short')}</span></p>
                            <p className="text-xs text-indigo-500">{t('time_remaining')}</p>
                        </div>
                    )}
                    
                     <div className="flex flex-col gap-3 flex-grow justify-end">
                        {!isOverrideActive ? (
                            <button onClick={handleEngageOverride} className="w-full py-3 font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 transition-colors shadow-lg hover:shadow-orange-500/40">{t('engage_manual_override_button')}</button>
                        ) : (
                            <>
                                <button onClick={handleReset} className="w-full py-3 font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 border border-indigo-200 transition-colors">{t('reset_to_auto_button')}</button>
                                <button onClick={handleAllStop} className="w-full py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors shadow-lg hover:shadow-red-500/40">{t('all_stop_button')}</button>
                            </>
                        )}
                     </div>
                </div>
            </div>
             <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-sm text-yellow-800 font-medium">
                    {t('manual_override_warning')}
                </p>
            </div>
        </PanelCard>
    );
};

export default ManualSignalPanel;
