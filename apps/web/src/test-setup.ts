import { beforeAll, afterAll, afterEach } from 'vitest'
import { startMockServer, stopMockServer, resetMockServer } from '@template/mock/node'

beforeAll(() => startMockServer())
afterEach(() => resetMockServer())
afterAll(() => stopMockServer())
