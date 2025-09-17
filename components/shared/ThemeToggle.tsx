
import React, { useContext } from 'react';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { LanguageContext } from '../../contexts/LanguageContext';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const { t } = useContext(LanguageContext);
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 text-sm font-semibold text-slate-500 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 rounded-full shadow-xl dark:shadow-black/50 backdrop-blur-sm border dark:border-white/10 border-slate-200/80 hover:scale-110 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-200"
      aria-label={theme === 'dark' ? t("aria_switch_to_light") : t("aria_switch_to_dark")}
    >
      {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
    </button>
  );
};

export default ThemeToggle;
