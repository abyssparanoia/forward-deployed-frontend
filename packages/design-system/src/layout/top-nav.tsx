import * as React from 'react'
import { cn } from '@template/utils'

interface TopNavProps {
  logo?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function TopNav({ logo, actions, className }: TopNavProps) {
  return (
    <nav className={cn('flex h-14 items-center justify-between px-4', className)}>
      <div className="flex items-center gap-4">{logo}</div>
      <div className="flex items-center gap-2">{actions}</div>
    </nav>
  )
}
