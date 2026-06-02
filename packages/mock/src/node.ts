import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

export function startMockServer(): void {
  server.listen({ onUnhandledRequest: 'bypass' })
}

export function resetMockServer(): void {
  server.resetHandlers()
}

export function stopMockServer(): void {
  server.close()
}
