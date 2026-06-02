import { useParams, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  PageShell,
  Button,
  Input,
  Breadcrumb,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  LoadingState,
  ErrorState,
} from '@template/design-system'
import { createSampleInputSchema, type CreateSampleInput } from '@template/api-client'
import { useSampleDetail, useCreateSample, useUpdateSample } from '../hooks/use-sample-api'

export function SampleFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = !!id

  const { data: existing, isLoading, isError } = useSampleDetail(id ?? '', { enabled: isEdit })
  const { mutate: create, isPending: isCreating } = useCreateSample()
  const { mutate: update, isPending: isUpdating } = useUpdateSample()
  const isPending = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateSampleInput>({
    resolver: zodResolver(createSampleInputSchema),
    defaultValues: { status: 'draft' },
  })

  useEffect(() => {
    if (existing) {
      setValue('title', existing.title)
      setValue('description', existing.description ?? '')
      setValue('status', existing.status)
    }
  }, [existing, setValue])

  const onSubmit = (values: CreateSampleInput) => {
    if (isEdit && id) {
      update(
        { id, input: values },
        {
          onSuccess: () => {
            toast.success('Updated')
            navigate(`/samples/${id}`)
          },
          onError: () => toast.error('Failed to update'),
        },
      )
    } else {
      create(values, {
        onSuccess: (item) => {
          toast.success('Created')
          navigate(`/samples/${item.id}`)
        },
        onError: () => toast.error('Failed to create'),
      })
    }
  }

  if (isEdit && isLoading) return <LoadingState />
  if (isEdit && isError)
    return <ErrorState message="Failed to load sample" onRetry={() => navigate('/samples')} />

  return (
    <PageShell title={isEdit ? 'Edit Sample' : 'New Sample'}>
      <Breadcrumb
        items={[
          { label: 'Samples', href: '/samples' },
          ...(isEdit ? [{ label: existing?.title ?? '', href: `/samples/${id}` }] : []),
          { label: isEdit ? 'Edit' : 'New' },
        ]}
        onNavigate={navigate}
        className="mb-4"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <FormField label="Title" htmlFor="title" error={errors.title?.message} required>
          <Input id="title" {...register('title')} placeholder="Sample title" />
        </FormField>
        <FormField label="Description" htmlFor="description" error={errors.description?.message}>
          <Input id="description" {...register('description')} placeholder="Optional description" />
        </FormField>
        <FormField label="Status" error={errors.status?.message} required>
          <Select
            value={watch('status')}
            onValueChange={(v) => setValue('status', v as CreateSampleInput['status'])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </PageShell>
  )
}
