import * as React from 'react'
import { cn } from '@template/utils'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

interface SideNavProps {
  items: NavItem[]
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  onNavigate?: (href: string) => void
}

export function SideNav({ items, header, footer, className, onNavigate }: SideNavProps) {
  return (
    <nav className={cn('flex h-full flex-col', className)}>
      {header && <div className="border-b p-4">{header}</div>}
      <ul className="flex-1 space-y-1 overflow-y-auto p-2">
        {items.map((item) => (
          <li key={item.href}>
            <button
              onClick={() => onNavigate?.(item.href)}
              className={cn(
                'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      {footer && <div className="border-t p-4">{footer}</div>}
    </nav>
  )
}
