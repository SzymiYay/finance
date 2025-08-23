import { test, expect } from '@playwright/test'

test('homepage shows heading and table', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /ETF Momentum/i })
  ).toBeVisible()

  const table = page.locator('#results-table')
  await expect(table).toBeVisible()

  await expect(page.getByRole('cell', { name: 'ETF' })).toBeVisible()
  await expect(
    page.getByRole('cell', { name: '12M Momentum (%)' })
  ).toBeVisible()
})
