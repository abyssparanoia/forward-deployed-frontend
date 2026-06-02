import { describe, it, expect, beforeEach } from 'vitest'
import type { AuthSession } from '../types'
import { mockAuthAdapter } from './mock-adapter'

describe('mockAuthAdapter', () => {
  beforeEach(async () => {
    await mockAuthAdapter.signOut()
  })

  it('returns null session initially', async () => {
    const session = await mockAuthAdapter.getCurrentSession()
    expect(session).toBeNull()
  })

  it('signs in and returns session', async () => {
    const session = await mockAuthAdapter.signIn({ email: 'test@example.com', password: 'pass' })
    expect(session.email).toBe('test@example.com')
    expect(session.idToken).toBe('mock-id-token')
  })

  it('signs out and clears session', async () => {
    await mockAuthAdapter.signIn({ email: 'test@example.com', password: 'pass' })
    await mockAuthAdapter.signOut()
    const session = await mockAuthAdapter.getCurrentSession()
    expect(session).toBeNull()
  })

  it('notifies listeners on auth state change', async () => {
    const calls: (AuthSession | null)[] = []
    const unsubscribe = mockAuthAdapter.onAuthStateChanged((s) => calls.push(s))
    await mockAuthAdapter.signIn({ email: 'test@example.com', password: 'pass' })
    await mockAuthAdapter.signOut()
    unsubscribe()
    expect(calls.length).toBeGreaterThanOrEqual(2)
  })
})
