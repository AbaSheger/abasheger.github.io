import React, { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

const projectCategories = [
  { id: 'all', label: 'filterAll' },
  { id: 'backend', label: 'filterBackend' },
  { id: 'fullstack', label: 'filterFullstack' },
  { id: 'cloud', label: 'filterCloud' }
];

export const Projects = ({ text }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-dark-800/20">
      <div className="max-w-5xl mx-auto animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono">02.</span> {text.sectionTitle}
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {projectCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${activeFilter === category.id
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {text[category.label]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 md:space-y-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isReversed={index % 2 !== 0}
              featuredText={text.featuredProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};