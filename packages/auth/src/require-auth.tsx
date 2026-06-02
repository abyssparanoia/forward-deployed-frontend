import * as React from 'react'
import { useAuth } from './context'

interface RequireAuthProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  loadingFallback?: React.ReactNode
  onUnauthenticated?: () => void
}

export function RequireAuth({
  children,
  fallback,
  loadingFallback,
  onUnauthenticated,
}: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth()

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      onUnauthenticated?.()
    }
  }, [isLoading, isAuthenticated, onUnauthenticated])

  if (isLoading) {
    return <>{loadingFallback ?? <div>Loading...</div>}</>
  }

  if (!isAuthenticated) {
    return <>{fallback ?? null}</>
  }

  return <>{children}</>
}
