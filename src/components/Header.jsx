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
            <div className="relative group flex items-center justify-center w-16 h-12">
              {/* Main logo container */}
              <div className="relative z-10 w-16 h-12 transform transition-all duration-300 group-hover:scale-105">
                <svg 
                  viewBox="0 0 160 120" 
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
                      <stop offset="100%" style={{ stopColor: '#2563EB' }} />
                    </linearGradient>
                  </defs>
                  
                  {/* A Letter */}
                  <path
                    d="M40 100 L70 20 L100 100 L85 100 L77 80 L63 80 L55 100 L40 100 Z M70 40 L60 70 L80 70 L70 40 Z"
                    fill="url(#primaryGradient)"
                    className="transform origin-center transition-transform duration-300"
                  />
                  
                  {/* B Letter */}
                  <path
                    d="M110 20 L110 100 L130 100 Q140 100 145 95 Q150 90 150 80 Q150 72 146 68 Q142 64 135 63 Q140 62 143 58 Q146 54 146 47 Q146 37 141 32 Q136 27 126 27 L110 20 Z M125 40 Q130 40 132 42 Q134 44 134 48 Q134 52 132 54 Q130 56 125 56 L122 56 L122 40 L125 40 Z M124 66 Q129 66 131 68 Q133 70 133 74 Q133 78 131 80 Q129 82 124 82 L122 82 L122 66 L124 66 Z"
                    fill="url(#primaryGradient)"
                    className="transform origin-center transition-transform duration-300"
                  />

                  {/* Decorative elements */}
                  <rect 
                    x="35" 
                    y="15" 
                    width="120" 
                    height="90" 
                    rx="8"
                    stroke="url(#primaryGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-30"
                  />
                </svg>
              </div>
              
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </a>
        </h1>
        
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 flex items-center gap-2"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}
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
          <span className="text-sm font-medium">{menuOpen ? 'Close' : 'Menu'}</span>
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