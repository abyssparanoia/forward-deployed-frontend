import { http, HttpResponse } from 'msw'
import type { Tenant, TenantList } from '@template/api-client'

const BASE_URL = 'http://localhost:8080'

const tenantDb: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Acme Corp',
    created_at: new Date('2024-01-01T00:00:00Z').toISOString(),
    updated_at: new Date('2024-01-01T00:00:00Z').toISOString(),
  },
  {
    id: 'tenant-2',
    name: 'Example Inc',
    created_at: new Date('2024-01-02T00:00:00Z').toISOString(),
    updated_at: new Date('2024-01-02T00:00:00Z').toISOString(),
  },
]

export const tenantHandlers = [
  http.get(`${BASE_URL}/admin/v1/tenants`, () => {
    const response: TenantList = {
      tenants: tenantDb,
    }
    return HttpResponse.json(response)
  }),
]
