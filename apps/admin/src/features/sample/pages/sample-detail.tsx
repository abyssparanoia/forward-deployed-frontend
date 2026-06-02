import { useParams, useNavigate } from 'react-router'
import {
  PageShell,
  Button,
  Card,
  CardContent,
  Breadcrumb,
  LoadingState,
  ErrorState,
} from '@template/design-system'
import { useSampleDetail } from '../hooks/use-sample-api'
import { SampleStatusBadge } from '../components/sample-status-badge'
import { formatDateTime } from '@template/utils'

export function SampleDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useSampleDetail(id)

  if (isLoading) return <LoadingState />
  if (isError || !data)
    return <ErrorState message={error?.message ?? 'Not found'} onRetry={refetch} />

  return (
    <PageShell
      title={data.title}
      actions={<Button onClick={() => navigate(`/samples/${id}/edit`)}>Edit</Button>}
    >
      <Breadcrumb
        items={[{ label: 'Samples', href: '/samples' }, { label: data.title }]}
        onNavigate={navigate}
        className="mb-4"
      />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <p className="text-muted-foreground text-sm">Status</p>
            <div className="mt-1">
              <SampleStatusBadge status={data.status} />
            </div>
          </div>
          {data.description && (
            <div>
              <p className="text-muted-foreground text-sm">Description</p>
              <p className="mt-1">{data.description}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground text-sm">Created</p>
            <p className="mt-1 text-sm">{formatDateTime(data.createdAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Updated</p>
            <p className="mt-1 text-sm">{formatDateTime(data.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
