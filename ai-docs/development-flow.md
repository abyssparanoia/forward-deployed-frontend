# AI Development Flow

Step-by-step implementation checklist for each request type. Read `.claude/rules/` for the full constraints behind each step.

---

## General Rules (apply to all request types)

Before starting any task:

- [ ] Read the relevant `.claude/rules/` files for the affected layers.
- [ ] Never touch files outside the scope of the request.
- [ ] Never refactor unless explicitly asked.
- [ ] Run `pnpm check` before reporting completion.
- [ ] Report any errors found, then fix them.

---

## Screen Request

Triggered by: a filled `docs/ai/screen-request-template.md`.

### Steps

1. **Parse the request** — identify app, route, screen name, layout, API, states, responsive needs.
2. **Create feature directory** at `apps/<app>/src/features/<feature-name>/`:
   - `components/`
   - `hooks/`
   - `pages/`
   - `schemas/` (if form is required)
   - `stories/`
   - `tests/`
   - `index.ts`
3. **Add route** in `apps/<app>/src/app.tsx`. Wrap protected routes in `<RequireAuth>`.
4. **Implement page component** in `pages/`. Pages compose feature components only — no direct API calls, no auth SDK imports.
5. **Add Storybook stories** covering: default, loading, error, empty, mobile (+ permission-denied if the route is guarded).
6. **Add unit test** for the key user interaction (form submit, click, navigation, etc.).
7. **Add MSW handler** in `packages/mock/src/handlers/` if a new API endpoint is involved.
8. **Run `pnpm check`** — fix all errors before reporting done.

### Constraints

- Auth: `useAuth()` / `RequireAuth` only. Never import Firebase / Cognito SDK directly in a page.
- API: hooks from `packages/api-client` only. Never call `fetch()` directly in a page.
- UI: components from `@template/design-system` first. Never re-implement primitives.
- Handle all four states: loading (`<LoadingState />`), error (`<ErrorState />`), empty (`<EmptyState />`), success.
- Mobile-first layout with Tailwind responsive prefixes (`md:`, `lg:`).
- See `.claude/rules/02-directory-boundary.md`, `03-ui-implementation.md`, `05-auth.md`.

---

## Form Request

Triggered by: a screen request with `Form required: yes`.

### Steps

1. Follow the **Screen Request** flow above.
2. **Create Zod schema** in `features/<name>/schemas/`. Not inline in the component.
3. **Implement form** with `react-hook-form` + `zodResolver`. Keep `useForm` in the page/form component.
4. **Connect to mutation hook** from `packages/api-client/src/hooks/`. Never call the API directly in the submit handler.
5. **Submit handler** must:
   - Disable the submit button while pending (`disabled={isPending}`).
   - Show a success toast on resolve.
   - Show an error toast via `normalizeApiError` on reject.
   - Navigate back or reset the form as specified in the request.
6. Include cancel / back navigation.
7. Add Storybook stories: default, loading (submit in progress), error (server error), validation error.

### Constraints

- See `.claude/rules/06-form.md`.

---

## Component Request

Triggered by: a filled `docs/ai/component-request-template.md`.

### Steps

1. **Determine target location**:
   - Shared (used 3+ times across features) → `packages/design-system/src/`
   - Feature-specific → `apps/<app>/src/features/*/components/`
2. **Implement** — presentation only, no business logic or API calls.
3. **Export** from the package/feature `index.ts`.
4. **Add Storybook stories**: default + all states listed in the request.
5. **Add unit test** covering rendering and key interaction.
6. **Run `pnpm check`**.

### Constraints

- Never duplicate a design-system component inside an app. Check `@template/design-system` first.
- No `useQuery` / `useMutation` inside shared components — API calls belong in feature hooks.
- See `.claude/rules/03-ui-implementation.md`.

---

## API Sync Request

Triggered by: a filled `docs/ai/api-sync-request-template.md` or a direct request after `git submodule update --remote backend/rapid-go`.

### Steps

1. **Read** the backend API document at the path specified in the request.
2. **Update or create Zod schema** in `packages/api-client/src/schemas/`.
3. **Update or create TanStack Query hooks** in `packages/api-client/src/hooks/`.
4. **Update or create MSW handler** in `packages/mock/src/handlers/` — use the same URL path as the real API.
5. **Export** new symbols from `packages/api-client/src/index.ts`.
6. **Do not** manually edit `packages/api-client/src/generated/`. If generated types need updating, run `pnpm api:sync`.
7. **Run `pnpm check`**.

### Constraints

- Never change existing API types without explicit instruction — they are contracts.
- All API responses go through Zod schemas when validation is needed.
- All API errors go through `normalizeApiError` before reaching UI.
- MSW handler URLs must match the real API URL exactly.
- See `.claude/rules/04-api-client.md`.
