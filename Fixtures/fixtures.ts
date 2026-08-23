import { test as base, expect, Page } from '@playwright/test';

export const customTest = base.extend<{ authenticatedPage: Page }>({
    authenticatedPage: async ({ browser }, use) => {
        // Implementation for authenticated page fixture
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://eventhub.rahulshettyacademy.com/');
        await page.getByPlaceholder('you@email.com').fill('qauser5@yopmail.com');
        await page.getByPlaceholder('••••••').fill('Test@12345');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page.locator('h1')).toContainText('Discover & Book');

        // await context.storageState({ path: 'state.json' });

        await use(page);
        await context.close();
    },
});