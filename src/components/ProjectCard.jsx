import React from 'react';

const ProjectCard = ({ project }) => {
  const { title, category, description, technologies, image, githubLink, liveLink } = project;
  
  return (
    <div className="group bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-dark-700">
      {/* Project image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
          <div className="p-4 w-full flex justify-between">
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white bg-primary-600/90 hover:bg-primary-600 px-3 py-1 rounded text-sm transition-colors"
            >
              Live Demo
            </a>
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white bg-dark-800/90 hover:bg-dark-800 px-3 py-1 rounded text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      
      {/* Project content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-dark-700">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
