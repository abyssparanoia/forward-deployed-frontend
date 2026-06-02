import * as React from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@template/utils'

interface EmptyStateProps {
  title?: string
  message?: string
  action?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = 'No data',
  message = 'Nothing here yet.',
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
      {icon ?? <Inbox className="text-muted-foreground h-12 w-12" />}
      <div className="text-center">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{message}</p>
      </div>
      {action}
    </div>
  )
}
