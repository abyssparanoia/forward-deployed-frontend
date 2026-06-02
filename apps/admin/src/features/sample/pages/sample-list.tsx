import { useNavigate } from 'react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  PageShell,
  Button,
  DataTable,
  Pagination,
  LoadingState,
  ErrorState,
  EmptyState,
  ConfirmDialog,
} from '@template/design-system'
import { useSampleList, useDeleteSample, type SampleItem } from '../hooks/use-sample-api'
import { SampleStatusBadge } from '../components/sample-status-badge'

export function SampleListPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { data, isLoading, isError, error, refetch } = useSampleList({ page })
  const { mutate: deleteSample, isPending: isDeleting } = useDeleteSample()

  const handleDelete = () => {
    if (!deleteId) return
    deleteSample(deleteId, {
      onSuccess: () => {
        toast.success('Sample deleted')
        setDeleteId(null)
      },
      onError: () => {
        toast.error('Failed to delete sample')
        setDeleteId(null)
      },
    })
  }

  const columns = [
    { key: 'title' as keyof SampleItem, header: 'Title' },
    {
      key: 'status' as keyof SampleItem,
      header: 'Status',
      cell: (value: SampleItem[keyof SampleItem]) => (
        <SampleStatusBadge status={value as SampleItem['status']} />
      ),
    },
    {
      key: 'id' as keyof SampleItem,
      header: 'Actions',
      cell: (_: SampleItem[keyof SampleItem], row: SampleItem) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/samples/${row.id}`)}>
            View
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate(`/samples/${row.id}/edit`)}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setDeleteId(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />

  const totalPages = data ? Math.ceil(data.total / data.perPage) : 1

  return (
    <PageShell
      title="Samples"
      actions={<Button onClick={() => navigate('/samples/new')}>New Sample</Button>}
    >
      {data?.items.length === 0 ? (
        <EmptyState
          title="No samples yet"
          action={<Button onClick={() => navigate('/samples/new')}>Create first sample</Button>}
        />
      ) : (
        <>
          <DataTable columns={columns} data={data?.items ?? []} keyExtractor={(row) => row.id} />
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete sample?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </PageShell>
  )
}
