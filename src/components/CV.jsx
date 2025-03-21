import React from 'react';

export const CV = ({ text }) => {
  return (
    <section id="cv" className="py-20 px-4 bg-white dark:bg-dark-800/20" aria-labelledby="cv-title">
      <div className="max-w-5xl mx-auto">
        <h2 id="cv-title" className="text-2xl sm:text-3xl font-bold mb-8 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono w-8">04.</span>
          {text.sectionTitle}
        </h2>
        
        <div className="flex justify-center gap-4">
          {/* English CV */}
          <a 
            href="/assets/cv-en.pdf" 
            download="Abenezer_Anglo_CV_EN.pdf"
            aria-label="Download CV in English"
            onClick={(e) => {
              if (!e.currentTarget.href.includes('/assets/cv-en.pdf')) {
                e.preventDefault();
                alert('English CV PDF file is not available yet. Please try again later.');
              }
            }}
            className="download-btn inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {text.downloadBtnEn}
          </a>

          {/* Swedish CV */}
          <a 
            href="/assets/cv-sv.pdf" 
            download="Abenezer_Anglo_CV_SV.pdf"
            aria-label="Download CV in Swedish"
            onClick={(e) => {
              if (!e.currentTarget.href.includes('/assets/cv-sv.pdf')) {
                e.preventDefault();
                alert('Swedish CV PDF file is not available yet. Please try again later.');
              }
            }}
            className="download-btn inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {text.downloadBtnSv}
          </a>
        </div>
      </div>
    </section>
  );
};