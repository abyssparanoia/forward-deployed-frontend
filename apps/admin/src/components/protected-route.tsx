import { useNavigate } from 'react-router'
import { RequireAuth } from '@template/auth'
import { LoadingState } from '@template/design-system'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  return (
    <RequireAuth
      loadingFallback={<LoadingState message="Authenticating..." />}
      onUnauthenticated={() => navigate('/signin', { replace: true })}
    >
      {children}
    </RequireAuth>
  )
}
