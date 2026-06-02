# UI Implementation Rules

## Component Hierarchy

1. Always use `@template/design-system` components first
2. If a needed component doesn't exist in design-system, create it there
3. Only create app-specific components in `apps/*/src/features/*/components/`
4. Never duplicate a design-system component in an app

## Required States

Every data-displaying component MUST handle:

- **Loading** — use `<LoadingState />` or skeleton
- **Error** — use `<ErrorState onRetry={refetch} />`
- **Empty** — use `<EmptyState />`
- **Success** — the actual content

Screens that have permissions should also handle:

- **Permission denied** — use `<PermissionDenied />`

## Responsive Design

- Default to mobile-first
- Use Tailwind responsive prefixes (`md:`, `lg:`)
- Test at 375px (mobile), 768px (tablet), 1280px (desktop)
- `AppShell` sidebar hides on mobile by default

## Styling Rules

- Use Tailwind classes only — no inline styles, no CSS modules
- Use `cn()` from `@template/utils` for conditional classes
- Do not hardcode colors — use CSS variables (`text-foreground`, `bg-background`, etc.)
- Dark mode is supported via CSS variables — don't use arbitrary color values

## After Implementing UI

1. Add Storybook stories covering: default, loading, error, empty, mobile, long-text
2. Run `pnpm check`
