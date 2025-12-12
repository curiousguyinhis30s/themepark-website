import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8082';

test.describe('Public Website Visual Smoke Tests', () => {
  test('HomePage loads correctly with no emoji icons', async ({ page }) => {
    await page.goto(BASE_URL);

    // Wait for content to load
    await page.waitForSelector('h1');

    // Check hero text is visible
    await expect(page.locator('h1')).toContainText('Experience the Magic');

    // Check Buy Tickets button exists
    await expect(page.getByRole('link', { name: /buy tickets/i }).first()).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/home-page.png', fullPage: true });

    // Verify NO emoji icons in the page
    const bodyText = await page.locator('body').textContent();
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
    const emojis = bodyText?.match(emojiRegex) || [];
    expect(emojis.length).toBe(0);
  });

  test('AttractionsPage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/attractions`);

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Our Attractions');

    // Check filter section exists
    await expect(page.locator('select').first()).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/attractions-page.png', fullPage: true });
  });

  test('TicketsPage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/tickets`);

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Buy Tickets');

    await page.screenshot({ path: 'tests/screenshots/tickets-page.png', fullPage: true });
  });

  test('ZonesPage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/zones`);

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Explore Our Zones');

    // Check zone names are visible (use first() to handle multiple matches)
    await expect(page.getByText('Fantasy Kingdom').first()).toBeVisible();
    await expect(page.getByText('Adventure Valley').first()).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/zones-page.png', fullPage: true });
  });

  test('ContactPage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Contact Us');

    // Check contact form exists
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/contact-page.png', fullPage: true });
  });

  test('PlanVisitPage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/plan-visit`);

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Plan Your Visit');

    // Check sections exist (use heading role to be more specific)
    await expect(page.getByRole('heading', { name: 'Park Hours' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Getting Here' })).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/plan-visit-page.png', fullPage: true });
  });

  test('Navigation works correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Click Attractions link in nav (use first to get nav link, not hero link)
    await page.locator('nav').getByRole('link', { name: 'Attractions' }).click();
    await expect(page).toHaveURL(/\/attractions/);

    // Click Zones link
    await page.locator('nav').getByRole('link', { name: 'Zones' }).click();
    await expect(page).toHaveURL(/\/zones/);

    // Click Home link
    await page.locator('nav').getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(BASE_URL + '/');
  });

  test('Mobile responsive layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(BASE_URL);
    await page.waitForSelector('h1');

    // Check mobile menu button is visible
    await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();

    // Click mobile menu
    await page.getByRole('button', { name: /open menu/i }).click();

    // Check menu items are visible (use exact match for nav link)
    await expect(page.getByRole('link', { name: 'Attractions', exact: true }).first()).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/home-mobile.png', fullPage: true });
  });

  test('Legal pages load correctly', async ({ page }) => {
    // Privacy page
    await page.goto(`${BASE_URL}/privacy`);
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    await page.screenshot({ path: 'tests/screenshots/privacy-page.png', fullPage: true });

    // Terms page
    await page.goto(`${BASE_URL}/terms`);
    await expect(page.locator('h1')).toContainText('Terms of Service');

    // Cookies page
    await page.goto(`${BASE_URL}/cookies`);
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});
