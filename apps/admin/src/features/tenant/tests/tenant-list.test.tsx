import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@template/auth'
import { mockAuthAdapter } from '@template/auth'
import { server } from '@template/mock/node'
import { http, HttpResponse } from 'msw'
import { TenantListPage } from '../pages/tenant-list'

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider adapter={mockAuthAdapter}>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

describe('TenantListPage', () => {
  it('renders empty state when no tenants', async () => {
    server.use(
      http.get('http://localhost:8080/admin/v1/tenants', () => HttpResponse.json({ tenants: [] })),
    )
    render(<TenantListPage />, { wrapper })
    await waitFor(() => {
      expect(screen.getByText('No tenants yet')).toBeInTheDocument()
    })
  })

  it('renders tenant names when data is returned', async () => {
    server.use(
      http.get('http://localhost:8080/admin/v1/tenants', () =>
        HttpResponse.json({
          tenants: [
            {
              id: 'tenant-1',
              name: 'Acme Corp',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          ],
        }),
      ),
    )
    render(<TenantListPage />, { wrapper })
    await waitFor(() => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    })
  })
})
