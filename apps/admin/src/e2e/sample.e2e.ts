import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/signin')
  await page.getByLabel(/email/i).fill('mock@example.com')
  await page.getByLabel(/password/i).fill('password')
  await page.getByRole('button', { name: /sign in/i }).click()
  await expect(page).toHaveURL(/dashboard/)
})

test('samples list is visible', async ({ page }) => {
  await page.goto('/samples')
  await expect(page.getByRole('heading', { name: /samples/i })).toBeVisible()
})

test('create new sample', async ({ page }) => {
  await page.goto('/samples/new')
  await page.getByLabel(/title/i).fill('E2E Test Sample')
  await page.getByRole('button', { name: /create/i }).click()
  await expect(page).toHaveURL(/\/samples\/\d+/)
})
