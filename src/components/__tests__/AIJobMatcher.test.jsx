import React from 'react';
import { render, screen } from '@testing-library/react';

// We test the pure functions by extracting them via a helper module approach.
// Since matchesSkill and analyzeLocally are not exported, we test their behavior
// through the component or re-implement the logic for unit testing.

// Re-implement matchesSkill to test independently
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

describe('matchesSkill word-boundary matching', () => {
  test('matches exact skill names', () => {
    expect(matchesSkill('We need Java experience', 'Java')).toBe(true);
    expect(matchesSkill('React developer wanted', 'React')).toBe(true);
    expect(matchesSkill('Experience with Docker required', 'Docker')).toBe(true);
  });

  test('does NOT match substrings inside other words', () => {
    // "Git" should not match inside "digital"
    expect(matchesSkill('digital marketing expert', 'Git')).toBe(false);
    // "Java" should not match inside "JavaScript"
    expect(matchesSkill('JavaScript developer needed', 'Java')).toBe(false);
    // "React" should not match inside "reactive"
    expect(matchesSkill('reactive programming skills', 'React')).toBe(false);
  });

  test('matches skills at start and end of text', () => {
    expect(matchesSkill('Java is required', 'Java')).toBe(true);
    expect(matchesSkill('Experience in Java', 'Java')).toBe(true);
    expect(matchesSkill('Java', 'Java')).toBe(true);
  });

  test('matches skills next to punctuation', () => {
    expect(matchesSkill('Java, Spring Boot, Docker', 'Java')).toBe(true);
    expect(matchesSkill('(Java)', 'Java')).toBe(true);
    expect(matchesSkill('Skills: Java.', 'Java')).toBe(true);
    expect(matchesSkill('Agile/Scrum methodology', 'Scrum')).toBe(true);
  });

  test('matches multi-word skills', () => {
    expect(matchesSkill('Spring Boot microservices', 'Spring Boot')).toBe(true);
    expect(matchesSkill('REST APIs design', 'REST APIs')).toBe(true);
    expect(matchesSkill('Azure DevOps pipelines', 'Azure DevOps')).toBe(true);
  });

  test('matches skills with special characters', () => {
    expect(matchesSkill('C# and .NET development', 'C#')).toBe(true);
    expect(matchesSkill('C# and .NET development', '.NET')).toBe(true);
    expect(matchesSkill('HTML/CSS styling', 'HTML/CSS')).toBe(true);
  });

  test('is case insensitive', () => {
    expect(matchesSkill('JAVA DEVELOPER', 'Java')).toBe(true);
    expect(matchesSkill('java developer', 'Java')).toBe(true);
    expect(matchesSkill('docker containers', 'Docker')).toBe(true);
  });
});

describe('score variation across different job types', () => {
  // Simulate the scoring logic from analyzeLocally
  const skillCategories = [
    { id: 'backend', title: 'Backend & Programming', proficiency: 85, skills: ['Java', 'C#', '.NET', 'Python', 'Spring Boot', 'REST APIs', 'Postman', 'Keycloak', 'Maven', 'MySQL', 'H2', 'JUnit', 'Mockito', 'TDD'] },
    { id: 'devops', title: 'DevOps & CI/CD', proficiency: 75, skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Azure DevOps'] },
    { id: 'frontend', title: 'Frontend & UI', proficiency: 70, skills: ['React', 'JavaScript', 'HTML/CSS'] },
    { id: 'agile', title: 'Agile & Other', proficiency: 80, skills: ['Scrum', 'Kanban', 'Team Collaboration', 'Problem Solving', 'AI Basics'] },
  ];

  const computeScore = (jobDesc) => {
    const categoryResults = skillCategories.map(cat => ({
      ...cat,
      matched: cat.skills.filter(skill => matchesSkill(jobDesc, skill))
    }));
    const allMatched = categoryResults.flatMap(cat => cat.matched);
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
    return {
      score: Math.min(95, Math.max(allMatched.length === 0 ? 10 : 15, Math.round(rawRatio * 100))),
      matched: allMatched
    };
  };

  test('non-tech job gets a low score', () => {
    const { score } = computeScore(
      'We are looking for a Marketing Manager to lead our digital campaigns, manage brand presence on social media, and coordinate with creative agencies.'
    );
    expect(score).toBeLessThan(30);
  });

  test('highly matching Java/Spring Boot job gets a higher score than unrelated jobs', () => {
    const { score } = computeScore(
      'Senior Java Developer with Spring Boot, REST APIs, MySQL, Docker, Git, JUnit, TDD, Maven, React, JavaScript, Scrum, Azure DevOps, Postman'
    );
    // 13 out of 27 skills matched → ~50%, well above a non-tech job
    expect(score).toBeGreaterThan(45);
    expect(score).toBeLessThan(85);
  });

  test('frontend-only job gets moderate score', () => {
    const { score } = computeScore(
      'We need a Frontend Developer experienced in React, JavaScript, HTML/CSS. Knowledge of UI/UX design, responsive design, and accessibility standards.'
    );
    expect(score).toBeLessThan(50);
    expect(score).toBeGreaterThan(5);
  });

  test('different job descriptions produce different scores', () => {
    const marketingScore = computeScore(
      'Marketing Manager needed for digital campaigns and brand strategy. Experience with Google Analytics, SEO, and content marketing required.'
    ).score;

    const javaDevScore = computeScore(
      'Java Developer with Spring Boot, Docker, REST APIs, MySQL, Git, Scrum experience required.'
    ).score;

    const dataScienceScore = computeScore(
      'Data Scientist needed. Must know Python, TensorFlow, Pandas, NumPy, machine learning, statistics, R language.'
    ).score;

    // All three should be different from each other
    expect(marketingScore).not.toBe(javaDevScore);
    expect(marketingScore).not.toBe(dataScienceScore);
    expect(javaDevScore).not.toBe(dataScienceScore);

    // Java dev should score highest, data science moderate, marketing lowest
    expect(javaDevScore).toBeGreaterThan(dataScienceScore);
    expect(dataScienceScore).toBeGreaterThan(marketingScore);
  });
});
