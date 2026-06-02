import type { AuthAdapter, AuthSession, SignInInput } from '../types'

export function createCognitoAdapter(): AuthAdapter {
  let currentSession: AuthSession | null = null
  const listeners: Set<(session: AuthSession | null) => void> = new Set()

  function notify(session: AuthSession | null) {
    listeners.forEach((cb) => cb(session))
  }

  async function getCognitoUser(
    email: string,
  ): Promise<import('amazon-cognito-identity-js').CognitoUser> {
    const { CognitoUser, CognitoUserPool } = await import('amazon-cognito-identity-js')
    const { env } = await import('@template/config')
    const pool = new CognitoUserPool({
      UserPoolId: env.VITE_COGNITO_USER_POOL_ID ?? '',
      ClientId: env.VITE_COGNITO_CLIENT_ID ?? '',
    })
    return new CognitoUser({ Username: email, Pool: pool })
  }

  return {
    async signIn({ email, password }: SignInInput): Promise<AuthSession> {
      const { AuthenticationDetails } = await import('amazon-cognito-identity-js')
      const cognitoUser = await getCognitoUser(email)
      const authDetails = new AuthenticationDetails({ Username: email, Password: password })

      return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (result) => {
            const idToken = result.getIdToken().getJwtToken()
            const session: AuthSession = {
              uid: email,
              email,
              displayName: null,
              photoURL: null,
              idToken,
            }
            currentSession = session
            notify(session)
            resolve(session)
          },
          onFailure: reject,
        })
      })
    },

    async signOut(): Promise<void> {
      if (!currentSession) return
      const cognitoUser = await getCognitoUser(currentSession.email ?? '')
      cognitoUser.signOut()
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
}

export const cognitoAuthAdapter = createCognitoAdapter()
