# Project Overview

## Purpose

This is a FE template monorepo for AI-assisted development. The primary users are:

- Claude Code / Cursor (AI coding assistants)
- Designers with limited engineering background

## Stack

- React 19 + TypeScript + Vite
- pnpm monorepo + Turborepo
- Tailwind CSS v4 + shadcn/ui style components
- Firebase Auth / Amazon Cognito Auth (env-switchable)
- TanStack Query for API state
- React Hook Form + Zod for forms
- MSW for API mocking
- Vitest + Testing Library + Playwright for testing
- Storybook for UI catalog

## Applications

- `apps/admin`: Admin panel (port 3001)
- `apps/web`: Public web app (port 3000)

## Packages

- `@template/design-system`: UI primitives + composite components
- `@template/auth`: Auth adapters (firebase/cognito/mock)
- `@template/api-client`: HTTP client + TanStack Query hooks + Zod schemas
- `@template/mock`: MSW handlers for local/Storybook/Playwright
- `@template/config`: Zod-validated env vars
- `@template/utils`: Shared utilities (cn, format)
- `@template/tsconfig`: Shared TypeScript configs
- `@template/eslint-config`: Shared ESLint flat config

## Backend

Backend is a rapid-go application added as a git submodule at `backend/rapid-go`.
It contains API documents, Claude rules, and development docs.
**The submodule is read-only from the FE side.**
