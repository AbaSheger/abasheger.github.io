import React from 'react';
import { skillCategories } from '../data/skills';

const SkillCard = ({ title, icon, skills, index }) => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500'
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
      
      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full">
        {/* Icon with gradient background */}
        <div className={`w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-${gradient.split('-')[1]}-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {icon === 'code' && (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          )}
          {icon === 'server' && (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          )}
          {icon === 'layout' && (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          )}
          {icon === 'users' && (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, skillIndex) => (
            <span 
              key={skill}
              style={{ animationDelay: `${skillIndex * 50}ms` }}
              className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm px-3 py-1.5 rounded-lg border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Skills = ({ text }) => {
  return (
    <section id="skills" className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-dark-800/20 dark:via-dark-900/40 dark:to-dark-800/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 flex items-center group">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white font-mono mr-4 shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
            03
          </span>
          <span className="relative">
            {text.sectionTitle}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog post cards */}
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Testimonial cards */}
      </div>
    </section>
  );
};