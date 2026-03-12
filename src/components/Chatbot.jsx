import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import { translations } from '../data/translations';

// Dynamically build skills answer strings from skills.js
const buildSkillsAnswer = (lang) => {
  const skillsList = skillCategories
    .map(cat => `${cat.title}: ${cat.skills.join(', ')}`)
    .join(' | ');
  if (lang === 'sv') {
    return `Mina kompetenser inom alla områden: ${skillsList} 💻`;
  }
  return `My skills across all areas: ${skillsList} 💻`;
};

// Dynamically build the Groq system prompt from data files
const buildSystemPrompt = (lang) => {
  const t = translations[lang] || translations.en;
  const projectList = projects[lang] || projects.en;

  const skillsSection = skillCategories
    .map(cat => `  - ${cat.title} (${cat.proficiency}% proficiency): ${cat.skills.join(', ')}`)
    .join('\n');

  const projectsSection = projectList
    .map(p => `  - ${p.title} [${p.technologies.join(', ')}]: ${p.description}`)
    .join('\n');

  if (lang === 'sv') {
    return `Du är en hjälpsam portfolioassistent på Abenezer Anglos webbplats. Svara ENDAST på frågor om Abenezer Anglo och hans professionella bakgrund. Om någon ställer frågor som inte är relaterade till Abenezer, hans kompetenser, projekt, utbildning eller kontaktuppgifter, avböj artigt och be dem ställa en portfoliorelaterad fråga. Svara alltid på svenska.

OM ABENEZER:
- Namn: Abenezer Anglo
- Roll: Mjukvaruutvecklare
- Plats: Borlänge, Sverige
- Bio: ${t.about.bio1} ${t.about.bio2}

KOMPETENSER:
${skillsSection}

UTBILDNING:
  - ${t.about.education.current}
  - ${t.about.education.ml}
  - ${t.about.education.bachelor} (${t.about.education.major})
  - ${t.about.education.csharp}

CERTIFIERINGAR:
  - ${t.about.certifications.azure} (${t.about.certifications.azureDate})

PROJEKT:
${projectsSection}

KONTAKT:
  - E-post: merebanglo@gmail.com
  - Telefon: +46 76 408 79 19

Håll svaren korta (2-3 meningar). Använd emojis sparsamt.`;
  }

  return `You are a helpful portfolio assistant on Abenezer Anglo's website. ONLY answer questions about Abenezer Anglo and his professional background. If asked anything unrelated to Abenezer, his skills, projects, education, or professional background — such as general coding questions, jokes, or unrelated topics — politely decline and redirect the user to ask a portfolio-related question.

ABOUT ABENEZER:
- Name: Abenezer Anglo
- Role: Software Developer
- Location: Borlänge, Sweden
- Bio: ${t.about.bio1} ${t.about.bio2}

SKILLS:
${skillsSection}

EDUCATION:
  - ${t.about.education.current}
  - ${t.about.education.ml}
  - ${t.about.education.bachelor} (${t.about.education.major})
  - ${t.about.education.csharp}

CERTIFICATIONS:
  - ${t.about.certifications.azure} (${t.about.certifications.azureDate})

PROJECTS:
${projectsSection}

CONTACT:
  - Email: merebanglo@gmail.com
  - Phone: +46 76 408 79 19

Keep responses short (2-3 sentences). Use emojis sparingly.`;
};

const knowledgeBase = {
  en: [
    {
      patterns: [/who are you|about you|tell me about|introduce yourself/i],
      answer: "I'm Abenezer Anglo, a passionate Software Developer based in Borlänge, Sweden. I specialize in building scalable, reliable systems using Java, Spring Boot, React, and cloud technologies. 🚀"
    },
    {
      patterns: [/skills|technologies|tech stack|what do you know|expertise/i],
      answer: buildSkillsAnswer('en')
    },
    {
      patterns: [/project|work|built|portfolio|created/i],
      answer: `I've built ${projects.en.length} projects! Highlights include: 🎵 Music Analytics Platform (Spring Boot + React microservices), 📊 Borsvy (stock analysis with React & Spring Boot), 🎤 StageFinder (AI-powered event platform with Groq AI), and a Wigell Padel booking REST API. Check the Projects section above!`
    },
    {
      patterns: [/education|study|school|degree|university|certif/i],
      answer: `I graduated as an Agile Java Developer from EduGrade (2023-2025). I also hold a Bachelor's in Development Studies from Lund University, and I'm ${translations.en.about.certifications.azure} — ${translations.en.about.certifications.azureDate}. 🎓`
    },
    {
      patterns: [/contact|reach|email|hire|available|work together/i],
      answer: "You can reach me at merebanglo@gmail.com 📧 or call +46 76 408 79 19 📱. You can also use the Contact form below! I'm always open to new opportunities. 😊"
    },
    {
      patterns: [/location|where|based|sweden|borlänge/i],
      answer: "I'm based in Borlänge, Sweden 🇸🇪. I'm open to both remote and on-site opportunities."
    },
    {
      patterns: [/cv|resume|download/i],
      answer: "You can download my CV in both English and Swedish from the CV section on this page! 📄"
    },
    {
      patterns: [/github|open source|code/i],
      answer: "Check out my GitHub at github.com/AbaSheger for open source contributions and personal projects! I contributed to JMailer Spring Boot and several other projects. 💻"
    },
    {
      patterns: [/hello|hi |hey|greet|hej/i],
      answer: "Hello! 👋 I'm a chatbot that can answer questions about Abenezer. Ask me about his skills, projects, education, or how to get in touch!"
    },
  ],
  sv: [
    {
      patterns: [/vem är|om dig|berätta|presentera/i],
      answer: "Jag är Abenezer Anglo, en passionerad mjukvaruutvecklare baserad i Borlänge, Sverige. Jag specialiserar mig på att bygga skalbara system med Java, Spring Boot, React och molnteknologier. 🚀"
    },
    {
      patterns: [/kompetens|teknik|kunskaper|erfarenhet/i],
      answer: buildSkillsAnswer('sv')
    },
    {
      patterns: [/projekt|byggt|portfolio|skapade/i],
      answer: `Jag har byggt ${projects.sv.length} projekt! Höjdpunkter: 🎵 Musikanalysplattform, 📊 Borsvy (aktieanalys), 🎤 StageFinder (AI-driven eventplattform). Kolla in Projektsektionen ovan!`
    },
    {
      patterns: [/utbildning|studie|skola|examen|universitet|certif/i],
      answer: `Jag utbildade mig till Agil Java-utvecklare på EduGrade (2023-2025). Jag har även en kandidatexamen från Lunds universitet och är ${translations.sv.about.certifications.azure} (${translations.sv.about.certifications.azureDate}). 🎓`
    },
    {
      patterns: [/kontakt|nå|epost|anställa|tillgänglig|samarbeta/i],
      answer: "Du når mig på merebanglo@gmail.com 📧 eller ring +46 76 408 79 19 📱. Använd gärna kontaktformuläret nedan! 😊"
    },
    {
      patterns: [/plats|var|baserad|sverige|borlänge/i],
      answer: "Jag är baserad i Borlänge, Sverige 🇸🇪. Jag är öppen för både distans- och platsbundna möjligheter."
    },
    {
      patterns: [/cv|meritförteckning|ladda ner/i],
      answer: "Du kan ladda ner mitt CV på både engelska och svenska från CV-sektionen på denna sida! 📄"
    },
    {
      patterns: [/hej|hallå|tjena|hejsan/i],
      answer: "Hej! 👋 Jag är en chatbot som kan svara på frågor om Abenezer. Fråga mig om hans kompetenser, projekt, utbildning eller hur du kommer i kontakt med honom!"
    },
  ]
};

const suggestedQuestions = {
  en: ["What are your skills?", "Tell me about your projects", "How can I contact you?"],
  sv: ["Vad är dina kompetenser?", "Berätta om dina projekt", "Hur kontaktar jag dig?"]
};

const fallback = {
  en: "I'm not sure about that. Try asking about Abenezer's skills, projects, education, or contact info! 🤔",
  sv: "Jag är inte säker på det. Prova att fråga om Abenezer's kompetenser, projekt, utbildning eller kontaktuppgifter! 🤔"
};

const getPatternAnswer = (input, lang) => {
  const kb = knowledgeBase[lang] || knowledgeBase.en;
  for (const entry of kb) {
    if (entry.patterns.some(pattern => pattern.test(input))) {
      return entry.answer;
    }
  }
  return null;
};

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

const fetchGroqResponse = async (userMessage, lang) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: buildSystemPrompt(lang) },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 256,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
};

const Chatbot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const messagesEndRef = useRef(null);

  const headerText = language === 'sv' ? 'Fråga om Abenezer 💬' : 'Ask me about Abenezer 💬';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasBeenOpened) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, hasBeenOpened]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Try pattern matching first
    const patternAnswer = getPatternAnswer(userText, language);
    if (patternAnswer) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { from: 'bot', text: patternAnswer }]);
      }, 500);
      return;
    }

    // Fall back to Groq API if available
    if (GROQ_API_KEY) {
      try {
        const aiAnswer = await fetchGroqResponse(userText, language);
        if (aiAnswer) {
          setIsTyping(false);
          setMessages(prev => [...prev, { from: 'bot', text: aiAnswer }]);
          return;
        }
      } catch (error) {
        console.error('Groq API call failed:', error);
      }
    }

    // Final fallback
    setIsTyping(false);
    setMessages(prev => [...prev, { from: 'bot', text: fallback[language] || fallback.en }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
            <span className="text-white font-semibold text-sm">{headerText}</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
            {messages.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-2">
                {language === 'sv' ? 'Skriv en fråga eller välj ett förslag nedan.' : 'Type a question or choose a suggestion below.'}
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl rounded-bl-none flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {showSuggestions && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestedQuestions[language].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'sv' ? 'Skriv en fråga...' : 'Type a question...'}
              className="flex-1 px-3 py-2 text-sm rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={() => sendMessage()}
              aria-label="Send message"
              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button with pulse animation */}
      <div className="relative">
        {/* Welcome tooltip - appears after 3 seconds */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap animate-fadeIn">
            {language === 'sv' ? '👋 Fråga mig om Abenezer!' : '👋 Ask me about Abenezer!'}
            <div className="absolute -bottom-2 right-5 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
          </div>
        )}

        {/* Pulsing rings - only show when chat is closed and not yet opened */}
        {!isOpen && !hasBeenOpened && (
          <>
            <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
            <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-purple-400 opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></span>
          </>
        )}

        <button
          onClick={() => {
            setIsOpen(prev => !prev);
            setShowTooltip(false);
            setHasBeenOpened(true);
          }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
