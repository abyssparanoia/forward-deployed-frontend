# Conventions Reference

Quick-reference summary of the key conventions enforced in this repository. Follow the linked `.claude/rules/` files for full details.

---

## Directory Boundaries

| Layer              | Location                                            | Rule                                                          |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------- |
| Page components    | `apps/*/src/pages/`, `apps/*/src/features/*/pages/` | Composition only — no `useState` for API data, no direct auth |
| Feature hooks      | `apps/*/src/features/*/hooks/`                      | Wrap `@template/api-client` hooks                             |
| Feature components | `apps/*/src/features/*/components/`                 | Presentation only                                             |
| UI primitives      | `packages/design-system/src/primitives/`            | Atoms (Button, Input, Card…)                                  |
| Auth               | `packages/auth/`                                    | All auth logic lives here                                     |
| API types          | `packages/api-client/src/generated/`                | DO NOT EDIT manually                                          |
| API schemas        | `packages/api-client/src/schemas/`                  | Zod schemas (source of truth for FE types)                    |
| API hooks          | `packages/api-client/src/hooks/`                    | TanStack Query hooks                                          |
| Mock handlers      | `packages/mock/src/handlers/`                       | MSW handler definitions                                       |

Full reference: `.claude/rules/02-directory-boundary.md`

---

## Required UI States

Every data-displaying component must handle all four states:

| State   | Component                          |
| ------- | ---------------------------------- |
| Loading | `<LoadingState />` or skeleton     |
| Error   | `<ErrorState onRetry={refetch} />` |
| Empty   | `<EmptyState />`                   |
| Success | Actual content                     |

Permission-guarded screens also need: `<PermissionDenied />`.

Full reference: `.claude/rules/03-ui-implementation.md`

---

## Naming Conventions

| Item                | Convention       | Example                         |
| ------------------- | ---------------- | ------------------------------- |
| Feature directories | `kebab-case`     | `product-detail/`               |
| Component files     | `PascalCase.tsx` | `ProductDetailPage.tsx`         |
| Hook files          | `use-*.ts`       | `use-product-detail.ts`         |
| Story files         | `*.stories.tsx`  | `ProductDetailPage.stories.tsx` |
| Test files          | `*.test.ts(x)`   | `use-product-detail.test.ts`    |
| Schema files        | `*-schema.ts`    | `product-schema.ts`             |

---

## Type and Lint Constraints

| Constraint                     | Rule                                                    |
| ------------------------------ | ------------------------------------------------------- |
| `: any` type                   | Forbidden — use explicit types, `unknown`, or generics  |
| `eslint-disable` comments      | Forbidden — fix the root cause                          |
| Direct `fetch()` in components | Forbidden — use `@template/api-client` hooks            |
| Auth SDK calls in pages        | Forbidden — use `useAuth()` only                        |
| Inline styles                  | Forbidden — Tailwind classes only                       |
| Hardcoded color values         | Forbidden — use CSS variables (`text-foreground`, etc.) |

Full reference: `.claude/rules/01-ai-safety.md`, `10-forbidden-changes.md`

---

## Styling

- Tailwind CSS classes only — no inline styles, no CSS modules.
- Use `cn()` from `@template/utils` for conditional classes.
- CSS variables for colors: `text-foreground`, `bg-background`, etc.
- Mobile-first: default styles target mobile, use `md:` / `lg:` prefixes for larger screens.
- Test at 375px (mobile), 768px (tablet), 1280px (desktop).

Full reference: `.claude/rules/03-ui-implementation.md`

---

## Auth Pattern

```tsx
// Correct
import { useAuth, RequireAuth } from '@template/auth'
const { session, signOut } = useAuth()

// Wrong — never call auth SDK directly in a page
import { getAuth } from 'firebase/auth'
```

Full reference: `.claude/rules/05-auth.md`

---

## API Pattern

```tsx
// Correct — use a hook from api-client
const { data, isLoading, error } = useProductQuery(id)

// Wrong — never call fetch() directly in a component
const res = await fetch('/api/v1/products')
```

Full reference: `.claude/rules/04-api-client.md`

---

## Forbidden File Changes (enforced by CI)

`pnpm guard:forbidden-changes` detects these automatically and CI will fail:

| Change                                               | Reason                               |
| ---------------------------------------------------- | ------------------------------------ |
| `backend/rapid-go/` modified                         | Read-only submodule                  |
| `packages/api-client/src/generated/` manually edited | Auto-generated — run `pnpm api:sync` |
| Keys removed from `.env.example`                     | Breaks other developers' setup       |
| Package manager changed from pnpm                    | CI and lockfile depend on pnpm       |
| `eslint-disable` comments added                      | Hides root-cause errors              |
| `: any` types added                                  | Breaks type safety                   |
| Test files deleted                                   | Reduces coverage                     |
| Storybook story files deleted                        | Removes visual regression coverage   |
| CI workflow files deleted                            | Removes safety checks                |

Full reference: `.claude/rules/10-forbidden-changes.md`
