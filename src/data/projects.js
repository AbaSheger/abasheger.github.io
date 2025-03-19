import musicAnalyticsImage from "../assets/music-analytics.png";

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
    image: onlinePlaceholder, // Online placeholder instead of local file
    description: "REST API in Java Spring Boot with MySQL for bookings and customer data with secure authentication.",
    liveLink: "https://live-link-to-wigell-padel-mikrotjanst.com",
    githubLink: "https://github.com/abenezer-anglo/wigell-padel-mikrotjanst"
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
  }
];