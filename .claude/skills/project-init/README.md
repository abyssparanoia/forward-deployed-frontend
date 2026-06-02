# Skill: project-init

## Purpose

Initialize this template repository for a specific project.

## When to Use

Run at the very start of a new project, before any feature development.

## Inputs Required

Before starting, gather:

- Project name (used in package names and README)
- App display name
- Backend repository URL (rapid-go based)
- Auth provider: `firebase` or `cognito`
- API base URL

## Steps

1. Run `pnpm project:init` and answer the prompts
2. Fill in `.env.local` with real values (Firebase or Cognito config)
3. Update `README.md` with project-specific information
4. Run `pnpm install`
5. Run `pnpm check` to verify everything works

## Files Modified

- `package.json` (all workspaces) — package name `@template/*` → `@<project-name>/*`
- `README.md` — replace template placeholder with project name
- `.env.local` (created) — fill with real config values
- `backend/rapid-go` (added as submodule)

## Files NOT to Modify

- Any source code files
- CI workflows
- `packages/*/src/` files

## Completion Criteria

- [ ] `pnpm install` succeeds
- [ ] `pnpm dev:admin` starts without errors
- [ ] `pnpm dev:web` starts without errors
- [ ] Auth works (sign in / sign out)
- [ ] `pnpm check` passes

## Verification

```bash
pnpm install
pnpm dev:admin
pnpm dev:web
pnpm check
```
