import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

const projectCategories = [
  { id: 'all', label: 'filterAll' },
  { id: 'backend', label: 'filterBackend' },
  { id: 'fullstack', label: 'filterFullstack' },
  { id: 'cloud', label: 'filterCloud' }
];

export const Projects = () => {
  const { language, text } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // Get the projects for the current language
  const currentProjects = projects[language] || projects.en; // Fallback to English if translation missing
  
  const filteredProjects = currentProjects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="projects" className="py-12 sm:py-20 px-4 bg-white dark:bg-dark-800/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono w-6 sm:w-8">02.</span>
          {text.projects.sectionTitle}
        </h2>

        {/* Filter Buttons - make scrollable on mobile */}
        <div className="overflow-x-auto pb-2 mb-6 sm:mb-8">
          <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-max sm:min-w-0">
            {projectCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {text.projects[category.label]}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};