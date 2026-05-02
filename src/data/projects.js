const musicAnalyticsImage = './assets/music-analytics.png';
const jmailerImage = './assets/jmailer.png'; // You'll need to add a screenshot of the project
const stagefinderImage = './assets/stagefinder.png'; // You'll need to add this image
const wigellPadelImage = './assets/wigell-padel.png';
const DevOpsImage = './assets/DevOps.png';
const eventOrganizerImage = './assets/event-organizer.png'; // You'll need to add this image
const borsvyImage = './assets/borsvy.png';
const lomanStadImage = './assets/loman-stad.png';
const ecoTrackerImage = './assets/ecotracker.png';
const jobAgentImage = './assets/job-agent.png';


export const projects = {
  en: [
    {
      id: 1,
      title: "Music Analytics Platform",
      category: "fullstack",
      technologies: ["Spring Boot", "React", "Docker"],
      image: musicAnalyticsImage,
      description: "Java-based microservice platform for music analytics and recommendations with AI-based algorithms.",
      liveLink: "https://musicanalytics.netlify.app/",
      githubLink: "https://github.com/AbaSheger/MusicAnalyticsPlatform",
      isSideProject: true
    },
    {
      id: 24,
      title: "Job Agent",
      category: "backend",
      technologies: ["Python", "Claude AI", "GitHub Actions", "Telegram", "Jobtech API"],
      image: jobAgentImage,
      description: "Automated daily job-search agent for Sweden that scrapes Arbetsförmedlingen and LinkedIn, ranks matches with Claude AI, and delivers a curated Telegram digest via scheduled GitHub Actions.",
      githubLink: "https://github.com/AbaSheger/job-agent",
      isSideProject: true
    },
    {
      id: 23,
      title: "Loman Städ – Business Website",
      category: "fullstack",
      technologies: ["React", "Vite", "Tailwind CSS", "EmailJS"],
      image: lomanStadImage,
      description: "Responsive single-page website for a local cleaning company in Sweden. SEO optimised with sitemap, Schema.org structured data and Google Search Console. Deployed on Vercel with custom domain.",
      liveLink: "https://lomanstad.se",
      githubLink: "https://github.com/AbaSheger/lomanstad",
      isFreelance: true
    },
    {
      id: 7,
      title: "Borsvy - Stock Analysis Platform",
      category: "fullstack",
      technologies: ["React", "Spring Boot", "H2 Database", "Ant Design", "Tailwind CSS", "AI-Powered Analysis"],
      image: borsvyImage,
      description: "A comprehensive web-based stock analysis platform built with React, Spring Boot, and multiple financial APIs. Features include real-time stock data visualization, technical analysis, news sentiment analysis, and personalized watchlists.",
      liveLink: "https://borsvy.abenezeranglo.uk/",
      githubLink: "https://github.com/AbaSheger/borsvy",
      isSchoolProject: true
    },
    {
      id: 5,
      title: "StageFinder",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "Material UI", "Groq AI"],
      image: stagefinderImage,
      description: "AI-powered event platform built with React and Node.js. Features include speaker matching, event management, and role-based authentication. Integrates Groq API for intelligent content generation.",
      githubLink: "https://github.com/Lia-hub-Intern/the-event-portal",
      isInternship: true
    },
    {
      id: 2,
      title: "Wigell Padel Microservice",
      category: "backend",
      technologies: ["Spring Boot", "MySQL", "Spring Security"],
      image: wigellPadelImage,
      description: "REST API in Java Spring Boot with MySQL for bookings and customer data with secure authentication.",
      githubLink: "https://github.com/AbaSheger/wigell-padel-portfolio.git",
      isSchoolProject: true
    },
    {
      id: 3,
      title: "Full-Stack Solution (EduGrade)",
      category: "cloud",
      technologies: ["Azure DevOps", "React", "Java"],
      image: DevOpsImage,
      description: "CI/CD pipeline in Azure DevOps for React frontend and Java-based REST API backend.",
      githubLink: "https://github.com/AbaSheger/DevOps-CourseProject",
      isSchoolProject: true
    },
    {
      id: 4,
      title: "JMailer Spring Boot",
      category: "backend",
      technologies: ["Spring Boot", "Java", "Email Service", "Open Source"],
      image: jmailerImage,
      description: "Contributed to an open-source email service built with Spring Boot. JMailer provides a robust solution for sending emails in Spring Boot applications.",
      githubLink: "https://github.com/josdem/jmailer-spring-boot?tab=readme-ov-file",
      isOpenSource: true,
      contribution: true
    },
    {
      id: 6,
      title: "Event Organizer",
      category: "backend",
      technologies: ["C#", ".NET", "Windows Forms"],
      image: eventOrganizerImage,
      description: "A Windows desktop application for managing events and participants. Features include event creation, participant management, and financial calculations for event planning.",
      githubLink: "https://github.com/AbaSheger/Eventorganizer",
      isSchoolProject: true
    },
    {
      id: 8,
      title: "EventFlow",
      category: "backend",
      technologies: ["Spring Boot", "Kafka", "PostgreSQL", "Docker", "Java 21"],
      image: null,
      description: "Event-driven architecture demo with two Spring Boot services (Order + Notification) communicating over Apache Kafka. Features dead-letter topics, exponential backoff, Flyway migrations, and email delivery via Mailtrap.",
      githubLink: "https://github.com/AbaSheger/eventflow",
      isSideProject: true
    },
    {
      id: 9,
      title: "StackLens",
      category: "backend",
      technologies: ["Java 17+", "picocli", "Maven"],
      image: null,
      description: "CLI developer tool that analyzes Java/Spring Boot logs and stack traces, detects 8 error types (NPE, DB failures, OOM, JWT, etc.), and outputs human-readable or JSON explanations with fixes.",
      githubLink: "https://github.com/AbaSheger/stacklens",
      isSideProject: true
    },
    {
      id: 10,
      title: "ShopEasyAPI",
      category: "backend",
      technologies: ["Spring Boot", "Spring Security", "Maven"],
      image: null,
      description: "Simple Spring Boot RESTful API for e-commerce with role-based access control (products/orders management).",
      githubLink: "https://github.com/AbaSheger/ShopEasyAPI",
      isSchoolProject: true
    },
    {
      id: 11,
      title: "CustomerStreamingService",
      category: "backend",
      technologies: ["Spring Boot", "Java", "Maven"],
      image: null,
      description: "Spring Boot app simulating a streaming service and customer management system with CRUD REST endpoints.",
      githubLink: "https://github.com/AbaSheger/CustomerStreamingService",
      isSchoolProject: true
    },
    {
      id: 12,
      title: "SpringBootTests",
      category: "backend",
      technologies: ["Spring Boot", "Spring Data JPA", "MySQL", "JUnit 5", "Mockito"],
      image: null,
      description: "Spring Boot app demonstrating Spring Data JPA, JUnit, and Mockito. Manages student data with CRUD, email validation, grade and group management.",
      githubLink: "https://github.com/AbaSheger/SpringBootTests",
      isSchoolProject: true
    },
    {
      id: 13,
      title: "StreamBridge",
      category: "backend",
      technologies: ["Spring Boot", "Java 17+", "Maven"],
      image: null,
      description: "CDN-style video streaming backend proof-of-concept supporting HTTP Range requests, real-time metrics, file metadata caching, and performance tracking.",
      githubLink: "https://github.com/AbaSheger/streambridge",
      isSideProject: true
    },
    {
      id: 14,
      title: "Wigell Padel",
      category: "backend",
      technologies: ["Spring Boot", "Spring Cloud", "MySQL"],
      image: null,
      description: "Padel court booking microservice with Spring Cloud service discovery.",
      githubLink: "https://github.com/AbaSheger/wigell-padel",
      isSchoolProject: true
    },
    {
      id: 15,
      title: "Wigell Padel Portfolio",
      category: "backend",
      technologies: ["Spring Boot", "Eureka", "MySQL", "Docker"],
      image: null,
      description: "Full padel court booking system with Eureka service discovery, API Gateway, field management, booking, and availability checking. Role-based access.",
      githubLink: "https://github.com/AbaSheger/wigell-padel-portfolio",
      isSchoolProject: true
    },
    {
      id: 16,
      title: "API Gateway (Eureka)",
      category: "backend",
      technologies: ["Spring Cloud Gateway", "Java"],
      image: null,
      description: "Spring Cloud API Gateway with service discovery. Part of the Wigell Padel microservices ecosystem.",
      githubLink: "https://github.com/AbaSheger/eureka-server",
      isSchoolProject: true
    },
    {
      id: 17,
      title: "Quote-to-Trade Portal",
      category: "fullstack",
      technologies: ["Spring Boot", "Angular", "PostgreSQL", "Flyway", "Nginx", "Docker"],
      image: null,
      description: "Full-stack FX (Foreign Exchange) trade workflow demo. Users can request quotes, book trades, and view trade history. Includes CI/CD with GitHub Actions and Docker.",
      githubLink: "https://github.com/AbaSheger/quote-to-trade-portal",
      liveLink: null,
      isSideProject: true
    },
    {
      id: 18,
      title: "PassageLite",
      category: "backend",
      technologies: [".NET 8", "ASP.NET Core", "EF Core", "PostgreSQL", "xUnit", "Docker"],
      image: null,
      description: "Access Control Management API with JWT authentication, role-based access (Admin/User), area management, and Docker support. Portfolio project built Dec 2025.",
      githubLink: "https://github.com/AbaSheger/PassageLite",
      isSideProject: true
    },
    {
      id: 19,
      title: "DevOps-CourseProject",
      category: "cloud",
      technologies: ["Frontend", "DevOps", "Azure DevOps"],
      image: null,
      description: "E-shop client used as the basis for a DevOps course project. Frontend populated from a Business Data API via REST.",
      githubLink: "https://github.com/AbaSheger/DevOps-CourseProject",
      isSchoolProject: true
    },
    {
      id: 20,
      title: "Personal Expense Tracker",
      category: "backend",
      technologies: ["C#", ".NET 6", "WPF", "MathNet.Numerics"],
      image: null,
      description: "WPF desktop app for managing personal expenses with categories, charts, JSON persistence, and AI-powered 6-month expense prediction using linear regression.",
      githubLink: "https://github.com/AbaSheger/Personal-Expense-Tracker",
      isSchoolProject: true
    },
    {
      id: 22,
      title: "EcoTracker",
      category: "fullstack",
      technologies: ["Flutter", "Dart", "Material 3"],
      image: ecoTrackerImage,
      description: "Flutter mobile/web app for eco-friendly activity tracking with animated splash screen and an eco map screen.",
      githubLink: "https://github.com/AbaSheger/EcoTracker",
      isSideProject: true
    }
  ],
  sv: [
    {
      id: 1,
      title: "Musikanalysplattform",
      category: "fullstack",
      technologies: ["Spring Boot", "React", "Docker"],
      image: musicAnalyticsImage,
      description: "Java-baserad mikroserviceplattform för musikanalys och rekommendationer med AI-baserade algoritmer.",
      liveLink: "https://musicanalytics.netlify.app/",
      githubLink: "https://github.com/AbaSheger/MusicAnalyticsPlatform",
      isSideProject: true
    },
    {
      id: 24,
      title: "Job Agent",
      category: "backend",
      technologies: ["Python", "Claude AI", "GitHub Actions", "Telegram", "Jobtech API"],
      image: jobAgentImage,
      description: "Automatiserad daglig jobbsökningsagent för Sverige som hämtar jobb från Arbetsförmedlingen och LinkedIn, rankar matchningar med Claude AI och levererar ett kurerat Telegram-sammandrag via schemalagda GitHub Actions.",
      githubLink: "https://github.com/AbaSheger/job-agent",
      isSideProject: true
    },
    {
      id: 23,
      title: "Loman Städ – Företagswebbplats",
      category: "fullstack",
      technologies: ["React", "Vite", "Tailwind CSS", "EmailJS"],
      image: lomanStadImage,
      description: "Responsiv single-page-webbplats för ett lokalt städföretag i Sverige. SEO-optimerad med sitemap, Schema.org strukturerad data och Google Search Console. Driftsatt på Vercel med anpassad domän.",
      liveLink: "https://lomanstad.se",
      githubLink: "https://github.com/AbaSheger/lomanstad",
      isFreelance: true
    },
    {
      id: 7,
      title: "Borsvy - Aktieanalysplattform",
      category: "fullstack",
      technologies: ["React", "Spring Boot", "H2 Database", "Ant Design", "Tailwind CSS", "AI-driven analys"],
      image: borsvyImage,
      description: "En omfattande webbaserad aktieanalysplattform byggd med React, Spring Boot och flera finans-API:er. Funktioner inkluderar realtidsvisualisering av aktiedata, teknisk analys, nyhetssentiementanalys och personliga bevakningslistor.",
      liveLink: "https://borsvy.abenezeranglo.uk/",
      githubLink: "https://github.com/AbaSheger/borsvy",
      isSchoolProject: true
    },
    {
      id: 5,
      title: "StageFinder",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "Material UI", "Groq AI"],
      image: stagefinderImage,
      description: "AI-driven eventplattform byggd med React och Node.js. Funktioner inkluderar talarmatching, eventhantering och rollbaserad autentisering. Integrerar Groq API för intelligent innehållsgenerering.",
      githubLink: "https://github.com/Lia-hub-Intern/the-event-portal",
      isInternship: true
    },
    {
      id: 2,
      title: "Wigell Padel Mikrotjänst",
      category: "backend",
      technologies: ["Spring Boot", "MySQL", "Spring Security"],
      image: wigellPadelImage,
      description: "REST API i Java Spring Boot med MySQL för bokningar och kunddata med säker autentisering.",
      githubLink: "https://github.com/AbaSheger/wigell-padel-portfolio.git",
      isSchoolProject: true
    },
    {
      id: 3,
      title: "Fullstack-lösning (EduGrade)",
      category: "cloud",
      technologies: ["Azure DevOps", "React", "Java"],
      image: DevOpsImage,
      description: "CI/CD-pipeline i Azure DevOps för React frontend och Java-baserad REST API backend.",
      githubLink: "https://github.com/AbaSheger/DevOps-CourseProject",
      isSchoolProject: true
    },
    {
      id: 4,
      title: "JMailer Spring Boot",
      category: "backend",
      technologies: ["Spring Boot", "Java", "E-posttjänst", "Öppen källkod"],
      image: jmailerImage,
      description: "Bidragit till en e-posttjänst med öppen källkod byggd med Spring Boot. JMailer erbjuder en robust lösning för att skicka e-post i Spring Boot-applikationer.",
      githubLink: "https://github.com/josdem/jmailer-spring-boot?tab=readme-ov-file",
      isOpenSource: true,
      contribution: true
    },
    {
      id: 6,
      title: "Eventorganisatör",
      category: "backend",
      technologies: ["C#", ".NET", "Windows Forms"],
      image: eventOrganizerImage,
      description: "En Windows-skrivbordsapplikation för att hantera evenemang och deltagare. Funktioner inkluderar evenemangskapande, deltagarhantering och ekonomiska beräkningar för evenemangsplanering.",
      githubLink: "https://github.com/AbaSheger/Eventorganizer",
      isSchoolProject: true
    },
    {
      id: 8,
      title: "EventFlow",
      category: "backend",
      technologies: ["Spring Boot", "Kafka", "PostgreSQL", "Docker", "Java 21"],
      image: null,
      description: "Händelsedriven arkitektur med två Spring Boot-tjänster (Order + Notifikation) som kommunicerar via Apache Kafka. Innehåller dead-letter topics, exponentiell backoff, Flyway-migreringar och e-postleverans via Mailtrap.",
      githubLink: "https://github.com/AbaSheger/eventflow",
      isSideProject: true
    },
    {
      id: 9,
      title: "StackLens",
      category: "backend",
      technologies: ["Java 17+", "picocli", "Maven"],
      image: null,
      description: "CLI-verktyg för utvecklare som analyserar Java/Spring Boot-loggar och stackspår, detekterar 8 feltyper (NPE, DB-fel, OOM, JWT, etc.) och ger läsbara förklaringar och åtgärdsförslag.",
      githubLink: "https://github.com/AbaSheger/stacklens",
      isSideProject: true
    },
    {
      id: 10,
      title: "ShopEasyAPI",
      category: "backend",
      technologies: ["Spring Boot", "Spring Security", "Maven"],
      image: null,
      description: "Enkelt Spring Boot RESTful API för e-handel med rollbaserad åtkomstkontroll för produkter och orderhantering.",
      githubLink: "https://github.com/AbaSheger/ShopEasyAPI",
      isSchoolProject: true
    },
    {
      id: 11,
      title: "CustomerStreamingService",
      category: "backend",
      technologies: ["Spring Boot", "Java", "Maven"],
      image: null,
      description: "Spring Boot-applikation som simulerar en strömningstjänst och kundhanteringssystem med CRUD REST-endpoints.",
      githubLink: "https://github.com/AbaSheger/CustomerStreamingService",
      isSchoolProject: true
    },
    {
      id: 12,
      title: "SpringBootTests",
      category: "backend",
      technologies: ["Spring Boot", "Spring Data JPA", "MySQL", "JUnit 5", "Mockito"],
      image: null,
      description: "Spring Boot-applikation som demonstrerar Spring Data JPA, JUnit och Mockito. Hanterar studentdata med CRUD, e-postvalidering och grupphantering.",
      githubLink: "https://github.com/AbaSheger/SpringBootTests",
      isSchoolProject: true
    },
    {
      id: 13,
      title: "StreamBridge",
      category: "backend",
      technologies: ["Spring Boot", "Java 17+", "Maven"],
      image: null,
      description: "CDN-liknande videostreamingbackend med stöd för HTTP Range-förfrågningar, realtidsmätningar, filmetadatacachning och prestandaspårning.",
      githubLink: "https://github.com/AbaSheger/streambridge",
      isSideProject: true
    },
    {
      id: 14,
      title: "Wigell Padel",
      category: "backend",
      technologies: ["Spring Boot", "Spring Cloud", "MySQL"],
      image: null,
      description: "Padelboknings-mikrotjänst med Spring Cloud-tjänstupptäckt.",
      githubLink: "https://github.com/AbaSheger/wigell-padel",
      isSchoolProject: true
    },
    {
      id: 15,
      title: "Wigell Padel Portfolio",
      category: "backend",
      technologies: ["Spring Boot", "Eureka", "MySQL", "Docker"],
      image: null,
      description: "Komplett padelbokningssystem med Eureka-tjänstupptäckt, API Gateway, planhantering, bokning och tillgänglighetskontroll. Rollbaserad åtkomst.",
      githubLink: "https://github.com/AbaSheger/wigell-padel-portfolio",
      isSchoolProject: true
    },
    {
      id: 16,
      title: "API Gateway (Eureka)",
      category: "backend",
      technologies: ["Spring Cloud Gateway", "Java"],
      image: null,
      description: "Spring Cloud API Gateway med tjänstupptäckt. Del av Wigell Padel-mikroserviceekosystemet.",
      githubLink: "https://github.com/AbaSheger/eureka-server",
      isSchoolProject: true
    },
    {
      id: 17,
      title: "Quote-to-Trade Portal",
      category: "fullstack",
      technologies: ["Spring Boot", "Angular", "PostgreSQL", "Flyway", "Nginx", "Docker"],
      image: null,
      description: "Fullstack FX-handelsflöde. Användare kan begära offerter, boka affärer och se handelshistorik. Inkluderar CI/CD med GitHub Actions och Docker.",
      githubLink: "https://github.com/AbaSheger/quote-to-trade-portal",
      liveLink: null,
      isSideProject: true
    },
    {
      id: 18,
      title: "PassageLite",
      category: "backend",
      technologies: [".NET 8", "ASP.NET Core", "EF Core", "PostgreSQL", "xUnit", "Docker"],
      image: null,
      description: "Åtkomstkontroll API med JWT-autentisering, rollbaserad åtkomst (Admin/Användare), områdeshantering och Docker-stöd. Portfolioprojekt byggt december 2025.",
      githubLink: "https://github.com/AbaSheger/PassageLite",
      isSideProject: true
    },
    {
      id: 19,
      title: "DevOps-CourseProject",
      category: "cloud",
      technologies: ["Frontend", "DevOps", "Azure DevOps"],
      image: null,
      description: "E-handelsklient använd som grund för ett DevOps-kursprojekt. Frontend fylls med data från ett Business Data API via REST.",
      githubLink: "https://github.com/AbaSheger/DevOps-CourseProject",
      isSchoolProject: true
    },
    {
      id: 20,
      title: "Personal Expense Tracker",
      category: "backend",
      technologies: ["C#", ".NET 6", "WPF", "MathNet.Numerics"],
      image: null,
      description: "WPF-skrivbordsapp för att hantera personliga utgifter med kategorier, diagram, JSON-persistens och AI-driven 6-månadersprediktion med linjär regression.",
      githubLink: "https://github.com/AbaSheger/Personal-Expense-Tracker",
      isSchoolProject: true
    },
    {
      id: 22,
      title: "EcoTracker",
      category: "fullstack",
      technologies: ["Flutter", "Dart", "Material 3"],
      image: ecoTrackerImage,
      description: "Flutter mobil/webbapp för miljövänlig aktivitetsspårning med animerad startskärm och en ekokartskärm.",
      githubLink: "https://github.com/AbaSheger/EcoTracker",
      isSideProject: true
    }
  ]
};
