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
