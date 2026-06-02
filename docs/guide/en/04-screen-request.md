# 4. Requesting a Screen or Feature

## Basic Rules

- **One request = one screen or one component**
- Do not bundle multiple screens in a single request

## Requesting a Screen

### Fill in the Template

Copy `docs/ai/screen-request-template.md` and fill it in.

Key fields:

| Field         | Example                            | Description                 |
| ------------- | ---------------------------------- | --------------------------- |
| App           | `admin`                            | Which app to add to         |
| Route         | `/products/:id`                    | URL path                    |
| Screen name   | `ProductDetailPage`                | Screen name (English)       |
| Layout        | `full-page`                        | Layout type                 |
| API required  | `yes`                              | Does it need a backend API? |
| API document  | `backend/rapid-go/docs/api/...`    | Path to API docs            |
| States        | `loading, error, empty`            | States to render            |
| Responsive    | `stacked layout on mobile`         | Mobile layout requirement   |
| Done criteria | Storybook added, pnpm check passes | Definition of done          |

### Handing to the AI

Paste the filled-in template directly into AI (Claude Code / Cursor).

Attaching a reference design (Figma screenshot or URL of an existing screen) helps the AI produce more accurate results.

## Requesting a Form

For screens with forms, also specify:

- Field list (name, type, required or optional)
- Validation rules
- Behavior after submit (e.g., redirect back to list on success)

## Requesting a Component

Use `docs/ai/component-request-template.md` for adding buttons, inputs, or other reusable UI pieces rather than full screens.

## Syncing an API

When the backend adds or changes an API:

1. Update the backend submodule
2. Run `pnpm api:sync`

See `docs/ai/api-sync-request-template.md` for details.

## What the AI Does After Receiving a Request

The AI will automatically:

- [x] Create the screen component
- [x] Add the route
- [x] Add Storybook stories (default / loading / error / empty / mobile)
- [x] Add a unit test
- [x] Run `pnpm check`
- [x] Fix any issues found

Once the AI reports completion, proceed to step 5 (visual review) in [03-request-flow.md](03-request-flow.md).
