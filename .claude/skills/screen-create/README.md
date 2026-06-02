# Skill: screen-create

## Purpose

Add a new screen safely following the feature directory pattern.

## When to Use

When a designer or PM requests a new page/screen in admin or web.

## Inputs Required

Use the template at `docs/ai/screen-request-template.md`:

- Target app (admin/web)
- Route path
- Screen/page name
- Layout type
- API endpoints needed
- Form fields (if any)
- States: loading, error, empty, permission-denied
- Responsive requirements
- Reference design

## Steps

1. Create feature directory: `apps/<app>/src/features/<feature>/`
   ```
   components/
   hooks/
   pages/
   schemas/
   stories/
   tests/
   index.ts
   ```
2. Create page component in `pages/` (composition only)
3. Create hooks in `hooks/` (wrap api-client hooks)
4. Create components in `components/` (presentation)
5. Add Zod schema in `schemas/` (if form)
6. Add route in `apps/<app>/src/app.tsx`
7. Add navigation link (if needed)
8. Add MSW handler in `packages/mock/src/handlers/` (if new API)
9. Add Storybook stories in `stories/`
10. Add unit tests in `tests/`
11. Run `pnpm check`

## Files That May Be Modified

- `apps/<app>/src/features/<feature>/` (new directory)
- `apps/<app>/src/app.tsx` (route addition)
- `apps/<app>/src/components/admin-layout.tsx` or `web-layout.tsx` (nav addition)
- `packages/mock/src/handlers/` (new handler)
- `packages/api-client/src/hooks/` (new hook if needed)

## Files NOT to Modify

- Other feature directories (unless explicitly needed)
- `packages/auth/`
- `packages/design-system/` (unless adding a new shared component)
- `backend/rapid-go/`

## Completion Criteria

- [ ] Route accessible in browser
- [ ] Loading state shows while data fetches
- [ ] Error state shows on API failure (test with MSW)
- [ ] Empty state shows when no data
- [ ] Mobile layout works at 375px
- [ ] Storybook story exists
- [ ] Unit test exists
- [ ] `pnpm check` passes
