import type { AuthAdapter, AuthSession, SignInInput } from '../types'

const SESSION_STORAGE_KEY = 'mock_auth_session'

const MOCK_USER: AuthSession = {
  uid: 'mock-uid-001',
  email: 'mock@example.com',
  displayName: 'Mock User',
  photoURL: null,
  idToken: 'mock-id-token',
}

function loadSession(): AuthSession | null {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as AuthSession) : null
  } catch {
    return null
  }
}

function saveSession(session: AuthSession | null) {
  try {
    if (session) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
    }
  } catch {
    // sessionStorage not available (non-DOM environment)
  }
}

let currentSession: AuthSession | null = null
const listeners: Set<(session: AuthSession | null) => void> = new Set()

function notify(session: AuthSession | null) {
  listeners.forEach((cb) => cb(session))
}

export const mockAuthAdapter: AuthAdapter = {
  async signIn({ email }: SignInInput): Promise<AuthSession> {
    const session = { ...MOCK_USER, email }
    currentSession = session
    saveSession(session)
    notify(session)
    return session
  },

  async signOut(): Promise<void> {
    currentSession = null
    saveSession(null)
    notify(null)
  },

  async getCurrentSession(): Promise<AuthSession | null> {
    if (!currentSession) {
      currentSession = loadSession()
    }
    return currentSession
  },

  onAuthStateChanged(callback: (session: AuthSession | null) => void): () => void {
    if (!currentSession) {
      currentSession = loadSession()
    }
    listeners.add(callback)
    callback(currentSession)
    return () => {
      listeners.delete(callback)
    }
  },

  async getIdToken(): Promise<string | null> {
    if (!currentSession) {
      currentSession = loadSession()
    }
    return currentSession?.idToken ?? null
  },
}
