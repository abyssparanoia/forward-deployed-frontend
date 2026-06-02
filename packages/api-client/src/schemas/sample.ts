import { z } from 'zod'

export const sampleItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type SampleItem = z.infer<typeof sampleItemSchema>

export const sampleListSchema = z.object({
  items: z.array(sampleItemSchema),
  total: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export type SampleList = z.infer<typeof sampleListSchema>

export const createSampleInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft']).default('draft'),
})

export type CreateSampleInput = z.infer<typeof createSampleInputSchema>

export const updateSampleInputSchema = createSampleInputSchema.partial()
export type UpdateSampleInput = z.infer<typeof updateSampleInputSchema>
