import React from 'react';

export const ProjectCard = ({ project, isReversed, featuredText }) => {
  const { 
    title, 
    description, 
    technologies, 
    image, 
    liveLink, 
    githubLink, 
    isOpenSource, 
    isInternship,
    isDesktopApp 
  } = project;
  
  return (
    <div className={`grid md:grid-cols-12 gap-8 ${isReversed ? '' : 'md:rtl'}`}>
      <div className="md:col-span-7 md:order-2">
        <div className="relative group">
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <img 
              src={image} 
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-5 md:order-1 md:ltr">
        <div className="flex flex-col h-full justify-center space-y-6">
          <div className="flex items-center gap-3">
            <p className="text-blue-600 dark:text-blue-400 font-mono text-sm tracking-wider">{featuredText}</p>
            {isOpenSource && (
              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full shadow-sm">
                {isInternship ? "Internship Project" : "Open Source"}
              </span>
            )}
            {isDesktopApp && (
              <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded-full shadow-sm">
                Desktop App
              </span>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
          
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl shadow-sm">
            <p className="text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span 
                key={tech}
                className="text-sm px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-6 pt-2">
            {liveLink && !isDesktopApp && (
              <a 
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                <span>Live Demo</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span>View Code</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
