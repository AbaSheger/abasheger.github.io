// =============================================================================
// SKILLS DATA — Two-layer system
//
// LAYER 1 (auto-synced): Languages detected from GitHub repos by scripts/sync-skills.js
//   → These are added automatically when you push a new repo using a new language.
//   → Do NOT manually remove these; they are managed by the sync script.
//
// LAYER 2 (manually curated): Frameworks, tools, databases, methodologies
//   → GitHub cannot detect these automatically.
//   → Add new ones here manually when you learn something new.
// =============================================================================

export const skillCategories = [
  {
    id: 'backend',
    title: 'Backend & Programming',
    icon: 'code',
    proficiency: 85,
    skills: ['Java', 'C#', '.NET', 'Python', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'Spring Data JPA', 'REST APIs', 'Postman', 'Keycloak', 'Maven', 'MySQL', 'PostgreSQL', 'H2', 'JUnit', 'Mockito', 'TDD', 'Playwright', 'Ruby', 'JavaFX', 'Hibernate', 'Flyway', 'Kafka', 'Bucket4j', 'picocli', 'ASP.NET Core', 'EF Core', 'xUnit', 'WPF', 'MathNet.Numerics', 'Go', 'Kotlin']
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD',
    icon: 'server',
    proficiency: 75,
    skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Azure DevOps', 'GitHub Actions', 'Nginx', 'Dockerfile', 'Shell', 'PowerShell']
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    icon: 'layout',
    proficiency: 70,
    skills: ['React', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'CSS', 'Dart', 'Flutter', 'Tailwind CSS', 'Vite', 'shadcn-ui', 'Material UI', 'Material 3', 'Ant Design', 'Node.js', 'Express']
  },
  {
    id: 'agile',
    title: 'Agile & Other',
    icon: 'users',
    proficiency: 80,
    skills: ['Scrum', 'Kanban', 'Team Collaboration', 'Problem Solving', 'AI-assisted development', 'GitHub Copilot', 'Claude Code', 'Prompt Engineering', 'LLM tools']
  }
];
