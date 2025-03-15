import React, { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => setLanguage(language === 'en' ? 'sv' : 'en');
  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Header */}
        <header className="fixed w-full top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
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

        {/* Hero Section - Responsive */}
        <section id="hero" className="pt-24 pb-16 px-4 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 flex items-center min-h-screen">
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

        {/* About Section - Responsive Grid */}
        <section id="about" className="py-16 px-4 sm:py-24">
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

        {/* Projects Section - Responsive Cards */}
        <section id="projects" className="py-16 px-4 sm:py-24 bg-gray-50 dark:bg-gray-800/50">
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
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
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
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Responsive */}
        <section id="contact" className="py-16 px-4 sm:py-24">
          <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Get In Touch</h3>
            <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
            <a 
              href="mailto:merebanglo@yahoo.com" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 inline-block"
            >
              Say Hello
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
          <p>© 2025 Abenezer Anglo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
