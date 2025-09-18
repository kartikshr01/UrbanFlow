import React, { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { GlobeIcon } from '../icons/GlobeIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = {
    en: 'English',
    hi: 'हिन्दी',
    or: 'ଓଡ଼ିଆ',
  };

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

  const handleLanguageChange = (lang: 'en' | 'hi' | 'or') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change language"
      >
        <GlobeIcon className="h-4 w-4" />
        <span>{languages[language]}</span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div 
            className="absolute z-[1000] mt-2 w-36 origin-top-right rounded-lg border border-slate-200 bg-white shadow-lg right-0 transition-all duration-150 ease-out animate-fade-in"
            role="listbox" style={{ animationDuration: '0.2s' }}
        >
            <ul className="p-1.5">
                <li
                    onClick={() => handleLanguageChange('en')}
                    className="cursor-pointer rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 transition-colors duration-150"
                    role="option"
                    aria-selected={language === 'en'}
                >
                    English
                </li>
                <li
                    onClick={() => handleLanguageChange('hi')}
                    className="cursor-pointer rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 transition-colors duration-150"
                    role="option"
                    aria-selected={language === 'hi'}
                >
                    हिन्दी
                </li>
                 <li
                    onClick={() => handleLanguageChange('or')}
                    className="cursor-pointer rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 transition-colors duration-150"
                    role="option"
                    aria-selected={language === 'or'}
                >
                    ଓଡ଼ିଆ
                </li>
            </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;