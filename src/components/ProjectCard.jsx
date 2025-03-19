import React from 'react';

export const ProjectCard = ({ project, isReversed, featuredText }) => {
  const { title, description, technologies, image, liveLink, githubLink } = project;
  
  return (
    <div className={`grid md:grid-cols-12 gap-6 ${isReversed ? '' : 'md:rtl'}`}>
      <div className="md:col-span-7 md:order-2">
        <div className="relative group">
          <div className="rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
      
      <div className={`md:col-span-5 md:order-1 flex flex-col justify-center ${isReversed ? 'md:rtl' : 'md:ltr'}`}>
        <p className="text-blue-600 dark:text-blue-400 font-mono mb-1">{featuredText}</p>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>
        
        <div className="bg-white dark:bg-gray-900 p-5 rounded-md shadow-md mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {liveLink && (
            <a 
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 flex items-center justify-center flex-1"
              aria-label="Live demo"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Live Demo
            </a>
          )}
          
          {githubLink && (
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gray-800 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg flex-1"
              aria-label="View source on GitHub"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 0 6.484 0 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              View Code on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
