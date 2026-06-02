# API Client Rules

## Structure

```
packages/api-client/src/
├── generated/     ← DO NOT EDIT (auto-generated from pnpm api:sync)
├── http/          ← HttpClient, token injection
├── hooks/         ← TanStack Query hooks factories
├── schemas/       ← Zod schemas (source of truth for FE types)
└── errors/        ← ApiError class, normalizer
```

## Rules

1. **Never import `fetch` directly in components or pages** — use hooks from `api-client`.
2. **All API responses go through Zod schemas** when validation is needed.
3. **All API errors go through `normalizeApiError`** before reaching UI.
4. **Token injection** happens in `HttpClient.setTokenGetter()` — not in individual hooks.
5. **Generated types** in `generated/` must not be edited by hand. Run `pnpm api:sync`.
6. **Query key factories** (`*Keys`) keep cache invalidation consistent.
7. **MSW handlers** in `packages/mock/` must use the same URL paths as the real API.

## Adding a New API Endpoint

1. Add/update the Zod schema in `packages/api-client/src/schemas/`
2. Add the hook factory in `packages/api-client/src/hooks/`
3. Add the MSW handler in `packages/mock/src/handlers/`
4. Export from `packages/api-client/src/index.ts`
5. Use in feature hooks in `apps/*/src/features/*/hooks/`

## Error Handling

```ts
// Always catch ApiError specifically
try {
  await mutate(data)
  toast.success('Saved')
} catch (error) {
  if (error instanceof ApiError) {
    toast.error(error.message) // already normalized
  }
}
```
