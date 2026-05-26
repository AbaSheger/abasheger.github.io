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
  const [showAll, setShowAll] = useState(false);

  const currentProjects = projects[language] || projects.en;

  const filteredProjects = currentProjects
    .filter(project => activeFilter === 'all' || project.category === activeFilter)
    .sort((a, b) => (b.liveLink ? 1 : 0) - (a.liveLink ? 1 : 0));

  const visibleProjects = showAll ? filteredProjects : filteredProjects.filter(p => p.image);
  const hiddenCount = filteredProjects.length - filteredProjects.filter(p => p.image).length;

  return (
    <section id="projects" className="py-24 px-4 bg-slate-50 dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-12 flex items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-mono mr-4 border border-gray-200 dark:border-gray-700">
            02
          </span>
          <span>{text.projects.sectionTitle}</span>
        </h2>

        <div className="overflow-x-auto pb-4 mb-10 -mx-4 px-4">
          <div className="flex flex-nowrap sm:flex-wrap gap-3 min-w-max sm:min-w-0">
            {projectCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`relative px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-colors duration-200 border ${
                  activeFilter === category.id
                    ? 'bg-blue-700 border-blue-700 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              >
                {text.projects[category.label]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 shadow-sm"
            >
              {showAll ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                  {text.projects.showLess}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  {text.projects.showMore} ({hiddenCount})
                </>
              )}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <span className="text-4xl" aria-hidden="true">?</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};
