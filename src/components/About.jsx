import React from 'react';

export const About = ({ text }) => {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-dark-800/20 dark:via-dark-900/30 dark:to-dark-800/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section heading with gradient number */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 flex items-center group">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-mono mr-4 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
            01
          </span>
          <span className="relative">
            {text.sectionTitle}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </span>
        </h2>
        
        <div className="space-y-8 text-gray-600 dark:text-gray-300 max-w-3xl">
          {/* Bio cards with glassmorphism */}
          <div className="group p-6 rounded-2xl bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
            <p className="text-lg leading-relaxed">{text.bio1}</p>
          </div>
          <div className="group p-6 rounded-2xl bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
            <p className="text-lg leading-relaxed">{text.bio2}</p>
          </div>
          
          {/* Education Section */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </span>
              {text.education.title}
            </h3>
            
            {/* Timeline-style education list */}
            <div className="space-y-4 relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full"></div>
              
              {[text.education.current, text.education.ml, text.education.bachelor, text.education.csharp].map((item, index) => (
                <div key={index} className="group flex items-start gap-4 pl-8 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 group-hover:border-purple-500 transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-purple-500 transition-colors"></div>
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 group-hover:border-blue-300 dark:group-hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
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
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400">
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
                className="group flex items-center gap-5 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
              >
                {/* Microsoft Logo with glow effect */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 p-2 group-hover:scale-110">
                    <svg className="w-12 h-12" viewBox="0 0 23 23" fill="none">
                      <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
                      <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
                      <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
                      <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
                    </svg>
                  </div>
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {text.certifications?.azure || 'Microsoft Certified: Azure Fundamentals'}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg shadow-green-500/25">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};