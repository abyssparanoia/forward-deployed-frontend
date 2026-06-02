# Testing Rules

## Test Pyramid

1. **Unit tests** (`*.test.ts`, `*.test.tsx`) — Vitest + Testing Library
   - Test hooks and utilities
   - Test component rendering and interactions
   - Use MSW node server for API mocking

2. **Stories** (`*.stories.tsx`) — Storybook
   - Visual check for all component states
   - Use MSW handlers via `msw-storybook-addon`

3. **E2E tests** (`*.e2e.ts`) — Playwright
   - Sign-in flow
   - Protected route redirect
   - Core CRUD flows (in mock mode)

## Rules

1. **Never delete tests** to make CI pass. Fix the implementation.
2. **MSW node server** is started in `src/test-setup.ts` — reuse it.
3. **Don't mock React modules** — use MSW to mock API, not module mocks.
4. **Coverage is not a goal** — meaningful tests are. Don't write trivial snapshot tests.
5. **After adding a component** — add a Storybook story and at least one unit test.

## Setup

```ts
// vitest.config.ts — already configured
// src/test-setup.ts — starts/stops MSW node server

// In a test file:
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
```
