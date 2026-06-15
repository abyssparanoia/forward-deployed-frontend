import {
  createTenantHooks,
  HttpClient,
  type Tenant,
  type TenantList,
  tenantKeys,
} from '@template/api-client'
import { env } from '@template/config'

export type { Tenant, TenantList }
export { tenantKeys }

const http = new HttpClient(env.VITE_API_BASE_URL)

const tenantHooks = createTenantHooks({
  listTenants: (params) =>
    http.get('/admin/v1/tenants', {
      params: { page: params.page, limit: params.limit },
    }) as Promise<TenantList>,
})

export function setTenantApiTokenGetter(fn: () => Promise<string | null>) {
  http.setTokenGetter(fn)
}

export const { useTenantList } = tenantHooks
