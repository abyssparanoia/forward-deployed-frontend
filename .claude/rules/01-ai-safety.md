# AI Safety Rules

These rules exist to prevent AI from making breaking changes.

## MUST NOT DO

1. **Do not modify unrelated files** — Only touch files relevant to the requested change.
2. **Do not refactor without being asked** — If you see improvement opportunities, note them but don't change.
3. **Do not change existing API types** — Types in `packages/api-client/src/generated/` and schemas are contracts.
4. **Do not write auth logic in page components** — Auth belongs in `packages/auth`. Pages use `useAuth()`.
5. **Do not write API requests in page components** — Pages use hooks. Requests belong in `packages/api-client`.
6. **Do not change environment variable names** — Env vars are used in deployment configs outside this repo.
7. **Do not bypass `@template/design-system`** — Always use design-system components. Never re-implement primitives.
8. **Do not use `any` type** — Use explicit types, `unknown`, or generics. ESLint will catch this.
9. **Do not add `eslint-disable` comments** — Fix the underlying issue instead.
10. **Do not delete tests to make them pass** — Fix the test or the implementation.
11. **Do not update snapshots without explicit instruction** — Snapshot changes may hide regressions.
12. **Do not edit `backend/rapid-go/` in any way** — It is a read-only submodule.
13. **Do not manually edit `packages/api-client/src/generated/`** — Use `pnpm api:sync` to regenerate.
14. **Do not change the package manager from pnpm** — CI and lockfile depend on pnpm.
15. **Do not implement auth/billing/permissions without following existing patterns** — These are security-critical.
16. **For large changes: create a plan first** — Write the plan, get confirmation, then implement.

## SHOULD DO

- Run `pnpm check` after every significant change
- Add Storybook stories when adding components
- Add tests for new hooks and utilities
- Handle loading / error / empty states in all data-fetching components
- Consider mobile layout (responsive) for all UI changes
