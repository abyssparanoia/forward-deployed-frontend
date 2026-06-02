import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@template/auth'
import { mockAuthAdapter } from '@template/auth'
import { http, HttpResponse } from 'msw'
import { SampleListPage } from '../pages/sample-list'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const meta: Meta<typeof SampleListPage> = {
  title: 'Sample/SampleListPage',
  component: SampleListPage,
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
type Story = StoryObj<typeof SampleListPage>

export const Default: Story = {}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:8080/api/v1/samples', () =>
          HttpResponse.json({ items: [], total: 0, page: 1, perPage: 10 }),
        ),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:8080/api/v1/samples', async () => {
          await new Promise((resolve) => setTimeout(resolve, 9999999))
          return HttpResponse.json({ items: [], total: 0, page: 1, perPage: 10 })
        }),
      ],
    },
  },
}
