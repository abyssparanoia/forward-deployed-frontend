import { useNavigate } from 'react-router'
import { ErrorState } from '@template/design-system'

export function AuthErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ErrorState
        title="Authentication Error"
        message="Sign in failed. Please try again."
        onRetry={() => navigate('/signin')}
      />
    </div>
  )
}
