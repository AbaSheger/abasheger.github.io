import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const CV = () => {
  const { language, text } = useLanguage();

  const handleCVDownload = (e, lang) => {
    const cvPath = `/assets/cv-${lang}.pdf`;
    fetch(cvPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('CV not found');
        }
      })
      .catch(() => {
        e.preventDefault();
        alert(language === 'en' 
          ? `${lang.toUpperCase()} CV file is not available yet. Please try again later.`
          : `${lang.toUpperCase()} CV-fil är inte tillgänglig än. Vänligen försök igen senare.`
        );
      });
  };

  return (
    <section id="cv" className="py-20 px-4 bg-white dark:bg-dark-800/20" aria-labelledby="cv-title">
      <div className="max-w-5xl mx-auto">
        <h2 id="cv-title" className="text-2xl sm:text-3xl font-bold mb-8 flex items-center">
          <span className="inline-block text-blue-600 dark:text-blue-400 mr-2 font-mono text-right" style={{ width: '3ch' }}>04.</span>
          {text.cv?.sectionTitle || 'Curriculum Vitae'}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* English CV */}
          <a 
            href="/assets/cv-en.pdf" 
            download="Abenezer_Anglo_CV_EN.pdf"
            aria-label="Download CV in English"
            onClick={(e) => handleCVDownload(e, 'en')}
            className="download-btn inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {text.cv?.downloadBtnEn || 'Download CV (English)'}
          </a>

          {/* Swedish CV */}
          <a 
            href="/assets/cv-sv.pdf" 
            download="Abenezer_Anglo_CV_SV.pdf"
            aria-label="Download CV in Swedish"
            onClick={(e) => handleCVDownload(e, 'sv')}
            className="download-btn inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {text.cv?.downloadBtnSv || 'Download CV (Swedish)'}
          </a>
        </div>
      </div>
    </section>
  );
};