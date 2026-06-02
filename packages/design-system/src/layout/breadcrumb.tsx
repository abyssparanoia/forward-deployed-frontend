import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@template/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  onNavigate?: (href: string) => void
}

export function Breadcrumb({ items, className, onNavigate }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="text-muted-foreground h-4 w-4" />}
          {item.href && index < items.length - 1 ? (
            <button
              onClick={() => item.href && onNavigate?.(item.href)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
