# forward-deployed-frontend

FE template monorepo for AI-assisted React/TypeScript development.

Designed for teams where:

- Backend is built with [rapid-go](https://github.com/abyssparanoia/rapid-go)
- Frontend is developed primarily by AI (Claude Code / Cursor) and designers

---

## Purpose

- AI can safely add screens, forms, API clients, and tests
- Designers can request screens in natural language using templates in `docs/ai/`
- CI and rules prevent breaking changes
- Firebase Auth / Cognito Auth are switchable by env var
- Multiple apps share a single monorepo

---

## Project Initialization

When starting a new project from this template:

```bash
pnpm project:init
```

This will ask for:

- Project name
- App display name
- Backend repository URL
- Auth provider (firebase / cognito)
- API base URL

Then fill in `.env.local` with your Firebase or Cognito config.

---

## Backend Submodule

The backend (rapid-go) is added as a git submodule at `backend/rapid-go`.

```bash
# Add backend submodule (done by project:init)
git submodule add <backend_repo_url> backend/rapid-go

# Initialize after cloning this repo
git submodule update --init --recursive

# Update to latest backend
git submodule update --remote backend/rapid-go
```

**The backend submodule is read-only from the FE side. Never edit files inside `backend/`.**

---

## Local Development

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Setup

```bash
pnpm install
cp .env.example .env.local
# Edit .env.local
```

### Start in mock mode (no backend needed)

```bash
VITE_MOCK_API=true pnpm dev:admin   # http://localhost:3001
VITE_MOCK_API=true pnpm dev:web     # http://localhost:3000
```

### Start with real backend

```bash
pnpm dev:admin
pnpm dev:web
```

---

## Env Configuration

Copy `.env.example` to `.env.local` and fill in the values:

```env
VITE_APP_NAME=My App
VITE_APP_ENV=local
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH_PROVIDER=firebase      # or cognito
VITE_MOCK_API=false              # true = no real API needed
```

For Firebase Auth, fill in `VITE_FIREBASE_*` vars.
For Cognito Auth, fill in `VITE_COGNITO_*` vars.

---

## Auth Provider Switch

Switch auth provider with one env var — no code changes needed:

```env
VITE_AUTH_PROVIDER=firebase   # Firebase Auth
VITE_AUTH_PROVIDER=cognito    # Amazon Cognito
```

To develop without any real auth backend:

```env
VITE_MOCK_API=true
```

---

## Creating a New Screen

1. Fill in `docs/ai/screen-request-template.md`
2. Paste it into Claude Code or Cursor
3. AI will create the full feature directory, route, stories, and tests

Example request:

```
App: admin
Route: /products/:id
Screen name: ProductDetailPage
API: GET /api/v1/products/:id
States: loading, error, empty
Mobile: stacked layout
Done: Storybook + unit test + pnpm check passes
```

See `.claude/skills/screen-create/README.md` for the full workflow.

---

## API Sync

When the backend adds or changes an API:

```bash
# 1. Update backend submodule
git submodule update --remote backend/rapid-go

# 2. Sync API client
pnpm api:sync
```

See `.claude/skills/api-sync/README.md` for details.

---

## Storybook

```bash
pnpm storybook           # admin Storybook: http://localhost:6007
```

Storybook covers:

- All design-system components
- Feature components with all states (loading / error / empty / mobile)

---

## Testing

```bash
pnpm test          # Vitest unit tests
pnpm test:e2e      # Playwright E2E (mock mode)
pnpm storybook     # Visual check
```

---

## PR Checklist

Before creating a PR, run:

```bash
pnpm check
```

And go through `.claude/skills/pr-review/README.md`:

- Only related files are modified
- `backend/` is not modified
- Generated code was not manually edited
- Storybook stories added/updated
- Loading / error / empty states handled
- Mobile layout considered
- No new `eslint-disable` or `any` types

---

## AI Request Templates

- New screen → `docs/ai/screen-request-template.md`
- New component → `docs/ai/component-request-template.md`
- API sync → `docs/ai/api-sync-request-template.md`

---

## Common Mistakes

| Mistake                                      | Fix                                   |
| -------------------------------------------- | ------------------------------------- |
| Auth logic in page component                 | Use `useAuth()` from `@template/auth` |
| Direct `fetch()` in component                | Use hooks from `@template/api-client` |
| Editing `backend/rapid-go/`                  | It's read-only. Never edit.           |
| Editing `packages/api-client/src/generated/` | Run `pnpm api:sync` instead           |
| Adding `: any`                               | Use explicit types or `unknown`       |
| Adding `eslint-disable`                      | Fix the root cause                    |
| Deleting tests to fix CI                     | Fix the test or the implementation    |

---

## Do Not

- Edit `backend/rapid-go/` — read-only submodule
- Edit `packages/api-client/src/generated/` manually
- Remove keys from `.env.example`
- Change package manager from pnpm
- Add `eslint-disable` comments
- Add `: any` types
- Delete test files or Storybook stories
- Delete CI workflow files
- Write auth logic directly in page components
- Write `fetch()` directly in page components
- Commit `.env.local` or any secrets

---

## Documentation

- **Designer guide (日本語)**: [docs/guide/ja/01-overview.md](docs/guide/ja/01-overview.md)
- **Designer guide (English)**: [docs/guide/en/01-overview.md](docs/guide/en/01-overview.md)
- **AI agent reference**: [ai-docs/README.md](ai-docs/README.md)

---

## Directory Structure

```
apps/
  admin/          Admin panel (port 3001)
  web/            Public web app (port 3000)
packages/
  api-client/     HTTP client + TanStack Query hooks + Zod schemas
  auth/           Firebase/Cognito/mock auth adapters
  config/         Zod-validated env vars
  design-system/  Shared UI components (shadcn/ui style)
  eslint-config/  Shared ESLint flat config
  mock/           MSW handlers for local/Storybook/Playwright
  tsconfig/       Shared TypeScript configs
  utils/          Shared utilities (cn, format)
backend/
  rapid-go/       Backend git submodule (READ-ONLY)
docs/
  ai/             AI request templates for designers
  architecture/   Architecture docs
  development/    Development guides
  guide/          Designer-level dev guides (ja / en)
ai-docs/          AI agent reference (not for humans)
.claude/
  CLAUDE.md       Claude Code entry point
  rules/          AI behavior rules (00-10)
  skills/         Claude Code skill runbooks
.github/
  workflows/      CI pipelines
scripts/
  project-init.ts     New project initialization
  api-sync.ts         API client sync from backend docs
  guard-forbidden-changes.ts  CI safety checks
```
