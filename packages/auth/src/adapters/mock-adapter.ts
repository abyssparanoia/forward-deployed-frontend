import type { AuthAdapter, AuthSession, SignInInput } from '../types'

const MOCK_USER: AuthSession = {
  uid: 'mock-uid-001',
  email: 'mock@example.com',
  displayName: 'Mock User',
  photoURL: null,
  idToken: 'mock-id-token',
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
    notify(session)
    return session
  },

  async signOut(): Promise<void> {
    currentSession = null
    notify(null)
  },

  async getCurrentSession(): Promise<AuthSession | null> {
    return currentSession
  },

  onAuthStateChanged(callback: (session: AuthSession | null) => void): () => void {
    listeners.add(callback)
    callback(currentSession)
    return () => {
      listeners.delete(callback)
    }
  },

  async getIdToken(): Promise<string | null> {
    return currentSession?.idToken ?? null
  },
}
