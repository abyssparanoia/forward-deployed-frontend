import * as React from 'react'
import { Label } from '../primitives/label'
import { cn } from '@template/utils'

interface FormFieldProps {
  label?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  htmlFor?: string
  hint?: string
}

export function FormField({
  label,
  error,
  required,
  className,
  children,
  htmlFor,
  hint,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {hint && !error && <p className="text-muted-foreground text-xs">{hint}</p>}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  )
}
