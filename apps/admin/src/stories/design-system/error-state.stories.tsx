import type { Meta, StoryObj } from '@storybook/react'
import { ErrorState } from '@template/design-system'

const meta: Meta<typeof ErrorState> = {
  title: 'Design System/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ErrorState>

export const Default: Story = {}
export const WithRetry: Story = { args: { onRetry: () => alert('retry') } }
export const CustomMessage: Story = {
  args: {
    title: 'Not Found',
    message: 'The requested resource could not be found.',
  },
}
