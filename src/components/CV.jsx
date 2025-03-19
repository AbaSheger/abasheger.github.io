import React from 'react';

export const CV = ({ text }) => {
  return (
    <section id="cv" className="py-20 px-4 bg-white dark:bg-dark-800/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono">05.</span>
          {text.sectionTitle}
        </h2>
        
        {/* Header & Download Button */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{text.personalInfo.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {text.personalInfo.location}
            </p>
          </div>
          <a 
            href="/cv.pdf" 
            download 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {text.downloadBtn}
          </a>
        </div>
        
        {/* Personal Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {text.personalInfo.title}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {text.personalInfo.phone}
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {text.personalInfo.email}
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href="https://www.linkedin.com/in/abenezer-anglo-537488144/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 0 6.484 0 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
                <a href="https://github.com/abasheger" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          {/* Technical Skills */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {text.techSkills.title}
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-semibold">{text.techSkills.languages}</span> {text.techSkills.languagesList}
              </li>
              <li>
                <span className="font-semibold">{text.techSkills.devops}</span> {text.techSkills.devopsList}
              </li>
              <li>
                <span className="font-semibold">{text.techSkills.databases}</span> {text.techSkills.databasesList}
              </li>
              <li>
                <span className="font-semibold">{text.techSkills.other}</span> {text.techSkills.otherList}
              </li>
            </ul>
          </div>
        </div>
        
        {/* Professional Experience */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {text.experience.title}
          </h3>
          
          <div className="space-y-8">
            {text.experience.items.map((job, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="flex flex-wrap justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{job.position}</h4>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">{job.period}</span>
                </div>
                <div className="mb-2">
                  <p className="text-gray-700 dark:text-gray-300">{job.company}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {text.education.title}
          </h3>
          
          <div className="space-y-6">
            {text.education.items.map((edu, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">{edu.period}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-1">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Projects */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {text.projects.title}
          </h3>
          
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 pl-4">
            {text.projects.items.map((project, index) => (
              <li key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.15}s` }}>
                {project}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Languages */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {text.languages.title}
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {text.languages.items.map((language, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-dark-800 rounded-md py-2 px-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                {language}
              </div>
            ))}
          </div>
        </div>
        
        {/* Other */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {text.other.title}
          </h3>
          
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-4">
            {text.other.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};