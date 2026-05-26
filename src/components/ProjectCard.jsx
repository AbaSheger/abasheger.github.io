import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectCard = ({ project }) => {
  const { language } = useLanguage();

  const {
    title,
    description,
    technologies,
    image,
    liveLink,
    githubLink,
    isOpenSource,
    isInternship,
    isSchoolProject,
    isSideProject,
    isDesktopApp,
    isFreelance
  } = project;

  const getProjectTag = () => {
    if (isFreelance) return { text: language === 'en' ? 'Freelance' : 'Frilans', bg: 'bg-teal-600' };
    if (isOpenSource) return { text: language === 'en' ? 'Open Source' : 'Öppen Källkod', bg: 'bg-green-600' };
    if (isInternship) return { text: language === 'en' ? 'Internship' : 'Praktik', bg: 'bg-purple-600' };
    if (isSchoolProject) return { text: language === 'en' ? 'School Project' : 'Skolprojekt', bg: 'bg-blue-600' };
    if (isSideProject) return { text: language === 'en' ? 'Side Project' : 'Sidoprojekt', bg: 'bg-yellow-600' };
    if (isDesktopApp) return { text: language === 'en' ? 'Desktop App' : 'Skrivbordsapp', bg: 'bg-gray-600' };
    return null;
  };

  const tag = getProjectTag();
  const headingId = `project-${title.replace(/\s+/g, '-')}`;

  return (
    <article
      className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md shadow-gray-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
      aria-labelledby={headingId}
    >
      {image && (
        <div className="relative h-48 overflow-hidden border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
          {tag && (
            <div className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${tag.bg}`}>
              {tag.text}
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        <h3
          id={headingId}
          className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-200 hover:text-blue-700 dark:text-white dark:hover:text-blue-300"
        >
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-400">
          {description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
          {technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 5 && (
            <span className="px-2 py-1 text-xs text-gray-400 dark:text-gray-500">
              +{technologies.length - 5}
            </span>
          )}
        </div>

        <div className="flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700/50">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-blue-800"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {language === 'en' ? 'Live Demo' : 'Se Live'}
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:border-gray-400 ${liveLink ? '' : 'flex-1'}`}
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              {language === 'en' ? 'Code' : 'Kod'}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
