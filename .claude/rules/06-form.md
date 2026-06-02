# Form Rules

## Standard Pattern

All forms use `react-hook-form` + `zod` + `@hookform/resolvers`.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormField, Input, Button } from '@template/design-system'

const schema = z.object({
  title: z.string().min(1, 'Required'),
})
type FormValues = z.infer<typeof schema>

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: FormValues) => {
    // call mutation, handle success/error
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Title" error={errors.title?.message} required>
        <Input {...register('title')} />
      </FormField>
      <Button type="submit">Save</Button>
    </form>
  )
}
```

## Required Elements

Every form must have:

- [ ] Zod schema for validation
- [ ] Field-level error messages via `<FormField error={}>`
- [ ] Submit button with loading state (`disabled={isPending}`)
- [ ] Success feedback (toast)
- [ ] API error feedback (toast)
- [ ] Cancel / back navigation
- [ ] Storybook story

## Rules

1. Schema definition goes in `features/*/schemas/` — not inline in the component.
2. Form state (`useForm`) stays in the page/form component — not in a hook.
3. Submit function calls a mutation from `api-client` hooks.
4. Never call API directly in the form submit handler.
