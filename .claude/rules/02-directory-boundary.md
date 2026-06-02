# Directory Boundary Rules

Each directory has a clear responsibility. Do not mix responsibilities.

## Rule Map

| Layer              | Location                                 | Responsibility                     |
| ------------------ | ---------------------------------------- | ---------------------------------- |
| UI primitives      | `packages/design-system/src/primitives/` | Atoms (Button, Input, Card…)       |
| UI layout          | `packages/design-system/src/layout/`     | Shells, navigation, tables         |
| UI feedback        | `packages/design-system/src/feedback/`   | Loading, Error, Empty states       |
| Auth               | `packages/auth/`                         | All auth logic                     |
| API types          | `packages/api-client/src/generated/`     | Generated types (DO NOT EDIT)      |
| API schemas        | `packages/api-client/src/schemas/`       | Zod validation schemas             |
| API hooks          | `packages/api-client/src/hooks/`         | TanStack Query hooks               |
| API client         | `packages/api-client/src/http/`          | HTTP client (token injection here) |
| Mock handlers      | `packages/mock/src/handlers/`            | MSW handler definitions            |
| App routing        | `apps/*/src/app.tsx`                     | Route definitions only             |
| App pages          | `apps/*/src/pages/`                      | Composition of features            |
| App features       | `apps/*/src/features/*/pages/`           | Feature-specific pages             |
| Feature hooks      | `apps/*/src/features/*/hooks/`           | Feature-level state/query wrappers |
| Feature components | `apps/*/src/features/*/components/`      | Feature-specific UI                |
| Shared utilities   | `packages/utils/`                        | Pure functions (no React)          |
| Config/env         | `packages/config/`                       | Env vars only                      |

## Rules

1. **Page components** — only compose feature components. No useState for API data. No useEffect for auth.
2. **Feature pages** — may use hooks from `hooks/` and components from `components/`. No direct `fetch()`.
3. **Feature hooks** — wrap `@template/api-client` hooks. Token injection happens in HTTP client setup.
4. **Components** — presentation only. Business logic goes in hooks.
5. **Don't create new shared packages** — unless the component is used 3+ times across different features.
6. **Don't import from `apps/*` inside `packages/*`** — packages must not depend on apps.
7. **Backend submodule** — read-only. Reference docs but never modify.
