import { PageShell, DataTable, LoadingState, ErrorState, EmptyState } from '@template/design-system'
import { useTenantList, type Tenant } from '../hooks/use-tenant-api'

const columns = [
  { key: 'name' as keyof Tenant, header: 'Name' },
  { key: 'id' as keyof Tenant, header: 'ID' },
  { key: 'created_at' as keyof Tenant, header: 'Created At' },
]

export function TenantListPage() {
  const { data, isLoading, isError, error, refetch } = useTenantList()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />

  return (
    <PageShell title="Tenants">
      {!data || data.tenants.length === 0 ? (
        <EmptyState title="No tenants yet" />
      ) : (
        <DataTable columns={columns} data={data.tenants} keyExtractor={(row) => row.id} />
      )}
    </PageShell>
  )
}
