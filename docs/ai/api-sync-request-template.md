# API Sync Request Template

## Target

- Backend document path: (e.g. `backend/rapid-go/docs/api/products.md`)
- API group: (e.g. `Products`)
- Target app: (admin / web / both)

## Required Output

- [ ] TypeScript types
- [ ] API client wrapper
- [ ] TanStack Query hooks
- [ ] MSW mock handler
- [ ] Contract test (basic shape validation)

## Done Criteria

- [ ] Mock data matches real API shape
- [ ] `pnpm typecheck` passes
- [ ] API errors use `normalizeApiError`
- [ ] No `any` types in generated/written code
