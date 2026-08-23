import { test, expect, request, Page } from '@playwright/test';
import { AppUtils } from '../Utils/AppUtils';
import { customTest } from '../Fixtures/fixtures';

customTest("fixture demo", async ({ authenticatedPage }) => {
    authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/bookings');
    await expect(authenticatedPage.getByRole('button', { name: 'Cancel Booking' }).nth(0)).toBeVisible();
});
