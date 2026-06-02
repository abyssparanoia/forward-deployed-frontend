# Local Development Setup

## Prerequisites

- Node.js >= 20
- pnpm >= 9

## First Time Setup

```bash
# Clone the repository
git clone <repo-url>
cd <repo-name>

# Install dependencies
pnpm install

# Create .env.local
cp .env.example .env.local
# Edit .env.local with your values

# Start in mock mode (no backend needed)
VITE_MOCK_API=true pnpm dev:admin
# or
VITE_MOCK_API=true pnpm dev:web
```

## Development Commands

```bash
pnpm dev:admin          # Admin app (http://localhost:3001)
pnpm dev:web            # Web app (http://localhost:3000)
pnpm storybook          # Storybook (http://localhost:6007 admin, 6008 web)
pnpm test               # Run all tests
pnpm typecheck          # TypeScript check
pnpm lint               # ESLint
pnpm format             # Prettier
pnpm check              # Run everything
```

## Auth in Development

With `VITE_MOCK_API=true`:

- Sign in with any email/password
- The mock auth adapter accepts all credentials
- Session is kept in memory (resets on page refresh)

With real auth:

- Set `VITE_AUTH_PROVIDER=firebase` or `VITE_AUTH_PROVIDER=cognito`
- Fill in the corresponding env vars in `.env.local`

## Updating the Backend Submodule

```bash
git submodule update --remote backend/rapid-go
pnpm api:sync
```
