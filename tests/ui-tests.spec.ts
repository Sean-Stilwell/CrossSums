import { test, expect } from '@playwright/test'
 
test('should load the game on landing page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/CrossSums/en')
  // The page should contain an h1 with "Cross Sums"
  await expect(page.locator('h1')).toContainText('Cross Sums')
  // The page should contain a button with "New Game"
  await expect(page.locator('text=New Game')).toBeVisible()
  // The page should contain a button with "Help"
  await expect(page.locator('text=Help')).toBeVisible()
})

test('language toggle between en => fr should work', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/CrossSums/en')
  // Click on the language button
  await page.click('a:text("FR")')
  // The page should contain an h1 with "Sommes croisées"
  await expect(page.locator('h1')).toContainText('Sommes croisées')
  // The page should contain a button with "Nouveau Jeu"
  await expect(page.locator('text=Nouveau Jeu')).toBeVisible()
  // The page should contain a button with "Aide"
  await expect(page.locator('text=Aide')).toBeVisible()
})

test('language toggle from fr => en should work', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/CrossSums/fr')
  // Click on the language button
  await page.click('a:text("EN")')
  // The page should contain an h1 with "Cross Sums"
  await expect(page.locator('h1')).toContainText('Cross Sums')
  // The page should contain a button with "New Game"
  await expect(page.locator('text=New Game')).toBeVisible()
  // The page should contain a button with "Help"
  await expect(page.locator('text=Help')).toBeVisible()
})

test('help modal should open and close', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/CrossSums/en')
  // The modal should not be visible
  await expect(page.locator('text=Cross Sums is a logic puzzle.')).not.toBeVisible()
  // Click on the help button
  await page.click('button:text("Help")')
  // The modal should be visible
  await expect(page.locator('text=Cross Sums is a logic puzzle.')).toBeVisible()
  // Click anywhere on the screen outside the modal
  const modalBox = await page.locator('text=Cross Sums is a logic puzzle.').boundingBox();
  if (modalBox) {
    await page.mouse.click(modalBox.x - 50, modalBox.y - 50); // Click slightly outside the modal's top-left corner
  }
  // The modal should not be visible
  await expect(page.locator('text=Cross Sums is a logic puzzle.')).not.toBeVisible()
})