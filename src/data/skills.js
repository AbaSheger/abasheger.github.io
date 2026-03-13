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
    // LAYER 1 (auto-synced from GitHub language detection):
    //   Java, C#, Python, Kotlin, Go, Rust, Ruby, C++, C, Scala, Groovy
    // LAYER 2 (manually curated — frameworks, tools, databases):
    //   Spring Boot, Spring Security, Spring Cloud, Spring Data JPA, REST APIs,
    //   Postman, Keycloak, Maven, MySQL, PostgreSQL, H2, JUnit, Mockito, TDD,
    //   JavaFX, Hibernate, Flyway, Kafka, Bucket4j, picocli,
    //   ASP.NET Core, EF Core, xUnit, WPF, MathNet.Numerics
    skills: ['Java', 'C#', '.NET', 'Python', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'Spring Data JPA', 'REST APIs', 'Postman', 'Keycloak', 'Maven', 'MySQL', 'PostgreSQL', 'H2', 'JUnit', 'Mockito', 'TDD', 'Go', 'Kotlin', 'Ruby', 'JavaFX', 'Hibernate', 'Flyway', 'Kafka', 'Bucket4j', 'picocli', 'ASP.NET Core', 'EF Core', 'xUnit', 'WPF', 'MathNet.Numerics']
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD',
    icon: 'server',
    proficiency: 75,
    // LAYER 1 (auto-synced from GitHub language detection):
    //   Docker, Git, Shell, PowerShell, Dockerfile
    // LAYER 2 (manually curated — tools, platforms):
    //   Docker Compose, GitHub, Azure DevOps, GitHub Actions, Nginx
    skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Azure DevOps', 'GitHub Actions', 'Nginx', 'Dockerfile', 'Shell', 'PowerShell']
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    icon: 'layout',
    proficiency: 70,
    // LAYER 1 (auto-synced from GitHub language detection):
    //   JavaScript, TypeScript, HTML/CSS, CSS, Dart
    // LAYER 2 (manually curated — frameworks, libraries, tools):
    //   React, Angular, Flutter, Tailwind CSS, Vite, shadcn-ui,
    //   Material UI, Material 3, Ant Design, Node.js, Express
    skills: ['React', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'CSS', 'Dart', 'Flutter', 'Tailwind CSS', 'Vite', 'shadcn-ui', 'Material UI', 'Material 3', 'Ant Design', 'Node.js', 'Express']
  },
  {
    id: 'agile',
    title: 'Agile & Other',
    icon: 'users',
    proficiency: 80,
    // LAYER 2 (manually curated — methodologies, soft skills):
    skills: ['Scrum', 'Kanban', 'Team Collaboration', 'Problem Solving', 'AI Basics']
  }
];
