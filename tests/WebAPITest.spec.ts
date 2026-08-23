import { test, expect, request } from '@playwright/test';
import { AppUtils } from '../Utils/AppUtils';

let response: { token: any; };

test.beforeAll(async () => {
    const apiRequest = await request.newContext();
    const appUtils = new AppUtils(apiRequest);
    response = await appUtils.bookEvent();
    console.log(response.token);
});

test('Check booking visibility', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, response.token);

    await page.goto('https://eventhub.rahulshettyacademy.com/bookings');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('button', { name: 'Cancel Booking' }).nth(0)).toBeVisible();

});