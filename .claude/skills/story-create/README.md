# Skill: story-create

## Purpose

Add Storybook stories to an existing component or page.

## Stories to Include

For every component, create stories for:

| Story name         | Description                              |
| ------------------ | ---------------------------------------- |
| `Default`          | Normal state with typical data           |
| `Loading`          | Loading spinner / skeleton               |
| `Error`            | Error state with retry                   |
| `Empty`            | No data state                            |
| `Disabled`         | Disabled/read-only state (if applicable) |
| `Mobile`           | Viewport set to 375px                    |
| `LongText`         | Content with very long strings           |
| `PermissionDenied` | Unauthorized state (if applicable)       |

## Story File Location

```
apps/<app>/src/features/<feature>/stories/<component>.stories.tsx
```

or for design-system:

```
apps/admin/src/stories/design-system/<component>.stories.tsx
```

## Pattern

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from '../components/my-component'

const meta: Meta<typeof MyComponent> = {
  title: 'Feature/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof MyComponent>

export const Default: Story = { args: { ... } }
export const Loading: Story = { args: { isLoading: true } }
export const Error: Story = { args: { error: 'Something went wrong' } }
export const Empty: Story = { args: { items: [] } }
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
```

## MSW in Stories

For components that call APIs, add MSW handler overrides:

```tsx
export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [http.get('/api/v1/items', () => HttpResponse.json({ items: [], total: 0 }))],
    },
  },
}
```
