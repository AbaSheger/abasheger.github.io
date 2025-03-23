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
      color: 'bg-green-500' 
    };
    if (isInternship) return { 
      text: language === 'en' ? 'Internship' : 'Praktik', 
      color: 'bg-purple-500' 
    };
    if (isSchoolProject) return { 
      text: language === 'en' ? 'School Project' : 'Skolprojekt', 
      color: 'bg-blue-500' 
    };
    if (isSideProject) return { 
      text: language === 'en' ? 'Side Project' : 'Sidoprojekt', 
      color: 'bg-yellow-500' 
    };
    if (isDesktopApp) return { 
      text: language === 'en' ? 'Desktop App' : 'Skrivbordsapp', 
      color: 'bg-gray-500' 
    };
    return null;
  };

  const tag = getProjectTag();
  
  return (
    <div className="group relative bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt"></div>
      
      <div className="relative bg-white dark:bg-dark-800 rounded-xl overflow-hidden">
        <div className="relative">
          {tag && (
            <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 z-10 ${tag.color} text-white text-xs px-2 py-1 rounded-full font-medium transform transition-transform duration-300 group-hover:scale-110`}>
              {tag.text}
            </div>
          )}
          <div className="overflow-hidden">
            <img 
              src={image} 
              alt={title}
              loading="lazy"
              className="w-full h-40 sm:h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4 sm:p-6 relative z-10">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
            {technologies.map((tech) => (
              <span 
                key={tech}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full transition-transform duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            {liveLink && (
              <a 
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                <span>Live Demo</span>
              </a>
            )}
            
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              <span>View Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
