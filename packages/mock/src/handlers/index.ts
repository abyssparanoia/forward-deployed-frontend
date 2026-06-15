import { sampleHandlers } from './sample'
import { authHandlers } from './auth'
import { tenantHandlers } from './tenant'

export const handlers = [...authHandlers, ...sampleHandlers, ...tenantHandlers]
