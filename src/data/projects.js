const musicAnalyticsImage = './assets/music-analytics.png';
const jmailerImage = './assets/jmailer.png'; // You'll need to add a screenshot of the project
const stagefinderImage = './assets/stagefinder.png'; // You'll need to add this image
const wigellPadelImage = './assets/wigell-padel.png';
// Use an online placeholder service for projects without images
const onlinePlaceholder = "https://via.placeholder.com/800x400?text=Coming+Soon";

export const projects = [
  {
    id: 1,
    title: "Music Analytics Platform",
    category: "fullstack",
    technologies: ["Spring Boot", "React", "Docker"],
    image: musicAnalyticsImage,
    description: "Java-based microservice platform for music analytics and recommendations with AI-based algorithms.",
    liveLink: "https://musicanalytics.netlify.app/",
    githubLink: "https://github.com/AbaSheger/MusicAnalyticsPlatform"
  },
  {
    id: 2,
    title: "Wigell Padel Microservice",
    category: "backend",
    technologies: ["Spring Boot", "MySQL", "Spring Security"],
    image: wigellPadelImage,
    description: "REST API in Java Spring Boot with MySQL for bookings and customer data with secure authentication.",
    liveLink: "https://live-link-to-wigell-padel-mikrotjanst.com",
    githubLink: "https://github.com/AbaSheger/wigell-padel-portfolio.git"
  },
  {
    id: 3,
    title: "Full-Stack Solution (EduGrade)",
    category: "cloud",
    technologies: ["Azure DevOps", "React", "Java"],
    image: onlinePlaceholder, // Online placeholder instead of local file
    description: "CI/CD pipeline in Azure DevOps for React frontend and Java-based REST API backend.",
    liveLink: "https://live-link-to-full-stack-solution-edugrade.com",
    githubLink: "https://github.com/abenezer-anglo/full-stack-solution-edugrade"
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
  }
];