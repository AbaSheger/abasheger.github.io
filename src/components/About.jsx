import React from 'react';

export const About = ({ text }) => {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-white/5 sm:py-24">
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 flex items-center sm:mb-12">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-mono mr-4 border border-gray-200 dark:border-gray-700">
            01
          </span>
          <span>{text.sectionTitle}</span>
        </h2>
        
        <div className="text-gray-600 dark:text-gray-300">
          {/* Bio cards */}
          <div className="space-y-4 max-w-3xl">
            <div className="p-5 rounded-xl bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/5 shadow-md shadow-gray-900/5">
              <p className="text-lg leading-relaxed">{text.bio1}</p>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/5 shadow-md shadow-gray-900/5">
              <p className="text-lg leading-relaxed">{text.bio2}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Education Section */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </span>
              {text.education.title}
            </h3>
            
            {/* Timeline-style education list */}
            <div className="space-y-3 relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              
              {[text.education.current, text.education.ml, text.education.bachelor, text.education.csharp].map((item, index) => (
                <div key={index} className="group flex items-start gap-4 pl-8 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 group-hover:border-purple-500 transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-purple-500 transition-colors"></div>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-base font-medium text-gray-700 dark:text-gray-200">
                      {item === text.education.bachelor ? (
                        <>
                          {item}
                          <span className="block mt-1 text-sm text-gray-500 dark:text-gray-400 pl-2 border-l-2 border-purple-500/50">{text.education.major}</span>
                        </>
                      ) : item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </span>
              {text.certifications?.title || 'Certifications'}
            </h3>
            <div className="space-y-4">
              <a
                href="https://learn.microsoft.com/en-us/users/AbenezerAnglo-2880/credentials/CF22B85D7993E75D"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-800 shadow-sm"
              >
                {/* Microsoft Logo with glow effect */}
                <div className="relative flex-shrink-0">
                  <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm transition-colors duration-200 p-2 border border-gray-100">
                    <svg className="w-8 h-8" viewBox="0 0 23 23" fill="none">
                      <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
                      <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
                      <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
                      <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
                    </svg>
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {text.certifications?.azure || 'Microsoft Certified: Azure Fundamentals'}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {text.certifications?.verified || 'Verified'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {text.certifications?.azureDate || 'Earned January 20, 2026'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono">
                    ID: CF22B85D7993E75D
                  </p>
                </div>

                {/* Arrow icon */}
                <div className="flex-shrink-0 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>

              {/* Anthropic Claude in Action */}
              <a
                href="https://verify.skilljar.com/c/o3mfxajuryzu"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors duration-200 bg-white dark:bg-gray-800 shadow-sm"
              >
                <div className="relative flex-shrink-0">
                  <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm transition-colors duration-200 p-2 border border-gray-100">
                    {/* Official Anthropic logo via SimpleIcons CDN */}
                    <img
                      src="https://cdn.simpleicons.org/anthropic/CC785C"
                      alt="Anthropic"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {text.certifications?.claude || 'Anthropic: Claude in Action'}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {text.certifications?.verified || 'Verified'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {text.certifications?.claudeDate || 'Earned March 2026'}
                  </p>
                </div>

                {/* Arrow icon */}
                <div className="flex-shrink-0 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
