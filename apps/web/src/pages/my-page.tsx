import { useAuth } from '@template/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@template/design-system'

export function MyPage() {
  const { session } = useAuth()

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="font-medium">{session?.email ?? '-'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Display Name</p>
            <p className="font-medium">{session?.displayName ?? '-'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">User ID</p>
            <p className="text-muted-foreground font-mono text-sm">{session?.uid ?? '-'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
