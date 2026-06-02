export { handlers } from './handlers'
export { worker, startMockServiceWorker } from './browser'
// Node server is only accessible via @template/mock/node — not exported here
// to prevent node-only modules (msw/node, @mswjs/interceptors) from being
// bundled in browser builds (Storybook, Vite).
