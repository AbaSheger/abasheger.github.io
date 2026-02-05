import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectCard = ({ project }) => {
  const { language } = useLanguage();
  
  const { 
    title, 
    description, 
    technologies, 
    image, 
    liveLink, 
    githubLink,
    isOpenSource,
    isInternship,
    isSchoolProject,
    isSideProject,
    isDesktopApp
  } = project;
  
  const getProjectTag = () => {
    if (isOpenSource) return { 
      text: language === 'en' ? 'Open Source' : 'Öppen Källkod', 
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-500'
    };
    if (isInternship) return { 
      text: language === 'en' ? 'Internship' : 'Praktik', 
      gradient: 'from-purple-500 to-violet-600',
      bg: 'bg-purple-500'
    };
    if (isSchoolProject) return { 
      text: language === 'en' ? 'School Project' : 'Skolprojekt', 
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-500'
    };
    if (isSideProject) return { 
      text: language === 'en' ? 'Side Project' : 'Sidoprojekt', 
      gradient: 'from-yellow-500 to-orange-600',
      bg: 'bg-yellow-500'
    };
    if (isDesktopApp) return { 
      text: language === 'en' ? 'Desktop App' : 'Skrivbordsapp', 
      gradient: 'from-gray-500 to-gray-700',
      bg: 'bg-gray-500'
    };
    return null;
  };

  const tag = getProjectTag();
  
  return (
    <div className="group relative h-full" role="article" aria-labelledby={`project-${title.replace(/\s+/g, '-')}`}>
      {/* Animated glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:duration-200"></div>
      
      <div className="relative h-full bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-1">
        {/* Image section */}
        <div className="relative overflow-hidden">
          {tag && (
            <div className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-gradient-to-r ${tag.gradient} text-white text-xs font-semibold shadow-lg transform transition-all duration-300 group-hover:scale-105`}>
              {tag.text}
            </div>
          )}
          
          {/* Image with overlay */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            
            {/* Floating action buttons on image */}
            <div className="absolute bottom-3 right-3 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {liveLink && (
                <a 
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-lg"
                  title="Live Demo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800 transition-all duration-200 shadow-lg"
                title="View Code"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-5">
          <h3 
            id={`project-${title.replace(/\s+/g, '-')}`}
            className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          >
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2" aria-label={`Project description: ${description}`}>
            {description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
            {technologies.slice(0, 5).map((tech) => (
              <span 
                key={tech}
                role="listitem"
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 5 && (
              <span className="text-xs px-2 py-1 text-gray-400 dark:text-gray-500">
                +{technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
