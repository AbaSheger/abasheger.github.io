import React, { useEffect, useRef, useState } from 'react';
import { skillCategories } from '../data/skills';

const SkillCard = ({ title, icon, skills, index, proficiency }) => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500'
  ];
  const shadowClasses = [
    'shadow-blue-500/25',
    'shadow-purple-500/25',
    'shadow-orange-500/25',
    'shadow-green-500/25'
  ];
  const hoverGradientClasses = [
    'group-hover:from-blue-500 group-hover:to-cyan-500',
    'group-hover:from-purple-500 group-hover:to-pink-500',
    'group-hover:from-orange-500 group-hover:to-red-500',
    'group-hover:from-green-500 group-hover:to-emerald-500'
  ];
  const barColorClasses = [
    'bg-gradient-to-r from-blue-500 to-cyan-500',
    'bg-gradient-to-r from-purple-500 to-pink-500',
    'bg-gradient-to-r from-orange-500 to-red-500',
    'bg-gradient-to-r from-green-500 to-emerald-500'
  ];
  const gradient = gradients[index % gradients.length];
  const shadow = shadowClasses[index % shadowClasses.length];
  const hoverGradient = hoverGradientClasses[index % hoverGradientClasses.length];
  const barColor = barColorClasses[index % barColorClasses.length];

  const cardRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setBarWidth(proficiency || 0), 200 + index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [proficiency, index]);

  return (
    <div ref={cardRef} className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
        <div className={`w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg ${shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {icon === 'code' && (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          )}
          {icon === 'server' && (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          )}
          {icon === 'layout' && (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          )}
          {icon === 'users' && (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>

        <h3 className={`text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:bg-gradient-to-r ${hoverGradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>{title}</h3>

        {/* Animated proficiency bar */}
        {proficiency !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Proficiency</span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{proficiency}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-colors duration-200"
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
              proficiency={category.proficiency}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
