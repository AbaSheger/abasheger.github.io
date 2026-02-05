import React from 'react';

export const Contact = ({ text }) => {
  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800/50 dark:to-dark-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <h2 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 flex items-center group">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-mono mr-4 shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-110">
            05
          </span>
          <span className="relative">
            {text.sectionTitle}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </span>
        </h2>
        
        {/* Main contact card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 text-center max-w-3xl mx-auto border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{text.subtitle}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
              {text.description}
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
              <ContactCard
                type="email"
                title={text.email}
                value="merebanglo@gmail.com"
                href="mailto:merebanglo@gmail.com"
                gradient="from-blue-500 to-cyan-500"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                }
              />
              <ContactCard
                type="phone"
                title={text.phone}
                value="+46 76 408 79 19"
                href="tel:+46764087919"
                gradient="from-purple-500 to-pink-500"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                }
              />
            </div>
            
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ type, title, value, href, icon, gradient }) => (
  <a 
    href={href} 
    className="group/card flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
  >
    {/* Gradient background on hover */}
    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover/card:opacity-10 transition-opacity duration-300`}></div>
    
    <div className={`mr-4 flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300`}>
      {icon}
    </div>
    <div className="text-left relative z-10">
      <h4 className="text-sm uppercase font-bold text-gray-400 dark:text-gray-500 mb-1 tracking-wider">{title}</h4>
      <p className="text-gray-800 dark:text-gray-200 font-medium group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">{value}</p>
    </div>
  </a>
);

const SocialLinks = () => (
  <div className="flex justify-center gap-4">
    <SocialLink
      href="https://github.com/abasheger"
      icon="github"
      label="GitHub Profile"
      gradient="from-gray-700 to-gray-900"
    />
    <SocialLink
      href="https://www.linkedin.com/in/abenezer-anglo-537488144/"
      icon="linkedin"
      label="LinkedIn Profile"
      gradient="from-blue-600 to-blue-800"
    />
  </div>
);

const SocialLink = ({ href, icon, label, gradient }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group/social relative flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700/50 hover:bg-gradient-to-br hover:${gradient} text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-110`}
    aria-label={label}
  >
    {icon === 'github' ? (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 0 6.484 0 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
      </svg>
    ) : (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )}
  </a>
);