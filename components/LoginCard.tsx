import React, { useState, useRef, useEffect, useContext } from 'react';
import { AgencyRole } from '../types';
import { AGENCY_ROLES } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';
import { TrafficSystemLogoIcon } from './icons/TrafficSystemLogoIcon';
import { EyeOpenIcon } from './icons/EyeOpenIcon';
import { EyeClosedIcon } from './icons/EyeClosedIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import LanguageSelector from './shared/LanguageSelector';

interface LoginCardProps {
  onLoginSuccess: (role: AgencyRole) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLoginSuccess }) => {
  const [agencyRole, setAgencyRole] = useState<AgencyRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [is2faStep, setIs2faStep] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agencyRole) return;
    if (!is2faStep) {
      setIs2faStep(true);
    } else {
      console.log({
        agencyRole,
        username,
        password,
        twoFactorCode
      });
      onLoginSuccess(agencyRole);
    }
  };

  const handleTwoFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setTwoFactorCode(value);
    }
  };

  const selectedRole = AGENCY_ROLES.find(role => role.value === agencyRole);

  return (
    <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/60 border-slate-200 border animate-fade-in">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 border border-indigo-200" style={{ animation: 'pulse-glow 4s infinite' }}>
          <TrafficSystemLogoIcon className="h-8 w-8 text-indigo-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight leading-snug text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-sky-500">{t('login_title')}</h1>
        <p className="text-lg text-slate-600">{t('login_system_name')}</p>
        <p className="mt-4 text-sm text-[#7a8596]">{t('login_subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Agency Role */}
        <div>
          <label htmlFor="agency-role-button" className="block text-sm font-medium text-[#1d293d] mb-2">{t('agency_role')}</label>
          <div className="relative" ref={dropdownRef}>
            <button
              id="agency-role-button"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-left text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-100"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span>{selectedRole ? t(selectedRole.labelKey) : t('select_agency_role')}</span>
              <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute z-10 mt-2 w-full origin-top rounded-lg border border-slate-200 bg-white shadow-lg transition-all duration-150 ease-out animate-fade-in"
                role="listbox" style={{ animationDuration: '0.2s' }}
              >
                <ul className="max-h-60 overflow-auto p-1.5">
                  {AGENCY_ROLES.map((role) => (
                    <li
                      key={role.value}
                      onClick={() => {
                        setAgencyRole(role.value);
                        setIsDropdownOpen(false);
                      }}
                      className="cursor-pointer rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 transition-colors duration-150"
                      role="option"
                      aria-selected={agencyRole === role.value}
                    >
                      {t(role.labelKey)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-[#1d293d] mb-2">{t('username')}</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('placeholder_username')}
            required
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-100"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-[#1d293d] mb-2">{t('password')}</label>
          <input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('placeholder_password')}
            required
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-100"
          />
          <button
            type="button"
            onClick={handlePasswordVisibilityToggle}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600 transition-colors mt-8"
            aria-label={isPasswordVisible ? t('aria_hide_password') : t('aria_show_password')}
          >
            {isPasswordVisible ? (
              <EyeOpenIcon className="h-5 w-5" />
            ) : (
              <EyeClosedIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {is2faStep && (
          <div className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
            <label htmlFor="2fa-code" className="block text-sm font-medium text-[#1d293d] mb-2">{t('two_factor_code')}</label>
            <input
              id="2fa-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={twoFactorCode}
              onChange={handleTwoFactorChange}
              placeholder={t('placeholder_2fa')}
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-100 text-center text-xl tracking-[0.5em]"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!agencyRole || !username || !password || (is2faStep && twoFactorCode.length < 6)}
          className="w-full rounded-lg bg-indigo-600 py-3.5 text-base font-semibold text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg hover:shadow-indigo-500/40 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {is2faStep ? t('verify_login_button') : t('continue_button')}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-[#9ca7b4]">
            <span className="font-semibold">{t('login_footer_1')}</span>
            <br />
            {t('login_footer_2')}
        </p>
      </div>
    </div>
  );
};

export default LoginCard;