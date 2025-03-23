const musicAnalyticsImage = './assets/music-analytics.png';
const jmailerImage = './assets/jmailer.png'; // You'll need to add a screenshot of the project
const stagefinderImage = './assets/stagefinder.png'; // You'll need to add this image
const wigellPadelImage = './assets/wigell-padel.png';
const DevOpsImage = './assets/DevOps.png';
const eventOrganizerImage = './assets/event-organizer.png'; // You'll need to add this image



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
      liveLink: "https://jmailer.josdem.io/",
      githubLink: "https://github.com/josdem/jmailer-spring-boot?tab=readme-ov-file",
      isOpenSource: true,
      contribution: true
    },
    {
      id: 5,
      title: "StageFinder",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "Material UI", "Groq AI"],
      image: stagefinderImage, // Changed from onlinePlaceholder to stagefinderImage
      description: "AI-powered event platform built with React and Node.js. Features include speaker matching, event management, and role-based authentication. Integrates Groq API for intelligent content generation.",
      githubLink: "https://github.com/Lia-hub-Intern/the-event-portal",
      isInternship: true
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
      liveLink: "https://jmailer.josdem.io/",
      githubLink: "https://github.com/josdem/jmailer-spring-boot?tab=readme-ov-file",
      isOpenSource: true,
      contribution: true
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
      id: 6,
      title: "Eventorganisatör",
      category: "backend",
      technologies: ["C#", ".NET", "Windows Forms"],
      image: eventOrganizerImage,
      description: "En Windows-skrivbordsapplikation för att hantera evenemang och deltagare. Funktioner inkluderar evenemangskapande, deltagarhantering och ekonomiska beräkningar för evenemangsplanering.",
      githubLink: "https://github.com/AbaSheger/Eventorganizer",
      isSchoolProject: true
    }
  ]
};