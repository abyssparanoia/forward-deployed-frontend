import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  SampleItem,
  SampleList,
  CreateSampleInput,
  UpdateSampleInput,
} from '../schemas/sample'
import { ApiError } from '../errors/api-error'

export const sampleKeys = {
  all: ['samples'] as const,
  lists: () => [...sampleKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...sampleKeys.lists(), params] as const,
  details: () => [...sampleKeys.all, 'detail'] as const,
  detail: (id: string) => [...sampleKeys.details(), id] as const,
}

interface UseSampleListParams {
  page?: number
  perPage?: number
}

type SampleApiClient = {
  listSamples: (params: UseSampleListParams) => Promise<SampleList>
  getSample: (id: string) => Promise<SampleItem>
  createSample: (input: CreateSampleInput) => Promise<SampleItem>
  updateSample: (id: string, input: UpdateSampleInput) => Promise<SampleItem>
  deleteSample: (id: string) => Promise<void>
}

export function createSampleHooks(client: SampleApiClient) {
  function useSampleList(params: UseSampleListParams = {}) {
    return useQuery<SampleList, ApiError>({
      queryKey: sampleKeys.list(params as Record<string, unknown>),
      queryFn: () => client.listSamples(params),
    })
  }

  function useSampleDetail(id: string) {
    return useQuery<SampleItem, ApiError>({
      queryKey: sampleKeys.detail(id),
      queryFn: () => client.getSample(id),
      enabled: !!id,
    })
  }

  function useCreateSample() {
    const qc = useQueryClient()
    return useMutation<SampleItem, ApiError, CreateSampleInput>({
      mutationFn: (input) => client.createSample(input),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: sampleKeys.lists() })
      },
    })
  }

  function useUpdateSample() {
    const qc = useQueryClient()
    return useMutation<SampleItem, ApiError, { id: string; input: UpdateSampleInput }>({
      mutationFn: ({ id, input }) => client.updateSample(id, input),
      onSuccess: (_, { id }) => {
        qc.invalidateQueries({ queryKey: sampleKeys.lists() })
        qc.invalidateQueries({ queryKey: sampleKeys.detail(id) })
      },
    })
  }

  function useDeleteSample() {
    const qc = useQueryClient()
    return useMutation<void, ApiError, string>({
      mutationFn: (id) => client.deleteSample(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: sampleKeys.lists() })
      },
    })
  }

  return { useSampleList, useSampleDetail, useCreateSample, useUpdateSample, useDeleteSample }
}
