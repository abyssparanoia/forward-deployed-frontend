# Skill: api-sync

## Purpose

Sync API client code from the backend API document.

## When to Use

- After backend adds a new API endpoint
- After backend changes an API response shape
- When starting a feature that needs new API data

## Inputs Required

Use template at `docs/ai/api-sync-request-template.md`:

- Backend document path (in `backend/rapid-go/`)
- API group or endpoint name
- Target app(s)

## Steps

1. Update backend submodule: `git submodule update --remote backend/rapid-go`
2. Read the API document in `backend/rapid-go/`
3. Run `pnpm api:sync` (or follow manual steps below)
4. Add/update Zod schema in `packages/api-client/src/schemas/`
5. Add/update hook in `packages/api-client/src/hooks/`
6. Update MSW handler in `packages/mock/src/handlers/`
7. Export from `packages/api-client/src/index.ts`
8. Update feature hook in `apps/*/src/features/*/hooks/`
9. Run `pnpm typecheck`

## Files That May Be Modified

- `packages/api-client/src/schemas/`
- `packages/api-client/src/hooks/`
- `packages/api-client/src/generated/` (only via `pnpm api:sync`)
- `packages/mock/src/handlers/`

## Files NOT to Modify

- `packages/api-client/src/generated/` manually
- `backend/rapid-go/` in any way
- Existing schemas (only extend, don't break)

## Completion Criteria

- [ ] New types are typed (no `any`)
- [ ] Mock handler returns correct shape
- [ ] Typecheck passes
- [ ] API errors are normalized via `normalizeApiError`
