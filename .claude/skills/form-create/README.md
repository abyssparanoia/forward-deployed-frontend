# Skill: form-create

## Purpose

Create a form screen following the standard pattern.

## Standard Form Structure

```
features/<feature>/
├── schemas/form-schema.ts     ← Zod schema
├── pages/<feature>-form.tsx   ← Form page (composition)
├── components/<field>.tsx     ← Custom field components (if needed)
├── stories/<feature>-form.stories.tsx
└── tests/<feature>-form.test.tsx
```

## Required Elements

Every form must include:

- [ ] Zod schema with validation messages
- [ ] `react-hook-form` + `zodResolver`
- [ ] `<FormField>` wrapper for each field (label + error)
- [ ] Submit button with `disabled={isPending}` and loading text
- [ ] `toast.success()` on success
- [ ] `toast.error(error.message)` on API error
- [ ] Cancel / back navigation button
- [ ] Storybook story (default, loading, error, validation-error)
- [ ] Unit test (renders, validates, submits)

## Steps

1. Define Zod schema in `schemas/`
2. Create form page in `pages/`
3. Add route in `app.tsx`
4. Add MSW handler if needed
5. Add Storybook story
6. Add unit test
7. Run `pnpm check`
