import * as React from 'react'
import type { AuthSession, AuthAdapter } from './types'

interface AuthContextValue {
  session: AuthSession | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<AuthSession>
  signOut: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  adapter: AuthAdapter
  children: React.ReactNode
}

export function AuthProvider({ adapter, children }: AuthProviderProps) {
  const [session, setSession] = React.useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = adapter.onAuthStateChanged((s) => {
      setSession(s)
      setIsLoading(false)
    })
    return unsubscribe
  }, [adapter])

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      const s = await adapter.signIn({ email, password })
      return s
    },
    [adapter],
  )

  const signOut = React.useCallback(async () => {
    await adapter.signOut()
  }, [adapter])

  const getIdToken = React.useCallback(async () => {
    return adapter.getIdToken()
  }, [adapter])

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isAuthenticated: session !== null,
        signIn,
        signOut,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
