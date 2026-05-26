import React, { useEffect, useRef, useState } from 'react';
import { skillCategories } from '../data/skills';

const iconPaths = {
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  server: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  layout: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
};

const SkillCard = ({ title, icon, skills, index, proficiency }) => {
  const cardRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setBarWidth(proficiency || 0), 150 + index * 75);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [proficiency, index]);

  return (
    <div
      ref={cardRef}
      className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-md shadow-gray-900/5 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800/60">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[icon]} />
        </svg>
      </div>

      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>

      {proficiency !== undefined && (
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Proficiency</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{proficiency}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-blue-700 transition-all duration-1000 ease-out dark:bg-blue-400"
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700/50 dark:text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Skills = ({ text }) => {
  return (
    <section id="skills" className="py-24 px-4 bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 flex items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-mono mr-4 border border-gray-200 dark:border-gray-700">
            03
          </span>
          <span>{text.sectionTitle}</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              proficiency={category.proficiency}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
