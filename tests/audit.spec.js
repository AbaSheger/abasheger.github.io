// @ts-check
const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

// ─── A. SEO & ATS Signal Audit ───────────────────────────────────────────────

test.describe('A. SEO & ATS Signals', () => {
  test('page title contains name and role', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Abenezer Anglo/i);
    await expect(page).toHaveTitle(/Software Developer/i);
  });

  test('meta description is present and non-empty', async ({ page }) => {
    await page.goto('/');
    const content = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(20);
  });

  test('Open Graph tags are present', async ({ page }) => {
    await page.goto('/');
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    expect(ogDesc).toBeTruthy();
    expect(ogImage).toBeTruthy();
  });

  test('KNOWN GAP — no JSON-LD structured data (schema.org Person)', async ({ page }) => {
    // EXPECTED TO FAIL.
    // JSON-LD makes the site machine-readable for AI/recruitment tools.
    // Fix: add <script type="application/ld+json"> with a Person schema.
    await page.goto('/');
    const ldJson = await page.locator('script[type="application/ld+json"]').count();
    expect(
      ldJson,
      'Missing JSON-LD schema — AI matchers cannot parse your identity/skills from HTML'
    ).toBeGreaterThan(0);
  });

  test('KNOWN GAP — raw HTML body (no-JS scraper) has no meaningful content', async ({ request }) => {
    // EXPECTED TO FAIL.
    // ATS bots that skip JavaScript see an empty React shell.
    // The CV PDF is what ATS systems actually read, not this page.
    const response = await request.get('http://localhost:3000/');
    const fullHtml = await response.text();
    // Strip the <head> so meta tags don't give false positives
    const bodyHtml = fullHtml.replace(/<head[\s\S]*?<\/head>/i, '');
    const hasMeaningfulBodyContent =
      bodyHtml.includes('Abenezer Anglo') ||
      bodyHtml.includes('Java developer') ||
      bodyHtml.includes('Spring Boot') ||
      bodyHtml.includes('Software Developer portfolio');
    expect(
      hasMeaningfulBodyContent,
      'Raw HTML body has no meaningful content — SPA is invisible to non-JS scrapers'
    ).toBe(true);
  });

  test('KNOWN GAP — no Twitter Card meta tags', async ({ page }) => {
    // EXPECTED TO FAIL. Twitter cards improve social sharing visibility.
    await page.goto('/');
    const twitterCard = await page.locator('meta[name="twitter:card"]').count();
    expect(twitterCard, 'Missing Twitter Card meta tags').toBeGreaterThan(0);
  });

  test('KNOWN GAP — no canonical link tag', async ({ page }) => {
    // EXPECTED TO FAIL.
    // A canonical tag prevents duplicate content issues for EN/SV language variants.
    await page.goto('/');
    const canonical = await page.locator('link[rel="canonical"]').count();
    expect(canonical, 'Missing canonical link tag').toBeGreaterThan(0);
  });
});

// ─── B. Accessibility Audit ──────────────────────────────────────────────────

test.describe('B. Accessibility', () => {
  test('REAL BUG — axe-core finds serious WCAG 2 violations', async ({ page }) => {
    // EXPECTED TO FAIL — these are real bugs found by the audit:
    // 1. color-contrast: text-gray-600 on bg-gray-100 fails 4.5:1 ratio in project cards
    //    Fix: use text-gray-700 or darker for card text/tech badges
    // 2. link-name: scroll-down arrow <a href="#about"> has no accessible text
    //    Fix: add aria-label="Scroll to About section" to that anchor
    await page.goto('/');
    await page.waitForSelector('#main-content', { timeout: 10_000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log('\n=== AXE VIOLATIONS ===');
      results.violations.forEach(v => {
        console.log(`[${v.impact.toUpperCase()}] ${v.id}: ${v.description}`);
        v.nodes.forEach(n => console.log('  ', n.html.slice(0, 120)));
      });
    }

    const criticalOrSerious = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );
    expect(
      criticalOrSerious,
      `Found ${criticalOrSerious.length} critical/serious accessibility violations`
    ).toHaveLength(0);
  });

  test('skip link #main-content is in the DOM', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main-content')).toHaveCount(1);
  });

  test('language toggle button has aria-label', async ({ page }) => {
    await page.goto('/');
    // Multiple instances exist (desktop nav + mobile); check at least one is present
    const count = await page.locator('button[aria-label="Switch to Swedish"]').count();
    expect(count, 'Language toggle button with aria-label not found').toBeGreaterThan(0);
  });

  test('theme toggle button has aria-label', async ({ page }) => {
    await page.goto('/');
    // ThemeToggle is rendered in multiple DOM locations (Header + main); check at least one
    const count = await page.locator('button[aria-label="Switch to dark mode"]').count();
    expect(count, 'Theme toggle button with aria-label not found').toBeGreaterThan(0);
  });
});

// ─── C. Content Rendering ────────────────────────────────────────────────────

test.describe('C. Content Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#hero', { timeout: 10_000 });
  });

  test('hero section shows full name', async ({ page }) => {
    await expect(page.locator('#hero')).toContainText('Abenezer Anglo');
  });

  test('hero section shows Software Developer title', async ({ page }) => {
    await expect(page.locator('#hero')).toContainText('Software Developer');
  });

  test('at least 5 skill pills are visible in Skills section', async ({ page }) => {
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Skill pills are <span> inside .flex.flex-wrap.gap-2 cards
    const count = await page.locator('#skills div.flex.flex-wrap span').count();
    expect(count).toBeGreaterThan(4);
  });

  test('at least 3 project cards are visible', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // ProjectCard uses role="article"
    const count = await page.locator('#projects [role="article"]').count();
    expect(count).toBeGreaterThan(2);
  });

  test('CV section has English and Swedish PDF download links', async ({ page }) => {
    await page.locator('a[href*="cv-en.pdf"]').first().scrollIntoViewIfNeeded().catch(() => {});
    const cvLinks = await page.locator('a[href*="cv-en.pdf"], a[href*="cv-sv.pdf"]').count();
    expect(cvLinks, 'Expected both CV PDF download links').toBeGreaterThanOrEqual(2);
  });
});

// ─── D. Navigation ───────────────────────────────────────────────────────────

test.describe('D. Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('nav[aria-label="Main navigation"]', { timeout: 10_000 });
  });

  for (const section of ['about', 'projects', 'skills', 'contact']) {
    test(`nav link scrolls to #${section}`, async ({ page }) => {
      const link = page
        .locator(`nav[aria-label="Main navigation"] a[href="#${section}"]`)
        .first();
      await link.click();
      await page.waitForTimeout(800);
      await expect(page.locator(`#${section}`)).toBeInViewport({ ratio: 0.1 });
    });
  }
});

// ─── E. Language Toggle ──────────────────────────────────────────────────────

test.describe('E. Language Toggle', () => {
  test('default language is English', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('nav[aria-label="Main navigation"]')
    ).toContainText('About');
  });

  test('toggle to Swedish changes nav text', async ({ page }) => {
    await page.goto('/');
    // Click the first *visible* language toggle (desktop nav); mobile one is display:none at 1280px
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[aria-label="Switch to Swedish"]'));
      const visible = btns.find(b => b.offsetWidth > 0 && b.offsetHeight > 0);
      if (!visible) throw new Error('No visible Switch to Swedish button');
      visible.click();
    });
    await page.waitForTimeout(400);
    await expect(
      page.locator('nav[aria-label="Main navigation"]')
    ).toContainText('Om');
  });

  test('toggle back to English restores nav text', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const toSV = Array.from(document.querySelectorAll('button[aria-label="Switch to Swedish"]'));
      const visible = toSV.find(b => b.offsetWidth > 0 && b.offsetHeight > 0);
      if (!visible) throw new Error('No visible Switch to Swedish button');
      visible.click();
    });
    await page.waitForTimeout(400);
    await page.evaluate(() => {
      const toEN = Array.from(document.querySelectorAll('button[aria-label="Switch to English"]'));
      const visible = toEN.find(b => b.offsetWidth > 0 && b.offsetHeight > 0);
      if (!visible) throw new Error('No visible Switch to English button');
      visible.click();
    });
    await page.waitForTimeout(400);
    await expect(
      page.locator('nav[aria-label="Main navigation"]')
    ).toContainText('About');
  });
});

// ─── F. Dark Mode Toggle ─────────────────────────────────────────────────────

test.describe('F. Dark Mode', () => {
  test('theme toggle adds/removes dark class on root', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#hero', { timeout: 10_000 });

    // App renders: body > #root > <div class="dark"> — we need the App's wrapper, not #root
    const root = page.locator('#root > div').first();
    const initialDark = await root.evaluate(el => el.classList.contains('dark'));

    // Click the first visible ThemeToggle (multiple exist in DOM due to Header + App rendering)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[aria-label="Switch to dark mode"]'));
      const visible = btns.find(b => b.offsetWidth > 0 && b.offsetHeight > 0);
      if (!visible) throw new Error('No visible theme toggle button');
      visible.click();
    });
    await page.waitForTimeout(400);
    const afterFirst = await root.evaluate(el => el.classList.contains('dark'));
    expect(afterFirst).toBe(!initialDark);

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[aria-label="Switch to light mode"]'));
      const visible = btns.find(b => b.offsetWidth > 0 && b.offsetHeight > 0);
      if (!visible) throw new Error('No visible theme toggle button');
      visible.click();
    });
    await page.waitForTimeout(400);
    const afterSecond = await root.evaluate(el => el.classList.contains('dark'));
    expect(afterSecond).toBe(initialDark);
  });
});

// ─── G. Mobile Responsiveness ────────────────────────────────────────────────

test.describe('G. Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.getByRole('button', { name: 'Open menu' });
    await expect(hamburger).toBeVisible();
  });

  test('hamburger opens mobile menu', async ({ page }) => {
    await page.goto('/');
    const openBtn = page.getByRole('button', { name: 'Open menu' });
    await openBtn.click();
    await page.waitForTimeout(300);
    const closeBtn = page.getByRole('button', { name: 'Close menu' });
    await expect(closeBtn).toBeVisible();
  });

  test('hamburger closes mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.waitForTimeout(300);
    // Dispatch click directly — the overlay can intercept Playwright's pointer action
    await page.evaluate(() => {
      document.querySelector('button[aria-controls="mobile-menu"]').click();
    });
    const hamburger = page.locator('button[aria-controls="mobile-menu"]');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false', { timeout: 10_000 });
  });
});

// ─── H. CV PDF Downloads ─────────────────────────────────────────────────────

test.describe('H. CV PDF Downloads', () => {
  test('cv-en.pdf returns HTTP 200', async ({ request }) => {
    const response = await request.get('http://localhost:3000/assets/cv-en.pdf');
    expect(response.status()).toBe(200);
  });

  test('cv-sv.pdf returns HTTP 200', async ({ request }) => {
    const response = await request.get('http://localhost:3000/assets/cv-sv.pdf');
    expect(response.status()).toBe(200);
  });
});

// ─── I. Project Filter ───────────────────────────────────────────────────────

test.describe('I. Project Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('filter buttons are present with correct labels', async ({ page }) => {
    // Labels from translations.js: filterAll="All Projects", filterBackend="Backend",
    // filterFullstack="Full Stack", filterCloud="Cloud & DevOps"
    for (const label of ['All Projects', 'Backend', 'Full Stack', 'Cloud & DevOps']) {
      await expect(
        page.locator(`#projects button:has-text("${label}")`)
      ).toBeVisible();
    }
  });

  test('clicking Backend filter reduces visible project count', async ({ page }) => {
    const allCount = await page.locator('#projects [role="article"]').count();
    await page.locator('#projects button:has-text("Backend")').click();
    await page.waitForTimeout(400);
    const filteredCount = await page.locator('#projects [role="article"]').count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(allCount);
  });

  test('clicking All Projects restores full project list', async ({ page }) => {
    const allCount = await page.locator('#projects [role="article"]').count();
    await page.locator('#projects button:has-text("Backend")').click();
    await page.waitForTimeout(300);
    await page.locator('#projects button:has-text("All Projects")').click();
    await page.waitForTimeout(300);
    const restoredCount = await page.locator('#projects [role="article"]').count();
    expect(restoredCount).toBe(allCount);
  });
});
