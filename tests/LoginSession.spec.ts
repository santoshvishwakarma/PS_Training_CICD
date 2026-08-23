import { test, expect, request, BrowserContext } from '@playwright/test';
import { AppUtils } from '../Utils/AppUtils';

let webcontext: BrowserContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com/');
    await page.getByPlaceholder('you@email.com').fill('qauser5@yopmail.com');
    await page.getByPlaceholder('••••••').fill('Test@12345');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('h1')).toContainText('Discover & Book');

    await context.storageState({ path: 'state.json' });
    webcontext = await browser.newContext({ storageState: 'state.json' });
});

test('Check booking visibility', async ({ }) => {
    const page = await webcontext.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com/bookings');
    await expect(page.getByRole('button', { name: 'Cancel Booking' }).nth(0)).toBeVisible();
});
