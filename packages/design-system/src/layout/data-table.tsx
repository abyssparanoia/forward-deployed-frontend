import * as React from 'react'
import { cn } from '@template/utils'

interface Column<T> {
  key: keyof T
  header: string
  cell?: (value: T[keyof T], row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string
  className?: string
}

export function DataTable<T>({ columns, data, keyExtractor, className }: DataTableProps<T>) {
  return (
    <div className={cn('rounded-md border', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'text-muted-foreground h-12 px-4 text-left font-medium',
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={keyExtractor(row, i)} className="hover:bg-muted/50 border-b transition-colors">
              {columns.map((col) => (
                <td key={String(col.key)} className={cn('p-4', col.className)}>
                  {col.cell ? col.cell(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
