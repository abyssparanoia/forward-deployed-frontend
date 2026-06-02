import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState, Button } from '@template/design-system'

const meta: Meta<typeof EmptyState> = {
  title: 'Design System/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {}
export const WithAction: Story = {
  args: {
    title: 'No items yet',
    message: 'Create your first item to get started.',
    action: <Button>Create Item</Button>,
  },
}
