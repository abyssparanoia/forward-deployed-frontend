import { test, expect } from '@playwright/test'

test('signin navigates to top page', async ({ page }) => {
  await page.goto('/signin')
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
  await page.getByLabel(/email/i).fill('mock@example.com')
  await page.getByLabel(/password/i).fill('password')
  await page.getByRole('button', { name: /sign in/i }).click()
  await expect(page).toHaveURL('/')
})

test('mypage redirects to signin when not authenticated', async ({ page }) => {
  await page.goto('/mypage')
  await expect(page).toHaveURL(/signin/)
})
