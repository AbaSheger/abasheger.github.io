#!/usr/bin/env node
'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// LAYER 1: Language → skill-category mapping (AUTO-SYNCED from GitHub repos)
// Add any language GitHub detects here. The script will auto-add it to
// skills.js whenever it appears in a new repo.
// ---------------------------------------------------------------------------
const LANGUAGE_TO_CATEGORY = {
  // Backend languages
  Java: 'backend',
  'C#': 'backend',
  Python: 'backend',
  Kotlin: 'backend',
  Go: 'backend',
  Rust: 'backend',
  PHP: 'backend',
  Ruby: 'backend',
  'C++': 'backend',
  C: 'backend',
  Scala: 'backend',
  Groovy: 'backend',
  // Frontend languages
  JavaScript: 'frontend',
  TypeScript: 'frontend',
  HTML: 'frontend',
  CSS: 'frontend',
  Dart: 'frontend',      // Flutter apps
  Vue: 'frontend',
  Svelte: 'frontend',
  // DevOps / infra languages
  Shell: 'devops',
  Dockerfile: 'devops',
  HCL: 'devops',
  Makefile: 'devops',
  PowerShell: 'devops',
};

// ---------------------------------------------------------------------------
// LAYER 2 (manually curated) lives in src/data/skills.js — see that file for
// frameworks, tools, databases, and methodologies that GitHub cannot detect.
// ---------------------------------------------------------------------------

const FILE_HEADER = `// =============================================================================
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

`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Make an authenticated GET request to the GitHub API.
 * Returns the parsed JSON body.
 */
function githubGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      method: 'GET',
      headers: {
        'User-Agent': 'sync-skills-script',
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`GitHub API ${urlPath} returned HTTP ${res.statusCode}: ${body}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(new Error(`Failed to parse JSON from ${urlPath}: ${err.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Fetch all public repos for the given GitHub user (handles pagination).
 */
async function fetchAllRepos(username) {
  const repos = [];
  let page = 1;
  while (true) {
    const batch = await githubGet(
      `/users/${username}/repos?type=public&per_page=100&page=${page}`
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return repos;
}

/**
 * Fetch the languages object for a single repo.
 * Returns an object like { JavaScript: 12345, CSS: 456 }.
 */
async function fetchRepoLanguages(owner, repoName) {
  try {
    return await githubGet(`/repos/${owner}/${repoName}/languages`);
  } catch (err) {
    console.warn(`  Warning: could not fetch languages for ${repoName}: ${err.message}`);
    return {};
  }
}

// ---------------------------------------------------------------------------
// Main logic
// ---------------------------------------------------------------------------
async function main() {
  const OWNER = 'AbaSheger';
  const SKILLS_PATH = path.resolve(__dirname, '../src/data/skills.js');

  // 1. Read current skills.js
  const currentSource = fs.readFileSync(SKILLS_PATH, 'utf8');

  // Parse the skillCategories array out of the JS source via a simple eval
  // inside a sandboxed module wrapper so we don't need a full parser.
  let skillCategories;
  {
    // Replace ES module export with a CommonJS assignment so we can require it
    const cjsSource = currentSource.replace(
      /export\s+const\s+skillCategories\s*=/,
      'module.exports.skillCategories ='
    );
    const tmpFile = path.join(require('os').tmpdir(), `_skills_tmp_${process.pid}.js`);
    fs.writeFileSync(tmpFile, cjsSource, 'utf8');
    // Clear require cache in case the file was written before
    delete require.cache[require.resolve(tmpFile)];
    ({ skillCategories } = require(tmpFile));
    fs.unlinkSync(tmpFile);
  }

  // Build a map: categoryId → Set of existing skills (lower-cased for dedup)
  const existingByCategory = {};
  for (const cat of skillCategories) {
    existingByCategory[cat.id] = new Set(cat.skills.map((s) => s.toLowerCase()));
  }

  // 2. Fetch all repos and their languages
  console.log(`Fetching public repos for ${OWNER}…`);
  const repos = await fetchAllRepos(OWNER);
  console.log(`Found ${repos.length} public repo(s).`);

  const discoveredByCategory = {}; // categoryId → Set<string> (raw language names)

  for (const repo of repos) {
    const languages = await fetchRepoLanguages(OWNER, repo.name);
    for (const lang of Object.keys(languages)) {
      const categoryId = LANGUAGE_TO_CATEGORY[lang];
      if (!categoryId) continue; // not in our mapping — skip

      if (!discoveredByCategory[categoryId]) {
        discoveredByCategory[categoryId] = new Set();
      }

      // Special case: GitHub's "HTML" should be added as "HTML/CSS" only when
      // "HTML/CSS" is not already present in that category.
      const skillName = lang === 'HTML' ? 'HTML/CSS' : lang;
      discoveredByCategory[categoryId].add(skillName);
    }
  }

  // 3. Merge newly discovered skills into skillCategories
  const addedByCategory = {}; // categoryId → string[] (newly added skill names)

  for (const cat of skillCategories) {
    const newSkills = discoveredByCategory[cat.id] || new Set();
    const added = [];
    for (const skill of newSkills) {
      if (!existingByCategory[cat.id].has(skill.toLowerCase())) {
        cat.skills.push(skill);
        existingByCategory[cat.id].add(skill.toLowerCase());
        added.push(skill);
      }
    }
    if (added.length > 0) {
      addedByCategory[cat.id] = added;
    }
  }

  // 4. Report results
  const totalAdded = Object.values(addedByCategory).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  if (totalAdded === 0) {
    console.log('No new skills found. Nothing to update.');
    return;
  }

  for (const [catId, skills] of Object.entries(addedByCategory)) {
    console.log(`  [${catId}] Added: ${skills.join(', ')}`);
  }

  // 5. Write updated skills.js (preserving the original file structure)
  const updatedSource = generateSkillsSource(skillCategories);
  fs.writeFileSync(SKILLS_PATH, updatedSource, 'utf8');
  console.log(`\nUpdated ${SKILLS_PATH} with ${totalAdded} new skill(s).`);
}

/**
 * Regenerate the skills.js file content from the in-memory skillCategories array,
 * preserving the exact same export format as the original file.
 */
function generateSkillsSource(skillCategories) {
  const categoriesStr = skillCategories
    .map((cat) => {
      const skillsStr = cat.skills.map((s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`).join(', ');
      return (
        `  {\n` +
        `    id: '${cat.id}',\n` +
        `    title: '${cat.title}',\n` +
        `    icon: '${cat.icon}',\n` +
        `    proficiency: ${cat.proficiency},\n` +
        `    skills: [${skillsStr}]\n` +
        `  }`
      );
    })
    .join(',\n');

  return FILE_HEADER + `export const skillCategories = [\n${categoriesStr}\n];\n`;
}

main().catch((err) => {
  console.error('sync-skills failed:', err);
  process.exit(1);
});
