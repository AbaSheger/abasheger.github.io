import React, { useState, useEffect, lazy, Suspense } from 'react';
import ThemeToggle from './components/ThemeToggle';
import ProjectCard from './components/ProjectCard';

// Lazy load the ParticleBackground for better performance
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

const App = () => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleSection, setVisibleSection] = useState('hero');

  // Toggle functions
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'sv' : 'en');
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Project filters
  const projectCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'cloud', label: 'Cloud & DevOps' }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Music Analytics Platform",
      category: "fullstack",
      technologies: ["Spring Boot", "React", "Docker"],
      image: "assets/project-music-analytics.jpg",
      description: "Java-based microservice platform for music analytics and recommendations with AI-based algorithms.",
      liveLink: "https://live-link-to-music-analytics-platform.com",
      githubLink: "https://github.com/abenezer-anglo/music-analytics-platform"
    },
    {
      id: 2,
      title: "Wigell Padel Microservice",
      category: "backend",
      technologies: ["Spring Boot", "MySQL", "Spring Security"],
      image: "assets/project-wigell-padel.jpg",
      description: "REST API in Java Spring Boot with MySQL for bookings and customer data with secure authentication.",
      liveLink: "https://live-link-to-wigell-padel-mikrotjanst.com",
      githubLink: "https://github.com/abenezer-anglo/wigell-padel-mikrotjanst"
    },
    {
      id: 3,
      title: "Full-Stack Solution (EduGrade)",
      category: "cloud",
      technologies: ["Azure DevOps", "React", "Java"],
      image: "assets/project-edugrade.jpg",
      description: "CI/CD pipeline in Azure DevOps for React frontend and Java-based REST API backend.",
      liveLink: "https://live-link-to-full-stack-solution-edugrade.com",
      githubLink: "https://github.com/abenezer-anglo/full-stack-solution-edugrade"
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-dark-900 text-gray-800 dark:text-gray-100">
        {/* Header - Modern and Minimal */}
        <header className="fixed w-full top-0 z-50 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-gray-100 dark:border-dark-700">
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
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
              <a href="#cv" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">CV</a>
              
              {/* Language Switch - Desktop */}
              <button 
                onClick={toggleLanguage} 
                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {language === 'en' ? '🇬🇧 EN' : '🇸🇪 SV'}
              </button>
            </nav>
          </div>
          
          {/* Mobile Navigation */}
          <div className={`md:hidden absolute left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ${menuOpen ? 'max-h-64 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
            <nav className="flex flex-col px-4 py-3 space-y-3">
              <a href="#about" className="py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#projects" className="py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#skills" className="py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>Skills</a>
              <a href="#contact" className="py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>Contact</a>
              <a href="#cv" className="py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>CV</a>
              
              {/* Language Switch - Mobile */}
              <button 
                onClick={() => {toggleLanguage(); setMenuOpen(false);}} 
                className="flex items-center py-2 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {language === 'en' ? '🇬🇧 English' : '🇸🇪 Swedish'}
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Section - Asymmetrical Design */}
        <section id="hero" className="pt-24 md:pt-36 pb-16 px-4 min-h-[90vh] relative overflow-hidden flex items-center">
          <div className="max-w-5xl mx-auto">
            <div className="animate-fadeIn">
              <span className="text-blue-600 dark:text-blue-400 font-mono mb-4 block">Hi, my name is</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Abenezer Anglo<span className="text-blue-600 dark:text-blue-400">.</span>
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-600 dark:text-gray-400">
                Java Developer
              </h3>
              <p className="text-lg max-w-xl mb-8 text-gray-600 dark:text-gray-400">
                Building scalable, reliable systems for efficient data management. Based in Borlänge, Sweden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 text-center"
                >
                  Contact Me
                </a>
                <a 
                  href="#projects" 
                  className="px-6 py-3 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-medium rounded-md transition-all duration-300 text-center"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section with Filtering */}
        <section id="projects" className="py-20 px-4 bg-white dark:bg-dark-800/20">
          <div className="max-w-5xl mx-auto animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl font-bold mb-12 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono">02.</span> Projects
            </h3>
            
            {/* Project Grid - Mobile First */}
            <div className="space-y-16 md:space-y-24">
              {/* Project 1 */}
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-7 md:order-2">
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src="assets/project1.jpg" 
                      alt="Project One" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 md:order-1 flex flex-col justify-center">
                  <p className="text-blue-600 dark:text-blue-400 font-mono mb-1">Featured Project</p>
                  <h4 className="text-xl sm:text-2xl font-bold mb-4">Project One</h4>
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-md shadow-md mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      A modern microservice platform using Java and React. Scalable architecture with robust backend APIs and intuitive UI.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Spring Boot</span>
                    <span>React</span>
                    <span>Docker</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 0 6.484 0 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src="assets/project2.jpg" 
                      alt="Project Two" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 flex flex-col justify-center">
                  <p className="text-blue-600 dark:text-blue-400 font-mono mb-1">Featured Project</p>
                  <h4 className="text-xl sm:text-2xl font-bold mb-4">Project Two</h4>
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-md shadow-md mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      A scalable REST API with cutting-edge cloud integration. Optimized for high traffic and reliability.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Java</span>
                    <span>Spring</span>
                    <span>AWS</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 0 6.484 0 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Two Column Layout */}
        <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-dark-900">
          <div className="max-w-5xl mx-auto animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono">01.</span> About Me
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  I am a dedicated Java developer passionate about building scalable and reliable software.
                  My expertise covers backend development, API design, and system integration.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  With experience in Java-based microservices, database management, and cloud solutions,
                  I thrive in agile environments and focus on creating high-performing software solutions.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="mailto:merebanglo@yahoo.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    merebanglo@yahoo.com
                  </a>
                  <a href="tel:+46764087919" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    +46764087919
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-blue-600 dark:border-blue-400 relative z-10">
                  <img 
                    src="assets/profile.jpg" 
                    alt="Abenezer Anglo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-blue-600/10 rounded-lg translate-x-3 translate-y-3 -z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Card Grid */}
        <section id="skills" className="py-20 px-4 bg-white dark:bg-dark-800/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-heading">
              <span className="section-number">03.</span>
              My Skills
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Backend & Programming */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft p-6 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-700">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Backend & Programming</h3>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "REST APIs", "Maven", "MySQL", "H2", "JUnit", "Mockito", "TDD"].map((skill) => (
                    <span key={skill} className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* DevOps & CI/CD */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft p-6 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-700">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">DevOps & CI/CD</h3>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Docker Compose", "Git", "GitHub", "Azure DevOps"].map((skill) => (
                    <span key={skill} className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Frontend & UI - Complete this card */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft p-6 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-700">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Frontend & UI</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "JavaScript", "TypeScript", "HTML/CSS"].map((skill) => (
                    <span key={skill} className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Agile & Other - Add this fourth card */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft p-6 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-700">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-primary-100/70 dark:bg-primary-900/20 text-primary-500 dark:text-primary-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Agile & Other</h3>
                <div className="flex flex-wrap gap-2">
                  {["Scrum", "Kanban", "Team Collaboration", "Problem Solving", "AI Basics"].map((skill) => (
                    <span key={skill} className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-dark-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-heading">
              <span className="section-number">04.</span>
              Get In Touch
            </h2>
            
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft p-8 text-center max-w-3xl mx-auto border border-gray-100 dark:border-dark-700 hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Let's Work Together</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                <a href="mailto:merebanglo@yahoo.com" className="flex items-center group bg-white dark:bg-dark-700 p-4 rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</h4>
                    <p className="text-gray-800 dark:text-gray-200">merebanglo@yahoo.com</p>
                  </div>
                </a>
                
                <a href="tel:+46764087919" className="flex items-center group bg-white dark:bg-dark-700 p-4 rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Phone</h4>
                    <p className="text-gray-800 dark:text-gray-200">+46 76 408 79 19</p>
                  </div>
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/abasheger" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/abenezer-anglo-537488144/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                
                <a 
                  href="mailto:merebanglo@yahoo.com" 
                  className="btn-primary inline-block mt-4"
                >
                  Send Me a Message
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-4 bg-white dark:bg-dark-800/20 border-t border-gray-200 dark:border-dark-700">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent inline-block">AB</h3>
            </div>
            
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#projects" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Projects</a>
              <a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a>
              <a href="#skills" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Skills</a>
              <a href="#contact" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a>
            </div>
            
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Abenezer Anglo. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
