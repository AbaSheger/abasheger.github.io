import React from 'react';

export const LanguageToggle = ({ language, toggleLanguage, isMobile = false }) => {
  const commonClasses = isMobile
    ? "flex items-center py-2 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    : "px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";

  return (
    <button 
      onClick={toggleLanguage} 
      className={commonClasses}
      aria-label="Toggle language"
    >
      {language === 'en' ? '🇬🇧 EN' : '🇸🇪 SV'}
    </button>
  );
};