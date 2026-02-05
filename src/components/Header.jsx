import React, { useEffect } from 'react';
import { LanguageToggle } from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

export const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage, menuOpen, toggleMenu, navItems, activeSection }) => {
  const getLinkClasses = (section) => `relative px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 ${
    activeSection === section 
      ? 'text-blue-600 dark:text-blue-400 font-medium' 
      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
  }`;

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm" role="banner">
      {/* Add overlay for mobile menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden" 
          onClick={toggleMenu}
        />
      )}
      
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile controls - Left side (Hamburger + Language) */}
        <div className="flex items-center space-x-2 md:hidden order-first relative z-50">
          {/* Hamburger Menu Button */}
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
          
          {/* Language Toggle - Now next to hamburger menu */}
          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
        </div>

        {/* Logo - Center on mobile, left on desktop */}
        <div className="flex-1 flex justify-center md:justify-start items-center min-w-0">
          <a href="/" className="group relative flex items-center space-x-4 px-2 z-40" aria-label="Home">
            <svg 
              className="w-12 h-12 md:w-14 md:h-14 transform transition-transform duration-500 group-hover:scale-110"
              viewBox="0 0 100 100"
            >
              {/* Animated gradient definitions */}
              <defs>
                <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6">
                    <animate
                      attributeName="stop-color"
                      values="#3B82F6; #60A5FA; #3B82F6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#8B5CF6">
                    <animate
                      attributeName="stop-color"
                      values="#8B5CF6; #A78BFA; #8B5CF6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
                <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA">
                    <animate
                      attributeName="stop-color"
                      values="#60A5FA; #93C5FD; #60A5FA"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#A78BFA">
                    <animate
                      attributeName="stop-color"
                      values="#A78BFA; #C4B5FD; #A78BFA"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>

              {/* Animated background circles */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="url(#logoGradient1)" 
                strokeWidth="1" 
                opacity="0.2"
                className="animate-[spin_8s_linear_infinite]"
              />
              <circle 
                cx="50" 
                cy="50" 
                r="35" 
                fill="none" 
                stroke="url(#logoGradient2)" 
                strokeWidth="1" 
                opacity="0.2"
                className="animate-[spin_6s_linear_infinite_reverse]"
              />

              {/* Main logo - Overlapping As */}
              <g className="animate-[float_3s_ease-in-out_infinite]">
                {/* First A */}
                <path
                  d="M25 75L45 25L65 75M32 55L58 55"
                  fill="none"
                  stroke="url(#logoGradient1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[pulse_4s_ease-in-out_infinite]"
                />
                {/* Second A */}
                <path
                  d="M35 75L55 25L75 75M42 55L68 55"
                  fill="none"
                  stroke="url(#logoGradient2)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                  className="animate-[pulse_4s_ease-in-out_infinite_0.5s]"
                />
              </g>

              {/* Simple glow effect */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                fill="url(#logoGradient1)"
                filter="blur(8px)"
              >
                <animate
                  attributeName="r"
                  values="38;42;38"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <div className="hidden md:flex items-center space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-105">
                Abenezer
              </span>
              <span className="text-2xl font-light bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-105">
                Anglo
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-purple-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          </a>
        </div>

        {/* Mobile controls - Right side (Theme only) */}
        <div className="flex items-center md:hidden relative z-50">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
        {...(!menuOpen ? { inert: "" } : {})}
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