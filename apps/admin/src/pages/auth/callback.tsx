import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LoadingState } from '@template/design-system'
import { useAuth } from '@template/auth'

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      navigate(isAuthenticated ? '/dashboard' : '/auth/error', { replace: true })
    }
  }, [isLoading, isAuthenticated, navigate])

  return <LoadingState message="Completing sign in..." />
}
