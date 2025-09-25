import React, { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext, Language } from '../../contexts/LanguageContext';
import { GlobeIcon } from '../icons/GlobeIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { TranslationKey } from '../../translations';

const languageOptions: { key: Language; labelKey: TranslationKey }[] = [
    { key: 'en', labelKey: 'lang_en' },
    { key: 'hi', labelKey: 'lang_hi' },
    { key: 'or', labelKey: 'lang_or' },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  const currentLanguageLabel = languageOptions.find(l => l.key === language)?.labelKey ?? 'lang_en';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('aria_change_language')}
      >
        <GlobeIcon className="h-4 w-4" />
        <span>{t(currentLanguageLabel)}</span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div 
            className="absolute z-[1000] mt-2 w-36 origin-top-right rounded-lg border border-slate-200 bg-white shadow-lg right-0 transition-all duration-150 ease-out animate-fade-in"
            role="listbox" style={{ animationDuration: '0.2s' }}
        >
            <ul className="p-1.5">
                {languageOptions.map(opt => (
                     <li
                        key={opt.key}
                        onClick={() => handleLanguageChange(opt.key)}
                        className="cursor-pointer rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 transition-colors duration-150"
                        role="option"
                        aria-selected={language === opt.key}
                    >
                        {t(opt.labelKey)}
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;