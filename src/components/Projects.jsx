import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

const projectCategories = [
  { id: 'all', label: 'filterAll', icon: '✨' },
  { id: 'backend', label: 'filterBackend', icon: '⚙️' },
  { id: 'fullstack', label: 'filterFullstack', icon: '🚀' },
  { id: 'cloud', label: 'filterCloud', icon: '☁️' }
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
    <section id="projects" className="py-24 px-4 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-dark-800/20 dark:via-dark-900/30 dark:to-dark-800/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-12 flex items-center group">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white font-mono mr-4 shadow-lg shadow-orange-500/25 group-hover:shadow-xl group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110">
            02
          </span>
          <span className="relative">
            {text.projects.sectionTitle}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </span>
        </h2>

        {/* Filter Buttons - Enhanced design */}
        <div className="overflow-x-auto pb-4 mb-10 -mx-4 px-4">
          <div className="flex flex-nowrap sm:flex-wrap gap-3 min-w-max sm:min-w-0">
            {projectCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`group/btn relative px-5 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-lg'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {text.projects[category.label]}
                {activeFilter === category.id && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-white/50 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};