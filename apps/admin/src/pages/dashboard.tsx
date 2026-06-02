import { PageShell } from '@template/design-system'
import { useAuth } from '@template/auth'

export function DashboardPage() {
  const { session } = useAuth()
  return (
    <PageShell
      title="Dashboard"
      description={`Welcome back, ${session?.displayName ?? session?.email ?? 'Admin'}`}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Total Samples</p>
          <p className="mt-1 text-2xl font-bold">3</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Active</p>
          <p className="mt-1 text-2xl font-bold">1</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Drafts</p>
          <p className="mt-1 text-2xl font-bold">2</p>
        </div>
      </div>
    </PageShell>
  )
}
