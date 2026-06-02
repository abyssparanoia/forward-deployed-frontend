# 2. Local Setup

## Prerequisites

- Node.js 20 or higher
- pnpm 9 or higher

To check if they are installed:

```bash
node -v   # v20.x.x or higher
pnpm -v   # 9.x.x or higher
```

## First-Time Setup

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
```

`.env.local` holds backend configuration. The default values work in mock mode without any changes.

## Start the App (Mock Mode)

You can start the app in **mock mode** — no backend required.

```bash
# Admin panel
VITE_MOCK_API=true pnpm dev:admin

# Public web app
VITE_MOCK_API=true pnpm dev:web
```

Then open in your browser:

- Admin: http://localhost:3001
- Web: http://localhost:3000

In mock mode, any email and password will sign you in.

## Start Storybook

Storybook lets you browse UI components and all their states (loading, error, empty, etc.) in a browser.

```bash
pnpm storybook
```

Open http://localhost:6007.

## Common Commands

| Command          | What it does                                       |
| ---------------- | -------------------------------------------------- |
| `pnpm dev:admin` | Start admin app                                    |
| `pnpm dev:web`   | Start web app                                      |
| `pnpm storybook` | Start Storybook                                    |
| `pnpm check`     | Run all checks (format, lint, types, tests, build) |

For more details, see [docs/development/local-setup.md](../../development/local-setup.md).
