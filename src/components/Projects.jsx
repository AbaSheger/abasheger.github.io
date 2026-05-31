import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

const FEATURED_PROJECT_IDS = new Set([24, 27, 25, 26, 23, 7, 8, 28]);

const projectCategories = [
  { id: 'all', label: 'filterAll' },
  { id: 'backend', label: 'filterBackend' },
  { id: 'fullstack', label: 'filterFullstack' },
  { id: 'cloud', label: 'filterCloud' },
  { id: 'desktop', label: 'filterDesktop' }
];

export const Projects = () => {
  const { language, text } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showArchive, setShowArchive] = useState(false);

  const currentProjects = projects[language] || projects.en;
  const filteredProjects = currentProjects.filter(
    project => activeFilter === 'all' || project.category === activeFilter
  );
  const featuredProjects = filteredProjects.filter(project => FEATURED_PROJECT_IDS.has(project.id));
  const archiveProjects = filteredProjects.filter(project => !FEATURED_PROJECT_IDS.has(project.id));
  const visibleFeaturedProjects = activeFilter === 'all' ? featuredProjects : filteredProjects;
  const totalWithLiveDemo = currentProjects.filter(project => project.liveLink).length;
  const isEnglish = language !== 'sv';

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-white/5 bg-[#0d0d0f] px-4 py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-blue-300">
              {isEnglish ? 'Selected work' : 'Utvalda projekt'}
            </p>
            <h2 className="flex items-center text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="mr-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 font-mono text-base text-blue-300">
                02
              </span>
              <span>{text.projects.sectionTitle}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              {isEnglish
                ? 'A curated selection of shipped products, backend systems, AI tooling, and technical experiments. Explore the archive for additional coursework and smaller builds.'
                : 'Ett kurerat urval av lanserade produkter, backend-system, AI-verktyg och tekniska experiment. Utforska arkivet för fler kursprojekt och mindre byggen.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              [currentProjects.length, isEnglish ? 'Projects' : 'Projekt'],
              [totalWithLiveDemo, isEnglish ? 'Live demos' : 'Live-demos'],
              [featuredProjects.length, isEnglish ? 'Featured' : 'Utvalda']
            ].map(([value, label]) => (
              <div key={label} className="min-w-24 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="-mx-4 mb-10 overflow-x-auto px-4 pb-2">
          <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
            {projectCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === category.id
                    ? 'border-blue-300/70 bg-blue-500 text-white shadow-lg shadow-blue-900/30'
                    : 'border-white/10 bg-white/[0.05] text-white/65 hover:border-white/25 hover:bg-white/10 hover:text-white'
                }`}
              >
                {text.projects[category.label]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">
            {isEnglish ? 'Featured projects' : 'Utvalda projekt'}
          </h3>
          <span className="text-xs text-white/35">{visibleFeaturedProjects.length} {isEnglish ? 'shown' : 'visas'}</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleFeaturedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {activeFilter === 'all' && archiveProjects.length > 0 && (
          <div className="mt-12">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:flex-row">
              <div>
                <h3 className="font-bold text-white">{isEnglish ? 'Project archive' : 'Projektarkiv'}</h3>
                <p className="mt-1 text-sm text-white/45">
                  {isEnglish
                    ? `${archiveProjects.length} additional coursework and experimental builds.`
                    : `${archiveProjects.length} ytterligare kursprojekt och experimentella byggen.`}
                </p>
              </div>
              <button
                onClick={() => setShowArchive(previous => !previous)}
                className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white transition hover:border-blue-400/60 hover:bg-blue-500/20"
              >
                {showArchive ? text.projects.showLess : `${text.projects.showMore} (${archiveProjects.length})`}
              </button>
            </div>

            {showArchive && (
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {archiveProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-white/50">
            {isEnglish ? 'No projects found in this category.' : 'Inga projekt hittades i denna kategori.'}
          </div>
        )}
      </div>
    </section>
  );
};
