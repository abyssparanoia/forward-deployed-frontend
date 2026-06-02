import * as React from 'react'
import { cn } from '@template/utils'

interface AppShellProps {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function AppShell({ sidebar, header, children, className }: AppShellProps) {
  return (
    <div className={cn('flex h-screen overflow-hidden', className)}>
      {sidebar && (
        <aside className="hidden w-64 flex-shrink-0 border-r md:flex md:flex-col">{sidebar}</aside>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        {header && <header className="border-b">{header}</header>}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
