export interface SignInInput {
  email: string
  password: string
}

export interface AuthSession {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  idToken: string
}

export interface AuthAdapter {
  signIn(input: SignInInput): Promise<AuthSession>
  signOut(): Promise<void>
  getCurrentSession(): Promise<AuthSession | null>
  onAuthStateChanged(callback: (session: AuthSession | null) => void): () => void
  getIdToken(): Promise<string | null>
}

export type AuthProviderType = 'firebase' | 'cognito'
