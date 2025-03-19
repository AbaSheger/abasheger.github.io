import React from 'react';

export const About = ({ text }) => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-5xl mx-auto animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono">01.</span> {text.sectionTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {text.bio1}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {text.bio2}
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="mailto:merebanglo@yahoo.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                merebanglo@yahoo.com
              </a>
              <a href="tel:+46764087919" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +46764087919
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-blue-600 dark:border-blue-400 relative z-10">
              <img 
                src="assets/profile.jpg" 
                alt="Abenezer Anglo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-blue-600/10 rounded-lg translate-x-3 translate-y-3 -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};