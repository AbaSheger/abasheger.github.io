import React, { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';

const SENIOR_KEYWORDS = /\b(senior|lead|principal|staff|architect|head of|vp\b|vice president)\b/i;
const HIGH_EXPERIENCE = /\b([5-9]|1[0-9])\+?\s*(?:years?|yrs?)(?:\s+of)?\s*(?:professional\s*)?(?:experience|exp)\b/i;
const MID_EXPERIENCE = /\b[3-4]\+?\s*(?:years?|yrs?)(?:\s+of)?\s*(?:professional\s*)?(?:experience|exp)\b/i;

const skillAliases = {
  'REST APIs': ['rest api', 'restful api', 'rest services'],
  'GitHub Actions': ['github actions', 'ci/cd'],
  'Spring Cloud': ['microservices', 'microservice'],
  'Docker': ['containers', 'containerization'],
  'Azure DevOps': ['azure devops', 'ci/cd', 'cloud'],
  'HTML/CSS': ['html', 'css'],
  '.NET': ['.net', 'dotnet'],
  'ASP.NET Core': ['asp.net', 'asp.net core'],
  'Spring Boot': ['spring boot', 'spring'],
  'Node.js': ['node.js', 'nodejs', 'node'],
  'TypeScript': ['typescript', 'ts'],
  'JavaScript': ['javascript', 'js'],
  'PostgreSQL': ['postgresql', 'postgres'],
  'MCP': ['mcp', 'model context protocol'],
  'System Integration': ['system integration', 'integration developer', 'integrations', 'api integration'],
  'LLM tools': ['llm', 'large language model'],
  'AI-assisted development': ['ai-assisted', 'ai tools', 'copilot'],
  'Desktop Game': ['game development', 'desktop game', 'gameplay', 'gaming'],
  'libGDX': ['libgdx'],
  'Kafka': ['event-driven', 'event streaming'],
  'GitHub': ['github', 'version control'],
  'Git': ['git', 'version control']
};

const knownMissingSkills = [
  'AWS', 'Unity', 'Unreal Engine', 'C++', 'Redis', 'MongoDB', 'Terraform',
  'Kubernetes', 'GraphQL', 'RabbitMQ', 'Jenkins', 'React Native'
];

const rolePresets = {
  en: [
    ['Junior Java Developer', 'We are looking for a Junior Java Developer to build REST APIs using Java, Spring Boot, PostgreSQL, Docker, Git, JUnit, and Agile Scrum practices.'],
    ['Backend Developer', 'Backend Developer wanted for REST API and microservice development using Java, Spring Boot, PostgreSQL, Kafka, Docker, GitHub Actions, and cloud deployment.'],
    ['Full-Stack Developer', 'Full-Stack Developer role using React, TypeScript, JavaScript, Node.js, REST APIs, PostgreSQL, Docker, and Git.'],
    ['Game Developer', 'Junior Game Developer role focused on Java or C++, game development, gameplay loops, collision detection, desktop games, and Git. Unity experience is a plus.']
  ],
  sv: [
    ['Junior Java-utvecklare', 'Vi söker en junior Java-utvecklare som bygger REST API:er med Java, Spring Boot, PostgreSQL, Docker, Git, JUnit och agila Scrum-metoder.'],
    ['Backend-utvecklare', 'Backend-utvecklare sökes för REST API:er och mikrotjänster med Java, Spring Boot, PostgreSQL, Kafka, Docker, GitHub Actions och molndistribution.'],
    ['Fullstack-utvecklare', 'Fullstack-roll med React, TypeScript, JavaScript, Node.js, REST API:er, PostgreSQL, Docker och Git.'],
    ['Spelutvecklare', 'Junior spelutvecklarroll med fokus på Java eller C++, spelutveckling, gameplay-loopar, kollisionsdetektering, skrivbordsspel och Git. Unity är meriterande.']
  ]
};

const normalize = value => value.toLowerCase().replace(/[^\p{L}\p{N}+#./-]+/gu, ' ').trim();

const includesPhrase = (text, phrase) => {
  const normalizedText = ` ${normalize(text)} `;
  const normalizedPhrase = normalize(phrase);
  return normalizedPhrase.length > 1 && normalizedText.includes(` ${normalizedPhrase} `);
};

const buildEvidenceIndex = projectList => {
  const catalog = new Map();

  skillCategories.flatMap(category => category.skills).forEach(skill => {
    catalog.set(skill, { skill, projects: [], curated: true });
  });

  projectList.forEach(project => {
    project.technologies.forEach(skill => {
      const evidence = catalog.get(skill) || { skill, projects: [], curated: false };
      evidence.projects.push(project);
      catalog.set(skill, evidence);
    });
  });

  return [...catalog.values()];
};

const matchesEvidence = (jobDescription, evidence) => {
  const aliases = skillAliases[evidence.skill] || [];
  return [evidence.skill, ...aliases].some(alias => includesPhrase(jobDescription, alias));
};

const alignmentForScore = (score, isEnglish) => {
  if (score >= 72) return { label: isEnglish ? 'Strong alignment' : 'Stark matchning', tone: 'emerald' };
  if (score >= 45) return { label: isEnglish ? 'Partial alignment' : 'Delvis matchning', tone: 'blue' };
  return { label: isEnglish ? 'Limited alignment' : 'Begränsad matchning', tone: 'amber' };
};

const analyzeRole = (jobDescription, projectList, isEnglish) => {
  const index = buildEvidenceIndex(projectList);
  const matchedEvidence = index
    .filter(evidence => matchesEvidence(jobDescription, evidence))
    .map(evidence => ({
      ...evidence,
      strength: evidence.projects.length >= 2 ? 'strong' : 'relevant'
    }))
    .sort((left, right) => right.projects.length - left.projects.length || left.skill.localeCompare(right.skill));

  const strongMatches = matchedEvidence.filter(evidence => evidence.strength === 'strong');
  const relevantMatches = matchedEvidence.filter(evidence => evidence.strength === 'relevant');
  const relevantProjects = [...new Map(
    matchedEvidence.flatMap(evidence => evidence.projects).map(project => [project.id, project])
  ).values()].slice(0, 6);
  const growthAreas = knownMissingSkills.filter(skill => includesPhrase(jobDescription, skill)).slice(0, 6);
  const isSenior = SENIOR_KEYWORDS.test(jobDescription) || HIGH_EXPERIENCE.test(jobDescription);
  const isMidSenior = !isSenior && MID_EXPERIENCE.test(jobDescription);

  const evidencePoints = matchedEvidence.reduce((total, evidence) => {
    const projectEvidence = Math.min(evidence.projects.length, 3) * 4;
    return total + 8 + projectEvidence;
  }, 0);
  let score = Math.min(92, evidencePoints);
  if (matchedEvidence.length === 0) score = 10;
  if (isSenior) score = Math.min(score, 60);
  else if (isMidSenior) score = Math.min(score, 72);

  const alignment = alignmentForScore(score, isEnglish);
  const seniorityNote = isSenior
    ? (isEnglish
      ? 'The role appears senior and likely exceeds the current junior-to-mid profile.'
      : 'Rollen verkar vara senior och överstiger sannolikt den nuvarande junior- till mellannivåprofilen.')
    : isMidSenior
      ? (isEnglish
        ? 'The role asks for 3-4 years of experience, so the experience requirement should be discussed.'
        : 'Rollen kräver 3-4 års erfarenhet, så erfarenhetskravet bör diskuteras.')
      : null;

  const summary = matchedEvidence.length === 0
    ? (isEnglish
      ? 'No direct portfolio evidence was found for the requested stack. Review the growth areas and project archive before drawing a conclusion.'
      : 'Inga direkta portfoliobevis hittades för den efterfrågade teknikstacken. Granska utvecklingsområdena och projektarkivet innan du drar en slutsats.')
    : (isEnglish
      ? `${matchedEvidence.length} matching skills were found, supported by ${relevantProjects.length} portfolio projects. Repeated use across projects is treated as stronger evidence than a single mention.`
      : `${matchedEvidence.length} matchande kompetenser hittades med stöd av ${relevantProjects.length} portfolioprojekt. Upprepad användning i flera projekt räknas som starkare bevis än ett enstaka omnämnande.`);

  return {
    score,
    alignment,
    summary,
    seniorityNote,
    strongMatches,
    relevantMatches,
    growthAreas,
    relevantProjects
  };
};

const toneClasses = {
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-900/20 dark:text-emerald-300',
  blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-300',
  amber: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-300'
};

const EvidenceSkill = ({ evidence }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-center justify-between gap-3">
      <span className="font-semibold text-gray-900 dark:text-white">{evidence.skill}</span>
      <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        {evidence.projects.length} project{evidence.projects.length === 1 ? '' : 's'}
      </span>
    </div>
    {evidence.projects.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs leading-relaxed">
        {evidence.projects.slice(0, 3).map(project => (
          <a key={project.id} href={project.githubLink || project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-300">
            {project.title}
          </a>
        ))}
      </div>
    )}
  </div>
);

export const AIJobMatcher = () => {
  const { language } = useLanguage();
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const resultRef = useRef(null);
  const isEnglish = language !== 'sv';
  const projectList = projects[language] || projects.en;
  const presets = rolePresets[language] || rolePresets.en;

  const analyze = () => {
    if (jobDescription.trim().length < 40) {
      setError(isEnglish ? 'Paste a longer job description to analyze the role.' : 'Klistra in en längre jobbeskrivning för att analysera rollen.');
      return;
    }
    setError('');
    setResult(analyzeRole(jobDescription, projectList, isEnglish));
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  };

  return (
    <section id="ai-match" className="border-t border-gray-100 bg-gray-50 px-4 py-24 dark:border-gray-800 dark:bg-dark-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-900/20 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {isEnglish ? 'Runs locally in your browser' : 'Körs lokalt i din webbläsare'}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {isEnglish ? 'Role Fit Explorer' : 'Utforska rollmatchning'}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            {isEnglish
              ? 'Paste a job description to compare it with demonstrated skills and project evidence. The explorer updates automatically as new portfolio projects are added.'
              : 'Klistra in en jobbeskrivning för att jämföra den med demonstrerade kompetenser och projektbevis. Utforskaren uppdateras automatiskt när nya portfolioprojekt läggs till.'}
          </p>
        </div>

        {!result ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              {isEnglish ? 'Try a role preset' : 'Prova en roll'}
            </p>
            <div className="mb-5 flex flex-wrap gap-2">
              {presets.map(([label, description]) => (
                <button
                  key={label}
                  onClick={() => { setJobDescription(description); setError(''); }}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-100 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/40"
                >
                  {label}
                </button>
              ))}
            </div>
            <textarea
              value={jobDescription}
              onChange={event => { setJobDescription(event.target.value); setError(''); }}
              rows={7}
              placeholder={isEnglish ? 'Paste a job description here...' : 'Klistra in en jobbeskrivning här...'}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-100"
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-400">
                {isEnglish ? 'Private by design: pasted text never leaves this page.' : 'Privat som standard: inklistrad text lämnar aldrig sidan.'}
              </p>
              <button onClick={analyze} className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                {isEnglish ? 'Explore role fit' : 'Utforska rollmatchning'}
              </button>
            </div>
          </div>
        ) : (
          <div ref={resultRef} className="space-y-5 animate-fadeIn">
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${toneClasses[result.alignment.tone]}`}>
                  {result.alignment.label}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  {isEnglish ? 'Evidence-based overview' : 'Evidensbaserad översikt'}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{result.summary}</p>
                {result.seniorityNote && (
                  <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-300">
                    {result.seniorityNote}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="text-4xl font-black text-blue-700 dark:text-blue-300">{result.score}%</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">
                  {isEnglish ? 'Approximate evidence score' : 'Ungefärlig evidenspoäng'}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {isEnglish ? 'Based on demonstrated portfolio evidence, not years of professional experience. Repeated use across projects increases confidence.' : 'Baserad på demonstrerade portfoliobevis, inte antal yrkesverksamma år. Upprepad användning i projekt ökar tillförlitligheten.'}
                </p>
              </div>
            </div>

            {result.strongMatches.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {isEnglish ? 'Strong matches' : 'Starka matchningar'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {result.strongMatches.map(evidence => <EvidenceSkill key={evidence.skill} evidence={evidence} />)}
                </div>
              </div>
            )}

            {result.relevantMatches.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {isEnglish ? 'Relevant experience' : 'Relevant erfarenhet'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.relevantMatches.map(evidence => (
                    <span key={evidence.skill} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-300">
                      {evidence.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.relevantProjects.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {isEnglish ? 'Supporting projects' : 'Stödjande projekt'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {result.relevantProjects.map(project => (
                    <a
                      key={project.id}
                      href={project.liveLink || project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="font-bold text-gray-900 dark:text-white">{project.title}</div>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{project.technologies.slice(0, 4).join(' · ')}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {result.growthAreas.length > 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-700/50 dark:bg-amber-900/10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                  {isEnglish ? 'Growth areas requested by this role' : 'Utvecklingsområden som rollen efterfrågar'}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.growthAreas.map(skill => <span key={skill} className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{skill}</span>)}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="flex-1 rounded-lg bg-blue-700 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800">
                {isEnglish ? 'Contact Abenezer' : 'Kontakta Abenezer'}
              </a>
              <button
                onClick={() => { setResult(null); setJobDescription(''); }}
                className="flex-1 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {isEnglish ? 'Explore another role' : 'Utforska en annan roll'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
