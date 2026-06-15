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

## Backend Setup (rapid-go)

The backend is included as a Git submodule at `backend/rapid-go`.

### Prerequisites

- Go 1.22+
- Docker and Docker Compose
- direnv

### 1. Configure Environment

```bash
cd backend/rapid-go
cp .envrc.tmpl .envrc
direnv allow
```

### 2. Start Docker Services

```bash
docker-compose up -d
```

This starts MySQL, the Firebase Auth Emulator (port 9099), and other required services.

### 3. Run Database Migrations

```bash
make migrate.up
```

### 4. Start the Server

```bash
# Firebase build (GCP auth)
go run -tags=gcp ./cmd/app http-server run   # :8080
```

### 5. Create the Initial Admin User

In a separate terminal:

```bash
cd backend/rapid-go
go run -tags=gcp ./cmd/app task create-root-admin -e admin@example.com -d "Root Admin"
# → Prints the generated password — save it for signing in
```

### FE .env.local for Local Backend

```env
VITE_AUTH_PROVIDER=firebase
VITE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:8080
VITE_FIREBASE_PROJECT_ID=sample
VITE_FIREBASE_API_KEY=sample
VITE_FIREBASE_AUTH_DOMAIN=localhost
VITE_FIREBASE_APP_ID=sample
VITE_FIREBASE_AUTH_EMULATOR_HOST=http://localhost:9099
```

For detailed backend documentation, see [`backend/rapid-go/docs/development-setup/README.md`](../../backend/rapid-go/docs/development-setup/README.md).

## Updating the Backend Submodule

```bash
git submodule update --remote backend/rapid-go
pnpm api:sync
```
