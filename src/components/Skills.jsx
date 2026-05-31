import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { skillCategories } from '../data/skills';

const coreSkills = [
  ['Java', 'Primary'],
  ['Spring Boot', 'Primary'],
  ['REST APIs', 'Primary'],
  ['PostgreSQL', 'Working knowledge'],
  ['Docker', 'Working knowledge'],
  ['GitHub Actions', 'Working knowledge'],
  ['React', 'Working knowledge'],
  ['TypeScript', 'Working knowledge'],
  ['Kafka', 'Exploring'],
  ['MCP', 'Exploring'],
  ['Playwright', 'Exploring'],
  ['libGDX', 'Exploring']
];

const levelStyles = {
  Primary: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-300',
  'Working knowledge': 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-900/20 dark:text-emerald-300',
  Exploring: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-300'
};

export const Skills = ({ text }) => {
  const { language } = useLanguage();
  const [showAdditional, setShowAdditional] = useState(false);
  const isEnglish = language !== 'sv';
  const allSkills = [...new Set(skillCategories.flatMap(category => category.skills))];
  const coreSkillNames = new Set(coreSkills.map(([skill]) => skill));
  const additionalSkills = allSkills.filter(skill => !coreSkillNames.has(skill));

  const localLevel = level => {
    if (isEnglish) return level;
    if (level === 'Primary') return 'Primär';
    if (level === 'Working knowledge') return 'Praktisk kunskap';
    return 'Utforskar';
  };

  return (
    <section id="skills" className="border-t border-gray-100 bg-white px-4 py-24 dark:border-gray-800 dark:bg-dark-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <h2 className="flex items-center text-2xl font-bold sm:text-3xl md:text-4xl">
            <span className="mr-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 font-mono text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-300">
              03
            </span>
            <span>{text.sectionTitle}</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            {isEnglish
              ? 'Core technologies are grouped by demonstrated focus. Additional tools remain available without competing for attention.'
              : 'Kärntekniker grupperas efter demonstrerat fokus. Ytterligare verktyg finns tillgängliga utan att konkurrera om uppmärksamheten.'}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreSkills.map(([skill, level]) => (
            <div key={skill} className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800/80 dark:hover:border-blue-700">
              <span className="font-bold text-gray-900 dark:text-white">{skill}</span>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${levelStyles[level]}`}>
                {localLevel(level)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{isEnglish ? 'Additional tools' : 'Ytterligare verktyg'}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isEnglish ? `${additionalSkills.length} technologies from projects, coursework, and ongoing learning.` : `${additionalSkills.length} tekniker från projekt, kurser och pågående lärande.`}
              </p>
            </div>
            <button onClick={() => setShowAdditional(previous => !previous)} className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-300">
              {showAdditional ? (isEnglish ? 'Hide tools' : 'Dölj verktyg') : (isEnglish ? 'Show tools' : 'Visa verktyg')}
            </button>
          </div>
          {showAdditional && (
            <div className="mt-5 flex flex-wrap gap-2">
              {additionalSkills.map(skill => (
                <span key={skill} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
