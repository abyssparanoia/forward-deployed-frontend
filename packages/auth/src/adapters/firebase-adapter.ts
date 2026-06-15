import type { AuthAdapter, AuthSession, SignInInput } from '../types'
import { env } from '@template/config'

export function createFirebaseAdapter(): AuthAdapter {
  let firebaseAuth: import('firebase/auth').Auth | null = null
  let emulatorConnected = false

  async function getApp() {
    const { initializeApp, getApps, getApp: _getApp } = await import('firebase/app')
    if (getApps().length > 0) {
      return _getApp()
    }
    return initializeApp({
      apiKey: env.VITE_FIREBASE_API_KEY ?? 'dummy',
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    })
  }

  async function getAuth() {
    if (firebaseAuth) return firebaseAuth
    const app = await getApp()
    const { getAuth: _getAuth } = await import('firebase/auth')
    firebaseAuth = _getAuth(app)
    if (env.VITE_FIREBASE_AUTH_EMULATOR_HOST && !emulatorConnected) {
      const { connectAuthEmulator } = await import('firebase/auth')
      connectAuthEmulator(firebaseAuth, env.VITE_FIREBASE_AUTH_EMULATOR_HOST, {
        disableWarnings: true,
      })
      emulatorConnected = true
    }
    return firebaseAuth
  }

  return {
    async signIn({ email, password }: SignInInput): Promise<AuthSession> {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      const auth = await getAuth()
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const user = cred.user
      const idToken = await user.getIdToken()
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        idToken,
      }
    },

    async signOut(): Promise<void> {
      const { signOut } = await import('firebase/auth')
      const auth = await getAuth()
      await signOut(auth)
    },

    async getCurrentSession(): Promise<AuthSession | null> {
      const auth = await getAuth()
      const user = auth.currentUser
      if (!user) return null
      const idToken = await user.getIdToken()
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        idToken,
      }
    },

    onAuthStateChanged(callback: (session: AuthSession | null) => void): () => void {
      let unsubscribe: (() => void) | null = null

      getAuth().then(async (auth) => {
        const { onAuthStateChanged: _onAuthStateChanged } = await import('firebase/auth')
        unsubscribe = _onAuthStateChanged(auth, async (user) => {
          if (!user) {
            callback(null)
            return
          }
          const idToken = await user.getIdToken()
          callback({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            idToken,
          })
        })
      })

      return () => {
        unsubscribe?.()
      }
    },

    async getIdToken(): Promise<string | null> {
      const auth = await getAuth()
      const user = auth.currentUser
      if (!user) return null
      return user.getIdToken()
    },
  }
}

export const firebaseAuthAdapter = createFirebaseAdapter()
