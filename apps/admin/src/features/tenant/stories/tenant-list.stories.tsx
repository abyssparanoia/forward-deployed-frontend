import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@template/auth'
import { mockAuthAdapter } from '@template/auth'
import { http, HttpResponse } from 'msw'
import { TenantListPage } from '../pages/tenant-list'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const meta: Meta<typeof TenantListPage> = {
  title: 'Tenant/TenantListPage',
  component: TenantListPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthProvider adapter={mockAuthAdapter}>
          <BrowserRouter>
            <div className="p-6">
              <Story />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof TenantListPage>

export const Default: Story = {}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:8080/admin/v1/tenants', () =>
          HttpResponse.json({ tenants: [] }),
        ),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:8080/admin/v1/tenants', async () => {
          await new Promise((resolve) => setTimeout(resolve, 9999999))
          return HttpResponse.json({ tenants: [] })
        }),
      ],
    },
  },
}

export const WithData: Story = {
  parameters: {
    msw: {
      handlers: [
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
      ],
    },
  },
}
