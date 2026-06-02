# 3. Development Flow

## Overview

```
1. Write a request
2. Hand it to the AI
3. AI implements
4. Run pnpm check
5. Visually review the screen and Storybook
6. Create a PR and merge
```

## 1. Write a Request

Use a request template from `docs/ai/`:

| Template                                                                | When to use                  |
| ----------------------------------------------------------------------- | ---------------------------- |
| [screen-request-template.md](../../ai/screen-request-template.md)       | Add a new screen             |
| [component-request-template.md](../../ai/component-request-template.md) | Add a new shared component   |
| [api-sync-request-template.md](../../ai/api-sync-request-template.md)   | Sync a backend API to the FE |

See [04-screen-request.md](04-screen-request.md) for how to fill in a request.

## 2. Hand it to the AI

Paste the filled-in request into Claude Code or Cursor.

- **Claude Code**: open the `claude` CLI and paste into the chat.
- **Cursor**: open Composer and paste.

## 3. AI Implements

The AI will automatically:

- Create the screen component
- Add routing
- Add Storybook stories
- Add unit tests
- Add MSW mock handlers (if an API is involved)

If errors occur, the AI will investigate and fix them automatically.

## 4. Run `pnpm check`

After implementation, run:

```bash
pnpm check
```

This runs six checks in sequence:

1. Code formatting (Prettier)
2. Code quality (ESLint)
3. Type checking (TypeScript)
4. Unit tests (Vitest)
5. Build (Vite)
6. Forbidden-change guard

If errors appear, tell the AI: "pnpm check showed this error" and ask for a fix.

## 5. Visually Review

Once `pnpm check` passes, open the app and verify:

- The screen displays correctly in mock mode
- Loading, error, and empty states render as expected
- The layout looks correct at mobile screen size
- Storybook stories all render correctly

See [05-storybook.md](05-storybook.md) for how to use Storybook.

## 6. Create a PR

When review is done, ask the AI to create a PR, or go through [06-pr-checklist.md](06-pr-checklist.md) first.
