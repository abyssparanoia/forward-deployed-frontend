import { sampleHandlers } from './sample'
import { authHandlers } from './auth'

export const handlers = [...authHandlers, ...sampleHandlers]
