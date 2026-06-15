import { z } from 'zod'

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Tenant = z.infer<typeof tenantSchema>

export const tenantListSchema = z.object({
  tenants: z.array(tenantSchema),
  pagination: z
    .object({
      totalCount: z.number().optional(),
      pageSize: z.number().optional(),
      nextPageToken: z.string().optional(),
    })
    .optional(),
})

export type TenantList = z.infer<typeof tenantListSchema>
