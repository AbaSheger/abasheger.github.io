import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
};

const formatRepoName = (name) =>
  name
    .replace(/[-_]/g, ' ')
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const getRelativeTime = (dateStr, language) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return language === 'sv' ? 'Idag' : 'Today';
  if (diffDays === 1) return language === 'sv' ? '1 dag sedan' : '1 day ago';
  if (diffDays < 30)
    return language === 'sv' ? `${diffDays} dagar sedan` : `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return language === 'sv' ? '1 månad sedan' : '1 month ago';
  if (diffMonths < 12)
    return language === 'sv' ? `${diffMonths} månader sedan` : `${diffMonths} months ago`;
  const diffYears = Math.floor(diffDays / 365);
  return language === 'sv'
    ? `${diffYears} år sedan`
    : `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};

const SkeletonCard = () => (
  <div className="relative h-full animate-pulse">
    <div className="h-full bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
      <div className="h-36 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const RepoCard = ({ repo, language: lang }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`;
  const langColor = languageColors[repo.language] || '#8b949e';

  return (
    <div className="group relative h-full" role="article" aria-labelledby={`repo-${repo.id}`}>
      {/* Hover glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:duration-200"></div>

      <div className="relative h-full bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-1 flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-36 overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
          {!imgError ? (
            <img
              src={thumbnailUrl}
              alt={`${repo.name} preview`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/20 to-teal-500/20">
              <GitHubIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/10 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>

          {/* GitHub icon link */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            aria-label={`View ${repo.name} on GitHub`}
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3
            id={`repo-${repo.id}`}
            className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {formatRepoName(repo.name)}
            </a>
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
            {repo.description || (lang === 'sv' ? 'Ingen beskrivning' : 'No description')}
          </p>

          {/* Footer row */}
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: langColor }}
                  aria-hidden="true"
                ></span>
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <span aria-hidden="true">⭐</span>
                {repo.stargazers_count}
              </span>
            )}
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
              {lang === 'sv' ? 'Uppdaterad' : 'Updated'}{' '}
              {getRelativeTime(repo.pushed_at, lang)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GitHubActivity = () => {
  const { language } = useLanguage();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const CACHE_KEY = 'gh_activity_cache';
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    const applyData = (data) => {
      const filtered = data
        .filter((r) => !r.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      if (!cancelled) {
        setRepos(filtered);
        setLoading(false);
      }
    };

    // Use cached data if still fresh
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.ts < CACHE_TTL) {
        applyData(cached.data);
        return;
      }
    } catch (_) {
      // Ignore storage errors
    }

    setLoading(true);
    setError(false);

    fetch('https://api.github.com/users/AbaSheger/repos?sort=updated&per_page=20')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API unavailable');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
        } catch (_) {
          // Ignore storage quota errors
        }
        applyData(data);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const heading = language === 'sv' ? 'GitHub-aktivitet' : 'GitHub Activity';
  const subtitle =
    language === 'sv'
      ? 'Direktflöde av mina publika repos — alltid aktuellt.'
      : 'Live feed of my public repositories — always up to date.';
  const viewAllLabel = language === 'sv' ? 'Se alla på GitHub →' : 'View all on GitHub →';

  return (
    <section
      id="github-activity"
      className="py-24 px-4 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-dark-800/20 dark:via-dark-900/30 dark:to-dark-800/20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 flex items-center group">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 text-white font-mono mr-4 shadow-lg shadow-green-500/25 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
            03
          </span>
          <span className="relative">
            {heading}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-teal-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-10 ml-16">{subtitle}</p>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <GitHubIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {language === 'sv'
                ? 'Kunde inte ladda GitHub-repos. Besök min GitHub-profil direkt.'
                : "Couldn't load GitHub repos. Visit my GitHub profile directly."}
            </p>
            <a
              href="https://github.com/AbaSheger"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:opacity-90 transition-opacity"
            >
              <GitHubIcon className="w-5 h-5" />
              {language === 'sv' ? 'Öppna GitHub' : 'Open GitHub'}
            </a>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            {language === 'sv' ? 'Inga publika repos hittades.' : 'No public repositories found.'}
          </div>
        )}

        {/* Repo grid */}
        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} language={language} />
            ))}
          </div>
        )}

        {/* View all link */}
        {!loading && !error && repos.length > 0 && (
          <div className="flex justify-end mt-8">
            <a
              href="https://github.com/AbaSheger?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
            >
              {viewAllLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
