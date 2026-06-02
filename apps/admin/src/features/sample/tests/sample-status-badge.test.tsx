import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SampleStatusBadge } from '../components/sample-status-badge'

describe('SampleStatusBadge', () => {
  it('renders active status', () => {
    render(<SampleStatusBadge status="active" />)
    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('renders draft status', () => {
    render(<SampleStatusBadge status="draft" />)
    expect(screen.getByText('draft')).toBeInTheDocument()
  })

  it('renders inactive status', () => {
    render(<SampleStatusBadge status="inactive" />)
    expect(screen.getByText('inactive')).toBeInTheDocument()
  })
})
