import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { useLanguage } from './contexts/LanguageContext';
import { CV } from './components/CV';
import { Location } from './components/Location';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SkeletonLoader } from './components/SkeletonLoader';
import { AIJobMatcher } from './components/AIJobMatcher';

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
    document.documentElement.lang = language;
  }, [language]);

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
        const sections = ['hero', 'about', 'projects', 'skills', 'ai-match', 'cv', 'contact'];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                className="pt-24 md:pt-32 pb-16 px-4 min-h-[90vh] relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(29,78,216,0.10),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),linear-gradient(180deg,#171923_0%,#111827_100%)]"
                aria-labelledby="hero-title"
              >
                <div className="max-w-6xl w-full relative z-10">
                  <div className="animate-fadeIn">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="text-center lg:text-left">
                      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-mono text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200 mb-5">
                        {text.hero.greeting}
                      </span>
                      
                      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 relative tracking-tight">
                        <span>Abenezer Anglo</span>
                        <span className="text-blue-700 dark:text-blue-300">.</span>
                      </h1>
                      
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
                        {text.hero.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-lg md:text-xl mx-auto lg:mx-0 max-w-2xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {text.hero.description}
                      </p>

                      <div className="mb-10 flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">Java</span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">Spring Boot</span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">React</span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">Azure</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a 
                          href="#contact" 
                          className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200 text-center shadow-md shadow-blue-900/10"
                        >
                          {text.hero.contactBtn}
                        </a>
                        <a 
                          href="#projects" 
                          className="px-8 py-4 border border-gray-300 dark:border-gray-600 hover:border-blue-700 dark:hover:border-blue-300 bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-300 font-semibold rounded-lg transition-colors duration-200 text-center"
                        >
                          {text.hero.projectsBtn}
                        </a>
                      </div>
                      </div>

                      <aside className="mx-auto w-full max-w-sm lg:max-w-md" aria-label="Profile summary">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/8 dark:border-gray-700 dark:bg-gray-800">
                          <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                            <img
                              src="/assets/profile.jpg"
                              alt="Abenezer Anglo"
                              className="h-full w-full object-cover object-top"
                            />
                            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm dark:bg-gray-900/90 dark:text-gray-100">
                              <Location />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200 text-center dark:divide-gray-700 dark:border-gray-700">
                            <div className="p-4">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">25+</div>
                              <div className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Projects</div>
                            </div>
                            <div className="p-4">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">Azure</div>
                              <div className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Certified</div>
                            </div>
                            <div className="p-4">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">SE</div>
                              <div className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Sweden</div>
                            </div>
                          </div>
                        </div>
                      </aside>
                      
                      {/* Scroll indicator */}
                      <div className="mt-16 animate-bounce-subtle lg:col-span-2 text-center">
                        <a href="#about" aria-label="Scroll to About section" className="inline-block text-gray-400 hover:text-blue-500 transition-colors">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Particles Background */}
                <Suspense fallback={<div className="absolute inset-0 -z-10 bg-white dark:bg-dark-900"></div>}>
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
                <AIJobMatcher />
              </ErrorBoundary>

              <ErrorBoundary>
                <CV />
              </ErrorBoundary>
              
              <Suspense fallback={<SkeletonLoader type="default" />}>
                <ErrorBoundary>
                  <Contact text={text.contact} />
                </ErrorBoundary>
              </Suspense>
            </div>

            {/* Footer */}
            <footer className="relative py-12 px-4 bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden">
              
              <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Logo or brand mark */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">AA</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  <p className="flex items-center justify-center gap-2">
                    <span>© {new Date().getFullYear()}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="font-medium">Abenezer Anglo</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
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
