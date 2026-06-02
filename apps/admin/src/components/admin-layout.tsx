import { Outlet, useNavigate, useLocation } from 'react-router'
import { LayoutDashboard, List, LogOut } from 'lucide-react'
import { AppShell, SideNav, TopNav, Button } from '@template/design-system'
import { useAuth } from '@template/auth'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Samples', href: '/samples', icon: <List size={16} /> },
]

export function AdminLayout() {
  const { signOut, session } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  const itemsWithActive = navItems.map((item) => ({
    ...item,
    active: location.pathname.startsWith(item.href),
  }))

  return (
    <AppShell
      sidebar={
        <SideNav
          items={itemsWithActive}
          onNavigate={(href) => navigate(href)}
          header={<span className="text-sm font-semibold">Admin</span>}
        />
      }
      header={
        <TopNav
          actions={
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">{session?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut size={16} className="mr-1" />
                Sign out
              </Button>
            </div>
          }
        />
      }
    >
      <Outlet />
    </AppShell>
  )
}
