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
        <h1 className="relative group">
          <a 
            href="#hero" 
            className="text-2xl font-bold flex items-center"
            aria-label={language === 'en' ? "Back to top" : "Tillbaka till toppen"}
          >
            <span className="relative z-10 flex items-center justify-center w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              AB
            </span>
            <span className="absolute -inset-2 bg-blue-600/20 dark:bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </h1>
        
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          {/* Add skip link for keyboard users */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 bg-white dark:bg-dark-900 p-2 z-50">
            Skip to main content
          </a>
          
          {/* Update navigation links with better aria labels */}
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
          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!menuOpen}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col px-4 py-3 space-y-3">
          <a 
            href="#about" 
            className={getLinkClasses('about')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'about' ? 'page' : undefined}
          >
            {navItems.about}
          </a>
          <a 
            href="#projects" 
            className={getLinkClasses('projects')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'projects' ? 'page' : undefined}
          >
            {navItems.projects}
          </a>
          <a 
            href="#skills" 
            className={getLinkClasses('skills')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'skills' ? 'page' : undefined}
          >
            {navItems.skills}
          </a>
          <a 
            href="#cv" 
            className={getLinkClasses('cv')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'cv' ? 'page' : undefined}
          >
            {navItems.cv}
          </a>
          <a 
            href="#contact" 
            className={getLinkClasses('contact')} 
            onClick={toggleMenu}
            aria-current={activeSection === 'contact' ? 'page' : undefined}
          >
            {navItems.contact}
          </a>
          <div className="flex items-center justify-between py-2">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} isMobile />
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isMobile />
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