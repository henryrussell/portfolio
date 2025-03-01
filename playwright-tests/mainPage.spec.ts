import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('The main page is displayed', () => {

  test('the intro is in view', async ({ page }) => {
    const intro = page.getByTestId('intro');
    await expect(intro).toBeInViewport();
  });

  test('check the title content is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/Hire Henry - Testing and Development Portfolio/)
  });

});

test.describe('The Test Buttons are available', () => {

  test('The unit test button is displayed', async ({ page }) => {
    const unitTestButton = page.getByText('Unit Tests');
    await expect(unitTestButton).toBeVisible();
  });

  test('The e2e test button is displayed', async ({ page }) => {
    const e2eTestButton = page.getByText('End to End Tests');
    await expect(e2eTestButton).toBeVisible();
  });

  test('The accessibility test button is displayed', async ({ page }) => {
    const accessibilityTestButton = page.getByText('Accessibility');
    await expect(accessibilityTestButton).toBeVisible();
  });

});
