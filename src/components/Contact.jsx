import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = ({ text }) => {
  const formRef = useRef();
  const [formStatus, setFormStatus] = useState('idle');
  const emailJsConfig = {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  };
  const hasEmailJsConfig = Object.values(emailJsConfig).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasEmailJsConfig) {
      const formData = new FormData(formRef.current);
      const subject = encodeURIComponent(`Portfolio contact from ${formData.get('from_name')}`);
      const body = encodeURIComponent(
        `${formData.get('message')}\n\nReply to: ${formData.get('reply_to')}`
      );
      window.location.href = `mailto:merebanglo@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setFormStatus('sending');

    emailjs.sendForm(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      formRef.current,
      emailJsConfig.publicKey
    ).then(() => {
      setFormStatus('success');
      formRef.current.reset();
    }).catch(() => {
      setFormStatus('error');
    });
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gray-50 dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 flex items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-mono mr-4 border border-gray-200 dark:border-gray-700">
            05
          </span>
          <span>{text.sectionTitle}</span>
        </h2>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] max-w-5xl mx-auto">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md shadow-gray-900/5 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{text.subtitle}</h3>
            <p className="mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              {text.description}
            </p>

            <div className="space-y-4">
              <ContactCard
                title={text.email}
                value="merebanglo@gmail.com"
                href="mailto:merebanglo@gmail.com"
                iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
              <ContactCard
                title={text.phone}
                value="+46 76 408 79 19"
                href="tel:+46764087919"
                iconPath="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </div>

            <SocialLinks />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md shadow-gray-900/5 dark:border-gray-700 dark:bg-gray-800">
            <form ref={formRef} onSubmit={handleSubmit}>
              <FormField
                id="contact-name"
                label={text.formName}
                name="from_name"
                placeholder={text.formNamePlaceholder}
                type="text"
              />
              <FormField
                id="contact-email"
                label={text.formEmail}
                name="reply_to"
                placeholder={text.formEmailPlaceholder}
                type="email"
              />

              <div className="mb-6">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {text.formMessage}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={text.formMessagePlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 resize-none"
                />
              </div>

              {formStatus === 'success' && (
                <p className="mb-4 text-green-600 dark:text-green-400 text-sm font-medium text-center">
                  {text.formSuccess}
                </p>
              )}
              {formStatus === 'error' && (
                <p className="mb-4 text-red-600 dark:text-red-400 text-sm font-medium text-center">
                  {text.formError}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {text.formSending}
                  </>
                ) : hasEmailJsConfig ? text.formSend : (text.formEmailFallback || 'Continue in Email App')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ id, label, name, placeholder, type }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      name={name}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
    />
  </div>
);

const ContactCard = ({ title, value, href, iconPath }) => (
  <a
    href={href}
    className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors duration-200 hover:border-blue-500 dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-blue-400"
  >
    <div className="mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}/>
      </svg>
    </div>
    <div className="min-w-0 text-left">
      <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="truncate font-medium text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  </a>
);

const SocialLinks = () => (
  <div className="mt-8 flex gap-3">
    <SocialLink href="https://github.com/abasheger" label="GitHub Profile" icon="github" />
    <SocialLink href="https://www.linkedin.com/in/abenezer-anglo-537488144/" label="LinkedIn Profile" icon="linkedin" />
  </div>
);

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-200 hover:border-blue-500 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-300"
    aria-label={label}
  >
    {icon === 'github' ? (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 0 6.484 0 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )}
  </a>
);
