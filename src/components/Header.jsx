import React from 'react';
import { LanguageToggle } from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

export const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage, menuOpen, toggleMenu, navItems, activeSection }) => {
  const getLinkClasses = (section) => `hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
    activeSection === section ? 'text-blue-600 dark:text-blue-400' : ''
  }`;

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-gray-100 dark:border-dark-700">
      {/* Add overlay for mobile menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden" 
          onClick={toggleMenu}
        />
      )}
      
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">AB</h1>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden mobile-menu-btn flex flex-col justify-between w-6 h-5"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className={getLinkClasses('about')}>{navItems.about}</a>
          <a href="#projects" className={getLinkClasses('projects')}>{navItems.projects}</a>
          <a href="#skills" className={getLinkClasses('skills')}>{navItems.skills}</a>
          <a href="#cv" className={getLinkClasses('cv')}>{navItems.cv}</a>
          <a href="#contact" className={getLinkClasses('contact')}>{navItems.contact}</a>
          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ${
        menuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="flex flex-col px-4 py-3 space-y-3">
          <a href="#about" className={getLinkClasses('about')} onClick={toggleMenu}>{navItems.about}</a>
          <a href="#projects" className={getLinkClasses('projects')} onClick={toggleMenu}>{navItems.projects}</a>
          <a href="#skills" className={getLinkClasses('skills')} onClick={toggleMenu}>{navItems.skills}</a>
          <a href="#cv" className={getLinkClasses('cv')} onClick={toggleMenu}>{navItems.cv}</a>
          <a href="#contact" className={getLinkClasses('contact')} onClick={toggleMenu}>{navItems.contact}</a>
          <div className="flex items-center justify-between py-2">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} isMobile />
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isMobile />
          </div>
        </nav>
      </div>
    </header>
  );
};