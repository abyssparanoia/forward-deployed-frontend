# Auth Rules

## Golden Rule

**Auth logic never goes in page components.**

## Usage Pattern

```tsx
// Correct
import { useAuth, RequireAuth } from '@template/auth'

function MyPage() {
  const { session, signOut } = useAuth()
  // ...
}

// Wrong — never do this
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
function MyPage() {
  // direct firebase call in a page
}
```

## Auth Flow

1. `main.tsx` creates `authAdapter` via `createAuthAdapter(env.VITE_AUTH_PROVIDER)`
2. `AuthProvider` wraps the app and subscribes to auth state
3. `RequireAuth` guards protected routes — redirects to `/signin` when unauthenticated
4. `useAuth()` provides `{ session, isAuthenticated, isLoading, signIn, signOut, getIdToken }`

## Switching Auth Provider

Only change `VITE_AUTH_PROVIDER` in `.env.local`. The app code doesn't change.

```env
VITE_AUTH_PROVIDER=firebase   # or cognito
```

## Mock Mode

When `VITE_MOCK_API=true`, `createAuthAdapter` returns `mockAuthAdapter` which works without any real auth backend.

## Token Injection

Auth tokens are injected into HTTP requests via `HttpClient.setTokenGetter(adapter.getIdToken)`.
This is set up in the app's provider setup, not in individual components.
