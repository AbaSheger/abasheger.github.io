import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const tagConfig = {
  isFreelance:    { en: 'Freelance',    sv: 'Frilans',       color: 'from-teal-400/20 to-teal-500/10 text-teal-300 border-teal-400/30' },
  isOpenSource:   { en: 'Open Source',  sv: 'Öppen Källkod', color: 'from-green-400/20 to-green-500/10 text-green-300 border-green-400/30' },
  isInternship:   { en: 'Internship',   sv: 'Praktik',       color: 'from-purple-400/20 to-purple-500/10 text-purple-300 border-purple-400/30' },
  isSchoolProject:{ en: 'School',       sv: 'Skola',         color: 'from-blue-400/20 to-blue-500/10 text-blue-300 border-blue-400/30' },
  isSideProject:  { en: 'Side Project', sv: 'Sidoprojekt',   color: 'from-cyan-400/20 to-cyan-500/10 text-cyan-300 border-cyan-400/30' },
  isDesktopApp:   { en: 'Desktop App',  sv: 'Skrivbordsapp', color: 'from-slate-400/20 to-slate-500/10 text-slate-300 border-slate-400/30' },
};

const placeholderPalettes = [
  { bg: 'from-blue-600/80 via-blue-700/60 to-cyan-600/80',    glow: 'rgba(59,130,246,0.4)' },
  { bg: 'from-violet-600/80 via-violet-700/60 to-blue-600/80', glow: 'rgba(139,92,246,0.4)' },
  { bg: 'from-cyan-600/80 via-cyan-700/60 to-teal-600/80',    glow: 'rgba(6,182,212,0.4)' },
  { bg: 'from-indigo-600/80 via-indigo-700/60 to-purple-600/80', glow: 'rgba(99,102,241,0.4)' },
  { bg: 'from-sky-600/80 via-sky-700/60 to-blue-600/80',      glow: 'rgba(14,165,233,0.4)' },
  { bg: 'from-blue-700/80 via-blue-800/60 to-indigo-600/80',  glow: 'rgba(29,78,216,0.4)' },
];

const GitHubIcon = () => (
  <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const ProjectCard = ({ project }) => {
  const { language } = useLanguage();
  const { id, title, description, technologies, image, liveLink, githubLink } = project;

  const tagKey = Object.keys(tagConfig).find((k) => project[k]);
  const tag = tagKey ? tagConfig[tagKey] : null;
  const palette = placeholderPalettes[(id - 1) % placeholderPalettes.length];
  const headingId = `project-${title.replace(/\s+/g, '-')}`;
  const initials = title.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
      aria-labelledby={headingId}
    >
      {/* Hover glow ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${palette.glow} 0%, transparent 70%)`,
          border: `1px solid ${palette.glow.replace('0.4', '0.5')}`,
        }}
      />

      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div className="absolute inset-0">
          {image ? (
            <>
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Gradient overlay so text below blends */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </>
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${palette.bg} relative`}>
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
              <span className="relative text-5xl font-black select-none tracking-tighter" style={{ color: 'rgba(255,255,255,0.15)', textShadow: '0 2px 20px rgba(255,255,255,0.1)' }}>{initials}</span>
            </div>
          )}

          {/* Tag badge */}
          {tag && (
            <span
              className={`absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-gradient-to-r backdrop-blur-md ${tag.color}`}
            >
              {tag[language] ?? tag.en}
            </span>
          )}
        </div>
      </div>

      {/* Glass content panel */}
      <div
        className="flex flex-col flex-1 p-4 gap-2.5 relative"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Subtle inner highlight at top of panel */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <h3
          id={headingId}
          className="font-bold text-white text-sm leading-snug line-clamp-1 tracking-tight"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
        >
          {title}
        </h3>

        <p className="text-xs text-white/55 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1" role="list" aria-label="Technologies used">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white/70"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="px-1 py-0.5 text-[10px] text-white/30">+{technologies.length - 3}</span>
          )}
        </div>

        {/* Links — always visible */}
        {(liveLink || githubLink) && (
          <div className="flex gap-2 pt-2 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 px-3 text-[11px] font-bold text-white transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(37,99,235,0.9))',
                  border: '1px solid rgba(96,165,250,0.4)',
                  boxShadow: '0 2px 12px rgba(59,130,246,0.3)',
                }}
              >
                <ExternalIcon />
                Live
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-1.5 rounded-full py-1.5 px-3 text-[11px] font-bold text-white/80 hover:text-white transition-all duration-200 active:scale-95 ${liveLink ? '' : 'flex-1'}`}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
