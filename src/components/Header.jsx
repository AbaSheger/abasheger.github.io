import React, { useEffect } from 'react';
import { LanguageToggle } from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

export const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage, menuOpen, toggleMenu, navItems, activeSection }) => {
  const getLinkClasses = (section) => `hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
    activeSection === section ? 'text-blue-600 dark:text-blue-400' : ''
  }`;

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-gray-100 dark:border-dark-700" role="banner">
      {/* Add overlay for mobile menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden" 
          onClick={toggleMenu}
        />
      )}
      
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile controls - Language Toggle and Menu Button */}
        <div className="flex items-center space-x-3 md:hidden order-first relative z-50">
          {/* Hamburger Menu Button - Made more prominent */}
          <button 
            className="p-3 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-700"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg 
              className={`w-7 h-7 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
          <a href="#about" className={getLinkClasses('about')} aria-current={activeSection === 'about' ? 'page' : undefined}>
            {navItems.about}
          </a>
          <a href="#projects" className={getLinkClasses('projects')} aria-current={activeSection === 'projects' ? 'page' : undefined}>
            {navItems.projects}
          </a>
          <a href="#skills" className={getLinkClasses('skills')} aria-current={activeSection === 'skills' ? 'page' : undefined}>
            {navItems.skills}
          </a>
          <a href="#cv" className={getLinkClasses('cv')} aria-current={activeSection === 'cv' ? 'page' : undefined}>
            {navItems.cv}
          </a>
          <a href="#contact" className={getLinkClasses('contact')} aria-current={activeSection === 'contact' ? 'page' : undefined}>
            {navItems.contact}
          </a>
          <div className="flex items-center space-x-4">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        inert={!menuOpen}
      >
        <nav className="flex flex-col px-4 py-3 space-y-3">
          <a 
            href="#about" 
            className={getLinkClasses('about')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'about' ? 'page' : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            {navItems.about}
          </a>
          <a 
            href="#projects" 
            className={getLinkClasses('projects')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'projects' ? 'page' : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            {navItems.projects}
          </a>
          <a 
            href="#skills" 
            className={getLinkClasses('skills')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'skills' ? 'page' : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            {navItems.skills}
          </a>
          <a 
            href="#cv" 
            className={getLinkClasses('cv')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'cv' ? 'page' : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            {navItems.cv}
          </a>
          <a 
            href="#contact" 
            className={getLinkClasses('contact')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'contact' ? 'page' : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            {navItems.contact}
          </a>
          <div className="flex items-center justify-between py-2">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} isMobile menuOpen={menuOpen} />
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isMobile menuOpen={menuOpen} />
          </div>
        </nav>
      </div>

      {/* Add more skip links */}
      <div className="sr-only focus:not-sr-only">
        <a 
          href="#main-content" 
          className="fixed top-0 left-0 p-2 bg-white dark:bg-dark-900 z-50"
        >
          Skip to main content
        </a>
        <a 
          href="#projects" 
          className="fixed top-0 left-32 p-2 bg-white dark:bg-dark-900 z-50"
        >
          Skip to projects
        </a>
        <a 
          href="#contact" 
          className="fixed top-0 left-64 p-2 bg-white dark:bg-dark-900 z-50"
        >
          Skip to contact
        </a>
      </div>
    </header>
  );
};