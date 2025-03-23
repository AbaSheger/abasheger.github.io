import React from 'react';

export const LanguageToggle = ({ language, toggleLanguage, isMobile = false, menuOpen }) => {
  const commonClasses = isMobile
    ? "flex items-center py-2 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    : "flex items-center px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md";

  return (
    <button 
      onClick={toggleLanguage} 
      className={commonClasses}
      aria-label={language === 'en' ? "Switch to Swedish" : "Switch to English"}
      aria-pressed={language === 'en'}
      tabIndex={isMobile && !menuOpen ? -1 : 0}
    >
      <span aria-hidden="true" className="text-base">{language === 'en' ? '🇬🇧' : '🇸🇪'}</span>
      <span className="ml-2 font-medium">{language === 'en' ? 'EN' : 'SV'}</span>
    </button>
  );
};