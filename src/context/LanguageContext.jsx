import React, { createContext, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const lang = 'en';

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_lang', 'en');
      document.documentElement.lang = 'en';
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLang = () => {};
  const setLang = () => {};

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
