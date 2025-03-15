import React, { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300">
        {/* Header */}
        <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold">AB</h1>
          <nav className="space-x-4">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
          <button onClick={toggleDark} className="p-2 rounded border dark:border-gray-700">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        {/* Hero Section */}
        <section id="hero" className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('assets/hero-bg.jpg')" }}>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">Abenezer Anglo</h2>
            <p className="mb-4 text-lg">Java Developer</p>
            <a href="#contact" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Contact Me</a>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold mb-4">About Me</h3>
            <p className="leading-relaxed">
              I am a dedicated Java developer passionate about building scalable and reliable software.
              My expertise covers backend development, API design, and system integration.
            </p>
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="p-8 bg-gray-50 dark:bg-gray-700">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-semibold mb-6">Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
                <img src="assets/project1.jpg" alt="Project 1" className="w-full h-40 object-cover rounded mb-4" />
                <h4 className="text-xl font-semibold">Project One</h4>
                <p className="mt-2">A modern microservice platform using Java and React.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
                <img src="assets/project2.jpg" alt="Project 2" className="w-full h-40 object-cover rounded mb-4" />
                <h4 className="text-xl font-semibold">Project Two</h4>
                <p className="mt-2">A scalable REST API with cutting-edge cloud integration.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Full-Stack Solution (EduGrade)
                </h3>
                <div className="mb-4 text-blue-600 dark:text-blue-400 font-medium text-sm">
                  Azure DevOps · React · Java
                </div>
                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg shadow-md z-10 relative">
                  <p className="text-gray-700 dark:text-gray-300">
                    CI/CD pipeline in Azure DevOps for React frontend and Java-based REST API backend. Deployment in Azure App Service, handling Docker containers.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a href="https://live-link-to-full-stack-solution-edugrade.com" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Live Demo
                  </a>
                  <a href="https://github.com/abenezer-anglo/full-stack-solution-edugrade" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-4">Contact</h3>
            <p className="mb-6">Feel free to reach out via email or phone.</p>
            <a href="mailto:merebanglo@yahoo.com" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Email Me</a>
          </div>
        </section>
        <footer className="py-4 text-center bg-white dark:bg-gray-800">
          <p className="text-sm">© 2025 Abenezer Anglo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
