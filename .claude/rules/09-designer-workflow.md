# Designer Workflow Rules

## How to Request a New Screen

Use the template at `docs/ai/screen-request-template.md`.

A request must include:

1. **Target app** — `admin` or `web`
2. **Route** — e.g. `/products/:id`
3. **Screen name** — e.g. `ProductDetailPage`
4. **Layout type** — `full-page`, `modal`, `drawer`
5. **API usage** — yes/no + which API endpoint
6. **Form usage** — yes/no + fields
7. **Required states** — loading, error, empty, permission-denied
8. **Responsive needs** — mobile layout requirements
9. **Done criteria** — what "done" looks like

## AI Behavior After Implementing a Screen

1. Adds the route to `apps/*/src/app.tsx`
2. Creates `apps/*/src/features/*/` directory structure
3. Adds MSW handler if new API is needed
4. Adds Storybook stories (default + loading + error + empty)
5. Adds unit test for key interactions
6. Runs `pnpm check`
7. Reports any issues found

## One Request = One Screen or One Component

Don't ask for multiple screens in one request. Keep requests focused.

## Reference Designs

Attach screenshots or Figma links in your request. AI will follow the design.
If no design is provided, AI will use the existing design-system style.
