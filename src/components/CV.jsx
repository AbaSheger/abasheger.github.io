import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DownloadIcon = () => (
  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const CV = () => {
  const { text } = useLanguage();

  return (
    <section id="cv" className="bg-white px-4 py-20 dark:bg-dark-800/20" aria-labelledby="cv-title">
      <div className="mx-auto max-w-5xl">
        <h2 id="cv-title" className="mb-8 flex items-center text-2xl font-bold sm:text-3xl">
          <span className="mr-2 inline-block text-right font-mono text-blue-600 dark:text-blue-400" style={{ width: '3ch' }}>04.</span>
          {text.cv?.sectionTitle || 'Curriculum Vitae'}
        </h2>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a href="/assets/cv-en.pdf" download="Abenezer_Anglo_CV_EN.pdf" aria-label="Download CV in English" className="download-btn inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700">
            <DownloadIcon />
            {text.cv?.downloadBtnEn || 'Download CV (English)'}
          </a>
          <a href="/assets/cv-sv.pdf" download="Abenezer_Anglo_CV_SV.pdf" aria-label="Download CV in Swedish" className="download-btn inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700">
            <DownloadIcon />
            {text.cv?.downloadBtnSv || 'Download CV (Swedish)'}
          </a>
        </div>
      </div>
    </section>
  );
};
