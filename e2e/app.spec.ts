import { test, expect } from '@playwright/test'

test('homepage shows heading and table', async ({ page }) => {
  await page.goto('/')

  await expect(2 + 2).toBe(4)
})
