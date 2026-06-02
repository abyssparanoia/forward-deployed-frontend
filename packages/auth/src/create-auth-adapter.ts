import { isMockMode } from '@template/config'
import type { AuthAdapter, AuthProviderType } from './types'
import { mockAuthAdapter } from './adapters/mock-adapter'
import { firebaseAuthAdapter } from './adapters/firebase-adapter'
import { cognitoAuthAdapter } from './adapters/cognito-adapter'

export function createAuthAdapter(provider: AuthProviderType): AuthAdapter {
  if (isMockMode()) return mockAuthAdapter
  if (provider === 'firebase') return firebaseAuthAdapter
  return cognitoAuthAdapter
}
