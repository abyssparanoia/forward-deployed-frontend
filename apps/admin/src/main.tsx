import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { AuthProvider, createAuthAdapter } from '@template/auth'
import { env } from '@template/config'
import { setApiTokenGetter } from './features/sample/hooks/use-sample-api'
import { setTenantApiTokenGetter } from './features/tenant'
import { App } from './app'
import '@template/design-system/styles'

async function prepare() {
  if (env.VITE_MOCK_API) {
    const { startMockServiceWorker } = await import('@template/mock/browser')
    await startMockServiceWorker()
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

const authAdapter = createAuthAdapter(env.VITE_AUTH_PROVIDER)
setApiTokenGetter(() => authAdapter.getIdToken())
setTenantApiTokenGetter(() => authAdapter.getIdToken())

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider adapter={authAdapter}>
          <BrowserRouter>
            <App />
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
})
