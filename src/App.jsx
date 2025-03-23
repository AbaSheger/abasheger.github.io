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
  const [videoPlaying, setVideoPlaying] = useState(false);

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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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

        {/* Hero Section */}
        <main id="main-content" tabIndex="-1">
          <h1 className="sr-only">Abenezer Anglo - Software Developer Portfolio</h1>
          
          {/* Add region labels for screen readers */}
          <div role="region" aria-label="Introduction">
            <section 
              id="hero" 
              className="pt-24 md:pt-36 pb-16 px-4 min-h-[90vh] relative overflow-hidden flex items-center"
              aria-labelledby="hero-title"
            >
              <h2 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Abenezer Anglo<span aria-hidden="true" className="text-blue-600 dark:text-blue-400">.</span>
              </h2>
              <div className="max-w-5xl mx-auto relative z-10">
                <div className="animate-fadeIn">
                  <span className="text-blue-600 dark:text-blue-400 font-mono mb-4 block">{text.hero.greeting}</span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    Abenezer Anglo<span className="text-blue-600 dark:text-blue-400">.</span>
                    <div className="mt-2 text-base">
                      <Location />
                    </div>
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-600 dark:text-gray-400">
                    {text.hero.title}
                  </h2>
                  <p className="text-lg max-w-xl mb-8 text-gray-600 dark:text-gray-400">
                    {text.hero.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="#contact" 
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 text-center"
                    >
                      {text.hero.contactBtn}
                    </a>
                    <a 
                      href="#projects" 
                      className="px-6 py-3 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-medium rounded-md transition-all duration-300 text-center"
                    >
                      {text.hero.projectsBtn}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Particles Background */}
              <Suspense fallback={<div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800"></div>}>
                <ParticleBackground />
              </Suspense>
            </section>
          </div>

          {/* Add descriptive labels for sections */}
          <div role="region" aria-label="Portfolio content">
            <About text={text.about} />
            <Projects text={text.projects} />
            <Skills text={text.skills} />
            <CV />
            <Contact text={text.contact} />
          </div>

          {/* Floating Theme Toggle */}
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Footer */}
          <footer className="py-10 px-4 bg-white dark:bg-dark-800/20 border-t border-gray-200 dark:border-dark-700">
            <div className="max-w-7xl mx-auto text-center">
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Abenezer Anglo. {text.footer.copyright}</p>
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

          {/* Add video elements (if any) */}
          <video
            controls
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
          >
            <source src="video.mp4" type="video/mp4" />
            <track 
              kind="captions" 
              src="captions.vtt" 
              srcLang="en" 
              label="English captions" 
              default 
            />
            <track 
              kind="captions" 
              src="captions-sv.vtt" 
              srcLang="sv" 
              label="Svenska undertexter" 
            />
          </video>
        </main>
      </div>
    </div>
  );
};

export default App;
