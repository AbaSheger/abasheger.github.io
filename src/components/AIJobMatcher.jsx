import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { skillCategories } from '../data/skills';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

const ALL_SKILLS = skillCategories.flatMap(cat => cat.skills);

/** Check if a skill appears as a whole word/phrase in the text (not as a substring of another word). */
const matchesSkill = (text, skill) => {
  const lowerSkill = skill.toLowerCase();
  const lowerText = text.toLowerCase();
  let startIndex = 0;
  while (startIndex <= lowerText.length - lowerSkill.length) {
    const idx = lowerText.indexOf(lowerSkill, startIndex);
    if (idx === -1) return false;
    const charBefore = idx > 0 ? lowerText[idx - 1] : ' ';
    const charAfter = idx + lowerSkill.length < lowerText.length
      ? lowerText[idx + lowerSkill.length] : ' ';
    const boundaryBefore = !/[a-z0-9]/i.test(charBefore);
    const boundaryAfter = !/[a-z0-9]/i.test(charAfter);
    if (boundaryBefore && boundaryAfter) return true;
    startIndex = idx + 1;
  }
  return false;
};

const buildMatchPrompt = (jobDesc, lang) => {
  const skillsText = skillCategories
    .map(cat => `${cat.title} (${cat.proficiency}% proficiency): ${cat.skills.join(', ')}`)
    .join('\n');

  if (lang === 'sv') {
    return `Du är en strikt rekryteringsexpert som analyserar hur väl en kandidat matchar en jobbeskrivning.

KANDIDAT: Abenezer Anglo, mjukvaruutvecklare, Borlänge Sverige

KOMPETENSER:
${skillsText}

JOBBESKRIVNING ATT ANALYSERA:
${jobDesc}

VIKTIGA REGLER FÖR POÄNGSÄTTNING:
- Räkna EXAKT hur många av kandidatens kompetenser som nämns i jobbeskrivningen.
- Om jobbet kräver kompetenser som kandidaten SAKNAR, ge ett LÄGRE poäng.
- 90-100: Nästan perfekt matchning — kandidaten har ALLA eller nästan alla efterfrågade kompetenser.
- 70-89: Stark matchning — kandidaten har de flesta krävda kompetenser.
- 50-69: Delvis matchning — kandidaten har några relevanta kompetenser men saknar viktiga krav.
- 30-49: Svag matchning — begränsad överlappning.
- 0-29: Mycket svag — helt annan inriktning.
- Ge ALDRIG automatiskt en hög poäng. Var kritisk och ärlig.

Svara EXAKT med följande JSON-format och inget annat:
{
  "score": <heltal 0-100 som representerar matchningsprocent>,
  "matchedSkills": [<upp till 8 specifika matchande tekniker/färdigheter som strängar>],
  "summary": "<2-3 meningar på svenska om varför Abenezer passar eller inte passar för rollen>",
  "highlights": ["<styrka 1>", "<styrka 2>", "<styrka 3>"]
}`;
  }

  return `You are a strict recruitment expert analyzing how well a candidate matches a job description.

CANDIDATE: Abenezer Anglo, Software Developer, Borlänge Sweden

SKILLS:
${skillsText}

JOB DESCRIPTION TO ANALYZE:
${jobDesc}

IMPORTANT SCORING RULES:
- Count EXACTLY how many of the candidate's skills are mentioned or required in the job description.
- If the job requires skills the candidate LACKS, give a LOWER score.
- 90-100: Near-perfect match — candidate has ALL or nearly all required skills.
- 70-89: Strong match — candidate has most of the required skills.
- 50-69: Partial match — candidate has some relevant skills but is missing key requirements.
- 30-49: Weak match — limited overlap between candidate skills and job requirements.
- 0-29: Very weak — completely different field or skill set.
- NEVER default to a high score. Be critical and honest in your assessment.

Respond EXACTLY with the following JSON format and nothing else:
{
  "score": <integer 0-100 representing match percentage>,
  "matchedSkills": [<up to 8 specific matching technologies/skills as strings>],
  "summary": "<2-3 sentences on why Abenezer is or is not a good fit for this role>",
  "highlights": ["<strength 1>", "<strength 2>", "<strength 3>"]
}`;
};

const analyzeLocally = (jobDesc, lang) => {
  const categoryResults = skillCategories.map(cat => ({
    ...cat,
    matched: cat.skills.filter(skill => matchesSkill(jobDesc, skill))
  }));

  const allMatched = categoryResults.flatMap(cat => cat.matched);

  // Weighted score: each matched skill contributes its category proficiency weight
  let matchedWeight = 0;
  let totalWeight = 0;
  for (const cat of categoryResults) {
    for (const skill of cat.skills) {
      totalWeight += cat.proficiency;
      if (cat.matched.includes(skill)) {
        matchedWeight += cat.proficiency;
      }
    }
  }

  const rawRatio = totalWeight > 0 ? matchedWeight / totalWeight : 0;
  const score = Math.min(95, Math.max(allMatched.length === 0 ? 10 : 15, Math.round(rawRatio * 100)));

  // Build dynamic summary based on actually matched categories
  const matchedCats = categoryResults.filter(cat => cat.matched.length > 0);
  const topSkills = allMatched.slice(0, 4).join(', ');

  let summary, highlights;
  if (lang === 'sv') {
    if (allMatched.length === 0) {
      summary = 'Inga specifika kompetensmatchningar hittades mellan Abenezers profil och denna jobbeskrivning.';
      highlights = [];
    } else {
      const catNames = matchedCats.map(c => c.title).join(', ');
      summary = `Abenezer matchar ${allMatched.length} av ${ALL_SKILLS.length} kompetenser (${topSkills}). Starkast matchning inom: ${catNames}.`;
      highlights = matchedCats.slice(0, 3).map(cat =>
        `${cat.title}: ${cat.matched.slice(0, 2).join(', ')} (${cat.matched.length}/${cat.skills.length})`
      );
    }
  } else {
    if (allMatched.length === 0) {
      summary = `No specific skill matches were found between Abenezer's profile and this job description.`;
      highlights = [];
    } else {
      const catNames = matchedCats.map(c => c.title).join(', ');
      summary = `Abenezer matches ${allMatched.length} of ${ALL_SKILLS.length} skills (${topSkills}). Strongest overlap in: ${catNames}.`;
      highlights = matchedCats.slice(0, 3).map(cat =>
        `${cat.title}: ${cat.matched.slice(0, 2).join(', ')} (${cat.matched.length}/${cat.skills.length})`
      );
    }
  }

  return { score, matchedSkills: allMatched.slice(0, 8), summary, highlights };
};

const ScoreRing = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const [animatedScore, setAnimatedScore] = useState(0);
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 150);
    return () => clearTimeout(timer);
  }, [score]);

  const ringColor =
    score >= 75 ? '#22c55e' :
    score >= 50 ? '#3b82f6' :
    score >= 30 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60" cy="60" r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="60" cy="60" r={radius}
          stroke={ringColor}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color: ringColor }}>{animatedScore}%</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Match</span>
      </div>
    </div>
  );
};

export const AIJobMatcher = () => {
  const { language } = useLanguage();
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef(null);
  const isEn = language !== 'sv';

  const ui = {
    sectionTitle: isEn ? 'AI Job Match' : 'AI-jobbmatchning',
    subtitle: isEn
      ? 'Paste a job description and our AI will instantly analyze how well Abenezer fits the role.'
      : 'Klistra in en jobbeskrivning så analyserar vår AI hur väl Abenezer matchar rollen.',
    placeholder: isEn
      ? 'Paste a job description here (e.g. "We are looking for a Java Developer with Spring Boot, Docker, and Azure experience...")'
      : 'Klistra in jobbeskrivning här (t.ex. "Vi söker en Java-utvecklare med Spring Boot, Docker och Azure-erfarenhet...")',
    analyzeBtn: isEn ? '✨ Analyze Match' : '✨ Analysera matchning',
    analyzing: isEn ? 'Analyzing...' : 'Analyserar...',
    resetBtn: isEn ? 'Try Another Role' : 'Prova en annan roll',
    matchedSkills: isEn ? 'Matched Skills' : 'Matchande kompetenser',
    highlights: isEn ? 'Key Strengths' : 'Viktiga styrkor',
    summary: isEn ? 'AI Analysis' : 'AI-analys',
    tooShort: isEn
      ? 'Please paste a job description (at least 50 characters).'
      : 'Vänligen klistra in en jobbeskrivning (minst 50 tecken).',
    contactCta: isEn ? '📩 Contact Abenezer' : '📩 Kontakta Abenezer',
    tryThis: isEn ? 'Quick example:' : 'Snabbexempel:',
    exampleLabel: isEn ? 'Senior Java Developer (Spring Boot + Azure)' : 'Senior Java-utvecklare (Spring Boot + Azure)',
  };

  const exampleDesc = isEn
    ? `We are looking for a Senior Java Developer to join our growing team. You will design and implement scalable microservices using Spring Boot, Docker, and Kubernetes. Experience with REST APIs, MySQL, and CI/CD pipelines (GitHub Actions, Azure DevOps) is required. Familiarity with React for frontend development and Agile/Scrum methodologies is a strong plus. Cloud experience with Azure is highly valued.`
    : `Vi söker en senior Java-utvecklare till vårt växande team. Du kommer att designa och implementera skalbara mikrotjänster med Spring Boot, Docker och Kubernetes. Erfarenhet av REST API:er, MySQL och CI/CD-pipelines (GitHub Actions, Azure DevOps) krävs. Kunskap om React och Agile/Scrum-metodik är meriterande. Molnerfarenhet med Azure värderas högt.`;

  const analyze = async () => {
    const trimmed = jobDesc.trim();
    if (!trimmed || trimmed.length < 50) {
      setError(ui.tooShort);
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      if (GROQ_API_KEY) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: buildMatchPrompt(jobDesc, language) }],
            max_tokens: 400,
            temperature: 0.2,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content?.trim() || '';
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            setResult(parsed);
            setLoading(false);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            return;
          }
        }
      }
    } catch (err) {
      console.error('Groq API call failed:', err);
      // fall through to local fallback
    }

    setTimeout(() => {
      setResult(analyzeLocally(jobDesc, language));
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }, 1200);
  };

  const reset = () => {
    setResult(null);
    setJobDesc('');
    setError('');
  };

  return (
    <section
      id="ai-match"
      className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-dark-800/20 dark:via-dark-900/40 dark:to-dark-800/20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 flex items-center group">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-4 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <span className="relative">
            {ui.sectionTitle}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 ml-16 text-sm sm:text-base">{ui.subtitle}</p>

        {!result ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
            {/* Quick example fill */}
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-500 dark:text-gray-400">{ui.tryThis}</span>
              <button
                onClick={() => { setJobDesc(exampleDesc); setError(''); }}
                className="text-xs px-3 py-1.5 rounded-full border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                {ui.exampleLabel}
              </button>
            </div>

            <textarea
              value={jobDesc}
              onChange={e => { setJobDesc(e.target.value); setError(''); }}
              placeholder={ui.placeholder}
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm resize-none"
            />

            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}

            <button
              onClick={analyze}
              disabled={loading}
              className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {ui.analyzing}
                </>
              ) : ui.analyzeBtn}
            </button>
          </div>
        ) : (
          <div ref={resultRef} className="space-y-4 animate-fadeIn">
            {/* Score + summary */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={result.score} />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                    {ui.summary}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
                    {result.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Matched skills */}
            {result.matchedSkills && result.matchedSkills.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                  {ui.matchedSkills}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key highlights */}
            {result.highlights && result.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {result.highlights.map((highlight, i) => {
                  const colors = [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-pink-500',
                    'from-green-500 to-emerald-500',
                  ];
                  return (
                    <div
                      key={i}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-4 flex items-center gap-3"
                    >
                      <div className={`w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                        {i + 1}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{highlight}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 text-center text-sm"
              >
                {ui.contactCta}
              </a>
              <button
                onClick={reset}
                className="flex-1 py-3 px-6 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 text-sm"
              >
                {ui.resetBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
