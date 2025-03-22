import React from 'react';
import { skillCategories } from '../data/skills';

const SkillCard = ({ title, icon, skills }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft p-6 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-dark-700">
      <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
        {icon === 'code' && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )}
        {icon === 'server' && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        )}
        {icon === 'layout' && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}
        {icon === 'users' && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span 
            key={skill} 
            className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// Add skill level indicators
const SkillItem = ({ name, level }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
      <div 
        className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

export const Skills = ({ text }) => {
  return (
    <section id="skills" className="py-20 px-4 bg-white dark:bg-dark-800/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono w-8">03.</span>
          {text.sectionTitle}
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <SkillCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
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