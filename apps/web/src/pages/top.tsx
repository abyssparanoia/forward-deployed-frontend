import { useNavigate } from 'react-router'
import { Button } from '@template/design-system'
import { useAuth } from '@template/auth'

export function TopPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
      <p className="text-muted-foreground mt-4 text-lg">This is the template web application.</p>
      <div className="mt-8 flex justify-center gap-4">
        {isAuthenticated ? (
          <Button onClick={() => navigate('/mypage')}>Go to My Page</Button>
        ) : (
          <Button onClick={() => navigate('/signin')}>Get Started</Button>
        )}
      </div>
    </div>
  )
}
