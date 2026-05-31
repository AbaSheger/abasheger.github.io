// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Portfolio redesign smoke checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#projects');
  });

  test('featured projects render and archive expands', async ({ page }) => {
    const initialCards = await page.locator('#projects article').count();
    expect(initialCards).toBe(8);

    await page.getByRole('button', { name: /Show more projects/i }).click();
    await expect(page.locator('#projects article')).toHaveCount(27);
  });

  test('desktop filter exposes Collector Demo', async ({ page }) => {
    await page.getByRole('button', { name: 'Desktop & Games' }).click();
    await expect(page.locator('#projects')).toContainText('Collector Demo');
  });

  test('role preset produces evidence-based results', async ({ page }) => {
    await page.locator('#ai-match').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Junior Java Developer' }).click();
    await page.getByRole('button', { name: 'Explore role fit' }).click();

    await expect(page.locator('#ai-match')).toContainText(/alignment/i);
    await expect(page.locator('#ai-match')).toContainText('Supporting projects');
    await expect(page.locator('#ai-match')).toContainText('Spring Boot');
  });

  test('browser bundles do not contain Groq endpoint', async ({ page, request }) => {
    const scriptPaths = await page.locator('script[src]').evaluateAll(scripts => scripts.map(script => script.src));
    expect(scriptPaths.length).toBeGreaterThan(0);

    for (const scriptPath of scriptPaths) {
      const response = await request.get(scriptPath);
      expect(response.ok()).toBeTruthy();
      expect(await response.text()).not.toContain('api.groq.com');
    }
  });
});
