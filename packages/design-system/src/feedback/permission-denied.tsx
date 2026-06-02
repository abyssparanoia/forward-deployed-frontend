import { ShieldOff } from 'lucide-react'
import { cn } from '@template/utils'

interface PermissionDeniedProps {
  message?: string
  className?: string
}

export function PermissionDenied({
  message = 'You do not have permission to view this page.',
  className,
}: PermissionDeniedProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
      <ShieldOff className="text-muted-foreground h-12 w-12" />
      <p className="text-muted-foreground text-center text-sm">{message}</p>
    </div>
  )
}
