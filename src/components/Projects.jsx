import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';

const projectCategories = [
  { id: 'all', label: 'filterAll' },
  { id: 'backend', label: 'filterBackend' },
  { id: 'fullstack', label: 'filterFullstack' },
  { id: 'cloud', label: 'filterCloud' }
];

export const Projects = ({ text }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Music Analytics Platform",
      category: "fullstack",
      technologies: ["Spring Boot", "React", "Docker"],
      image: './assets/music-analytics.png',
      description: "Java-based microservice platform for music analytics and recommendations with AI-based algorithms.",
      liveLink: "https://musicanalytics.netlify.app/",
      githubLink: "https://github.com/AbaSheger/MusicAnalyticsPlatform"
    },
    {
      id: 2,
      title: "Wigell Padel Microservice",
      category: "backend",
      technologies: ["Spring Boot", "MySQL", "Spring Security"],
      image: './assets/wigell-padel.png',
      description: "REST API in Java Spring Boot with MySQL for bookings and customer data with secure authentication.",
      githubLink: "https://github.com/AbaSheger/wigell-padel-portfolio.git"
    },
    {
      id: 3,
      title: "Full-Stack Solution (EduGrade)",
      category: "cloud",
      technologies: ["Azure DevOps", "React", "Java"],
      image: './assets/DevOps.png',
      description: "CI/CD pipeline in Azure DevOps for React frontend and Java-based REST API backend.",
      githubLink: "https://github.com/AbaSheger/DevOps-CourseProject"
    },
    {
      id: 4,
      title: "JMailer Spring Boot",
      category: "backend",
      technologies: ["Spring Boot", "Java", "Email Service", "Open Source"],
      image: './assets/jmailer.png',
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
      image: './assets/stagefinder.png',
      description: "AI-powered event platform built with React and Node.js. Features include speaker matching, event management, and role-based authentication. Integrates Groq API for intelligent content generation.",
      githubLink: "https://github.com/Lia-hub-Intern/the-event-portal",
      isInternship: true
    },
    {
      id: 6,
      title: "Event Organizer",
      category: "backend",
      technologies: ["C#", ".NET", "Windows Forms"],
      image: './assets/event-organizer.png',
      description: "A Windows desktop application for managing events and participants. Features include event creation, participant management, and financial calculations for event planning.",
      githubLink: "https://github.com/AbaSheger/Eventorganizer",
      isDesktopApp: true
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-dark-800/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center">
          <span className="text-blue-600 dark:text-blue-400 mr-2 font-mono w-8">02.</span>
          {text.sectionTitle}
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {projectCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {text[category.label]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};