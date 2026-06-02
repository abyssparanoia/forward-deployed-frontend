import { test, expect } from '@playwright/test'

test('signin redirects to dashboard', async ({ page }) => {
  await page.goto('/signin')
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
  await page.getByLabel(/email/i).fill('mock@example.com')
  await page.getByLabel(/password/i).fill('password')
  await page.getByRole('button', { name: /sign in/i }).click()
  await expect(page).toHaveURL(/dashboard/)
})

test('unauthenticated user is redirected to signin', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/signin/)
})
