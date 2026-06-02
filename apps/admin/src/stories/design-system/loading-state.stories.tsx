import type { Meta, StoryObj } from '@storybook/react'
import { LoadingState } from '@template/design-system'

const meta: Meta<typeof LoadingState> = {
  title: 'Design System/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof LoadingState>

export const Default: Story = {}
export const CustomMessage: Story = { args: { message: 'Fetching data...' } }
