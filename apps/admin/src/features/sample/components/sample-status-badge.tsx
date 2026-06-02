import { Badge } from '@template/design-system'
import type { SampleItem } from '@template/api-client'

interface SampleStatusBadgeProps {
  status: SampleItem['status']
}

export function SampleStatusBadge({ status }: SampleStatusBadgeProps) {
  const variantMap: Record<SampleItem['status'], 'default' | 'secondary' | 'outline'> = {
    active: 'default',
    draft: 'secondary',
    inactive: 'outline',
  }
  return <Badge variant={variantMap[status]}>{status}</Badge>
}
