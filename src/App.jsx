import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import { useLanguage } from './contexts/LanguageContext';
import { CV } from './components/CV';
import { Location } from './components/Location';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SkeletonLoader } from './components/SkeletonLoader';

// Lazy load the ParticleBackground for better performance
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

const App = () => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState('hero');
  const { language, toggleLanguage, text } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [announcement, setAnnouncement] = useState('');

  // Toggle functions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setAnnouncement(darkMode ? 'Light mode enabled' : 'Dark mode enabled');
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Intersection Observer for section visibility
  useEffect(() => {
    const options = {
      threshold: 0.3,
      rootMargin: "-50px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id);
        }
      });
    }, options);
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuOpen && !e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  // Check for user's preferred color scheme
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(prefersDarkScheme.matches);
    
    const handleChange = (e) => setDarkMode(e.matches);
    prefersDarkScheme.addEventListener('change', handleChange);
    
    return () => prefersDarkScheme.removeEventListener('change', handleChange);
  }, []);

  // Add smooth scroll behavior
  useEffect(() => {
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          const offset = 80; // Header height + some padding
          const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleNavClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + number shortcuts for sections
      if (e.altKey && !isNaN(e.key)) {
        e.preventDefault();
        const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
          document.querySelector(`#${sections[index]}`).focus();
          setAnnouncement(`Navigated to ${sections[index]} section`);
        }
      }
      // Toggle dark mode with Alt + D
      if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Add swipe gestures for mobile menu
  const handleSwipe = (e) => {
    if (e.direction === 'right') {
      setMenuOpen(true);
    } else if (e.direction === 'left') {
      setMenuOpen(false);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ErrorBoundary>
          <Header 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            language={language}
            toggleLanguage={toggleLanguage}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            navItems={text.nav}
            activeSection={visibleSection}
          />

          <main id="main-content" tabIndex="-1">
            <h1 className="sr-only">Abenezer Anglo - Software Developer Portfolio</h1>
            
            <div role="region" aria-label="Introduction">
              <section 
                id="hero" 
                className="pt-24 md:pt-36 pb-16 px-4 min-h-[90vh] relative overflow-hidden flex items-center justify-center"
                aria-labelledby="hero-title"
              >
                {/* Background gradient orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>

                <div className="max-w-5xl w-full relative z-10">
                  <div className="animate-fadeIn">
                    <div className="text-center">
                      {/* Greeting with animated underline */}
                      <span className="inline-block text-blue-600 dark:text-blue-400 font-mono mb-4 relative">
                        <span className="relative z-10">{text.hero.greeting}</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                      </span>
                      
                      {/* Main name with gradient and glow */}
                      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 relative">
                        <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent drop-shadow-sm">
                          Abenezer Anglo
                        </span>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">.</span>
                        <div className="mt-3 text-base">
                          <Location />
                        </div>
                      </h1>
                      
                      {/* Title with gradient */}
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-gray-600 via-blue-600 to-purple-600 dark:from-gray-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {text.hero.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-lg md:text-xl mx-auto max-w-2xl mb-10 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {text.hero.description}
                      </p>
                      
                      {/* CTA Buttons with enhanced styling */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                          href="#contact" 
                          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] hover:bg-right text-white font-semibold rounded-xl transition-all duration-500 text-center shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 overflow-hidden"
                        >
                          <span className="relative z-10">{text.hero.contactBtn}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <a 
                          href="#projects" 
                          className="group px-8 py-4 border-2 border-blue-500/50 hover:border-blue-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-xl transition-all duration-300 text-center hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                          <span className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">{text.hero.projectsBtn}</span>
                        </a>
                      </div>
                      
                      {/* Scroll indicator */}
                      <div className="mt-16 animate-bounce-subtle">
                        <a href="#about" className="inline-block text-gray-400 hover:text-blue-500 transition-colors">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Particles Background */}
                <Suspense fallback={<div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800"></div>}>
                  <ParticleBackground />
                </Suspense>
              </section>
            </div>

            <div role="region" aria-label="Portfolio content">
              <Suspense fallback={<SkeletonLoader type="default" />}>
                <ErrorBoundary>
                  <About text={text.about} />
                </ErrorBoundary>
              </Suspense>
              
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"><SkeletonLoader type="project" /><SkeletonLoader type="project" /></div>}>
                <ErrorBoundary>
                  <Projects text={text.projects} />
                </ErrorBoundary>
              </Suspense>
              
              <Suspense fallback={<div className="space-y-4 p-4"><SkeletonLoader type="skill" /><SkeletonLoader type="skill" /></div>}>
                <ErrorBoundary>
                  <Skills text={text.skills} />
                </ErrorBoundary>
              </Suspense>
              
              <ErrorBoundary>
                <CV />
              </ErrorBoundary>
              
              <Suspense fallback={<SkeletonLoader type="default" />}>
                <ErrorBoundary>
                  <Contact text={text.contact} />
                </ErrorBoundary>
              </Suspense>
            </div>

            {/* Floating Theme Toggle */}
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Footer */}
            <footer className="relative py-12 px-4 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-dark-800/20 dark:via-dark-900/50 dark:to-dark-900 border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -bottom-10 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
              </div>
              
              <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Logo or brand mark */}
                <div className="mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AA</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  <p className="flex items-center justify-center gap-2">
                    <span>© {new Date().getFullYear()}</span>
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    <span className="font-medium">Abenezer Anglo</span>
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    <span>{text.footer.copyright}</span>
                  </p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Built with React & Tailwind CSS</p>
                </div>
              </div>
            </footer>

            {/* Add offline banner if needed */}
            {!isOnline && (
              <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-white p-2 text-center">
                {text.weather.offline}
              </div>
            )}

            {/* Add proper focus management for interactive elements */}
            <style>
              {`
              :focus-visible {
                outline: 2px solid #60a5fa;
                outline-offset: 2px;
              }
              `}
            </style>

            <div 
              role="status" 
              aria-live="polite" 
              className="sr-only"
            >
              {announcement}
            </div>
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
