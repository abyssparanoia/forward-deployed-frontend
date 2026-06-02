import {
  createSampleHooks,
  HttpClient,
  type SampleItem,
  type SampleList,
  type CreateSampleInput,
  type UpdateSampleInput,
  sampleKeys,
} from '@template/api-client'
import { env } from '@template/config'

export type { SampleItem, SampleList, CreateSampleInput, UpdateSampleInput }
export { sampleKeys }

const http = new HttpClient(env.VITE_API_BASE_URL)

const sampleHooks = createSampleHooks({
  listSamples: (params) =>
    http.get('/api/v1/samples', {
      params: { page: params.page, perPage: params.perPage },
    }) as Promise<SampleList>,
  getSample: (id) => http.get(`/api/v1/samples/${id}`) as Promise<SampleItem>,
  createSample: (input) => http.post('/api/v1/samples', input) as Promise<SampleItem>,
  updateSample: (id, input) => http.put(`/api/v1/samples/${id}`, input) as Promise<SampleItem>,
  deleteSample: (id) => http.delete(`/api/v1/samples/${id}`) as Promise<void>,
})

export function setApiTokenGetter(fn: () => Promise<string | null>) {
  http.setTokenGetter(fn)
}

export const { useSampleList, useCreateSample, useUpdateSample, useDeleteSample } = sampleHooks

export function useSampleDetail(id: string, options?: { enabled?: boolean }) {
  // The underlying hook skips the query when id is empty (enabled: !!id).
  // We additionally respect the caller-supplied enabled flag by clearing the id
  // when disabled, which keeps a single call site without hook-count violations.
  const effectiveId = options?.enabled === false ? '' : id
  return sampleHooks.useSampleDetail(effectiveId)
}
