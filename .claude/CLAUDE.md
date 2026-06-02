# Claude Code Instructions

This repository is a **FE template monorepo** for AI-assisted React/TypeScript development.

## Quick Reference

- Docs: `docs/`
- Designer guide (ja/en): `docs/guide/`
- AI agent reference: `ai-docs/`
- AI rules: `.claude/rules/`
- Skills: `.claude/skills/`
- Apps: `apps/admin/`, `apps/web/`
- Shared packages: `packages/`
- Backend submodule (read-only): `backend/rapid-go/`

## Before You Start

1. Read the relevant rule files in `.claude/rules/`
2. Check `docs/architecture/` for architectural decisions
3. Use skills in `.claude/skills/` for common tasks

## Key Principles

- Pages do composition only — no API calls, no auth logic
- Auth via `useAuth()` / `RequireAuth` from `@template/auth`
- API via hooks in `packages/api-client`
- UI via `@template/design-system`
- `any` type is forbidden
- `backend/rapid-go` is read-only
- Run `pnpm check` after every significant change

## Common Commands

```bash
pnpm dev:admin          # Start admin app
pnpm dev:web            # Start web app
pnpm storybook          # Start Storybook
pnpm check              # Full check (format + lint + typecheck + test + build + guard)
pnpm project:init       # Initialize for a new project
pnpm api:sync           # Sync API client from backend docs
```
