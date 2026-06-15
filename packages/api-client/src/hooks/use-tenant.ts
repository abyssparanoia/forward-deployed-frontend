import { useQuery } from '@tanstack/react-query'
import type { Tenant, TenantList } from '../schemas/tenant'
import { ApiError } from '../errors/api-error'

export const tenantKeys = {
  all: ['tenants'] as const,
  lists: () => [...tenantKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...tenantKeys.lists(), params] as const,
}

interface UseTenantListParams {
  page?: number
  limit?: number
}

type TenantApiClient = {
  listTenants: (params: UseTenantListParams) => Promise<TenantList>
}

export function createTenantHooks(client: TenantApiClient) {
  function useTenantList(params: UseTenantListParams = {}) {
    return useQuery<TenantList, ApiError>({
      queryKey: tenantKeys.list(params as Record<string, unknown>),
      queryFn: () => client.listTenants(params),
    })
  }

  return { useTenantList }
}

export type { Tenant, TenantList, UseTenantListParams }
