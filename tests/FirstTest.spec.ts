import { test, expect } from '@playwright/test';
import data from '../TestData/data.json';

test('basic test', async ({ page }) => {
    await page.goto(data.url);
    const title = page.title();
    console.log(title);
    await expect(page).toHaveTitle('Google');

});
