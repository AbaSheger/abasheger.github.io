import React from 'react';

export const About = ({ text }) => {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-dark-800/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 flex items-center">
          <span className="inline-block text-blue-600 dark:text-blue-400 mr-2 font-mono text-right" style={{ width: '3ch' }}>01.</span>
          {text.sectionTitle}
        </h2>
        
        <div className="space-y-8 text-gray-600 dark:text-gray-300 max-w-3xl">
          <p className="text-lg leading-relaxed hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200">{text.bio1}</p>
          <p className="text-lg leading-relaxed hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200">{text.bio2}</p>
          
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{text.education.title}</h3>            <ul className="space-y-4 list-disc list-inside ml-4">
              <li className="text-lg">{text.education.current}</li>
              <li className="text-lg">{text.education.ml}</li>
              <li className="text-lg">{text.education.bachelor}</li>
              <li className="text-lg ml-6">{text.education.major}</li>
              <li className="text-lg">{text.education.csharp}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};