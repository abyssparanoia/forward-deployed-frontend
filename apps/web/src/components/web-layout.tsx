import { Outlet, useNavigate } from 'react-router'
import { TopNav, Button } from '@template/design-system'
import { useAuth } from '@template/auth'

export function WebLayout() {
  const { isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav
        logo={<span className="text-lg font-bold">Template</span>}
        actions={
          isAuthenticated ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/mypage')}>
                My Page
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await signOut()
                  navigate('/')
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => navigate('/signin')}>
              Sign In
            </Button>
          )
        }
      />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
