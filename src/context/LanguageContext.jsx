import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

// Create language context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState(translations.en);

  // Update text when language changes
  useEffect(() => {
    setText(translations[language]);
  }, [language]);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sv' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, text, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};