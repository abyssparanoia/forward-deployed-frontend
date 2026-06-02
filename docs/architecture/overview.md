# Architecture Overview

## Monorepo Structure

```
apps/          ← runnable applications
packages/      ← shared libraries
backend/       ← read-only git submodule (rapid-go BE)
docs/          ← documentation (human-facing)
  guide/       ← designer-level dev guides (ja / en)
  ai/          ← AI request templates for designers
  architecture/← architecture docs
  development/ ← technical setup guides
ai-docs/       ← AI agent reference (not for humans)
.claude/       ← Claude Code rules and skills
.github/       ← CI workflows
scripts/       ← utility scripts
```

## Data Flow

```
User Action
  → Page Component (composition only)
    → Feature Hook (wraps api-client)
      → HttpClient (injects auth token)
        → Real API / MSW Mock
      → TanStack Query (caching, state)
    → Design System (rendering)
```

## Auth Flow

```
App Start
  → AuthProvider (wraps app)
    → createAuthAdapter(env.VITE_AUTH_PROVIDER)
      → firebaseAuthAdapter | cognitoAuthAdapter | mockAuthAdapter
    → onAuthStateChanged (subscribes to auth state)
  → RequireAuth (guards protected routes)
    → redirect to /signin if not authenticated
```

## Package Dependencies

```
apps/*
  → @template/design-system
  → @template/auth
  → @template/api-client
  → @template/mock
  → @template/config
  → @template/utils

packages/auth → @template/config
packages/api-client → @template/auth, @template/config
packages/mock → @template/api-client, @template/config
packages/design-system → @template/utils
```

## Decision Records

See `docs/architecture/decision-records/` for ADRs.
