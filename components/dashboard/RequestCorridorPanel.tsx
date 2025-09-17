
import React, { useState, useRef, useEffect, useContext } from 'react';
import { SirenIcon } from '../icons/SirenIcon';
import { PinIcon } from '../icons/PinIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import PanelCard from '../shared/PanelCard';
import { LanguageContext } from '../../contexts/LanguageContext';

const RequestCorridorPanel: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const priorityLevels = [
    { value: 'critical', label: t('priority_critical'), description: t('priority_critical_desc'), color: 'bg-red-500', textColor: 'text-red-600' },
    { value: 'high', label: t('priority_high'), description: t('priority_high_desc'), color: 'bg-orange-500', textColor: 'text-orange-600' },
    { value: 'medium', label: t('priority_medium'), description: t('priority_medium_desc'), color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  ];
  
  type Priority = typeof priorityLevels[0];

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>(priorityLevels[0]);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const priorityDropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target as Node)) {
        setIsPriorityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    // Update selected priority when language changes
    const currentPriority = priorityLevels.find(p => p.value === selectedPriority.value);
    if (currentPriority) {
        setSelectedPriority(currentPriority);
    }
  }, [t]);


  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
        },
        (error) => {
          console.error("Error getting location:", error);
          let userMessage = t('error_location_generic');
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              userMessage = t('error_location_denied');
              break;
            case 2: // POSITION_UNAVAILABLE
              userMessage = t('error_location_unavailable');
              break;
            case 3: // TIMEOUT
              userMessage = t('error_location_timeout');
              break;
          }
          alert(userMessage);
        }
      );
    } else {
      alert(t('error_location_unsupported'));
    }
  };

  const isFormValid = latitude.trim() !== '' && longitude.trim() !== '' && destination.trim() !== '';

  return (
    <PanelCard title={t('request_corridor_panel_title')} icon={<SirenIcon className="h-5 w-5 text-indigo-500" />}>
      <form className="flex flex-col h-full space-y-4">
        <div>
          <label htmlFor="unit-id" className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('unit_identifier_label')}</label>
          <input type="text" id="unit-id" placeholder={t('unit_identifier_placeholder')} className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all" />
        </div>
        
        <div>
          <label htmlFor="priority-button" className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('priority_level_label')}</label>
          <div className="relative" ref={priorityDropdownRef}>
            <input type="hidden" id="priority" name="priority" value={selectedPriority.value} />
            <button
              id="priority-button"
              type="button"
              onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
              className="w-full flex justify-between items-center rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-left text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 hover:bg-slate-200"
              aria-haspopup="listbox"
              aria-expanded={isPriorityDropdownOpen}
            >
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${selectedPriority.color}`}></span>
                <span className="font-semibold">{selectedPriority.label}:</span>
                <span className="text-sm text-[#7a8596]">{selectedPriority.description}</span>
              </span>
              <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isPriorityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPriorityDropdownOpen && (
              <div 
                className="absolute z-10 mt-2 w-full origin-top rounded-lg border border-slate-200 bg-white shadow-lg transition-all duration-150 ease-out animate-fade-in"
                role="listbox" style={{ animationDuration: '0.2s' }}
              >
                <ul className="max-h-60 overflow-auto p-1.5">
                  {priorityLevels.map((priority) => (
                    <li
                      key={priority.value}
                      onClick={() => {
                        setSelectedPriority(priority);
                        setIsPriorityDropdownOpen(false);
                      }}
                      className="cursor-pointer rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 transition-colors duration-150 flex items-start gap-3"
                      role="option"
                      aria-selected={selectedPriority.value === priority.value}
                    >
                      <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${priority.color}`}></span>
                      <div>
                        <span className={`font-semibold ${priority.textColor}`}>{priority.label}</span>
                        <p className="text-sm text-[#7a8596]">{priority.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('destination_label')}</label>
          <input 
            type="text" 
            id="destination" 
            placeholder={t('destination_placeholder')} 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all" />
        </div>
        <div>
           <label className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('current_location_label')}</label>
           <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder={t('latitude_placeholder')} 
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all" />
            <input 
              type="text" 
              placeholder={t('longitude_placeholder')} 
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all" />
            <button 
              type="button" 
              onClick={handleGetLocation} 
              className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors flex-shrink-0"
              aria-label={t('aria_get_location')}
            >
              <PinIcon className="h-5 w-5 text-white" />
            </button>
           </div>
        </div>
        <div className="flex-grow flex flex-col">
          <label htmlFor="description" className="block text-sm font-medium text-[#7a8596] mb-1.5">{t('emergency_description_label')}</label>
          <textarea id="description" rows={4} placeholder={t('emergency_description_placeholder')} className="w-full flex-grow bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 resize-none transition-all"></textarea>
        </div>
        <button 
          type="submit" 
          disabled={!isFormValid}
          className="w-full mt-auto bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-white shadow-lg hover:shadow-red-500/40 disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100"
        >
          {t('request_corridor_panel_title')}
        </button>
      </form>
    </PanelCard>
  );
};

export default RequestCorridorPanel;
