import type { Meta, StoryObj } from '@storybook/react'
import { SampleStatusBadge } from '../../features/sample/components/sample-status-badge'

const meta: Meta<typeof SampleStatusBadge> = {
  title: 'Sample/SampleStatusBadge',
  component: SampleStatusBadge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof SampleStatusBadge>

export const Active: Story = { args: { status: 'active' } }
export const Draft: Story = { args: { status: 'draft' } }
export const Inactive: Story = { args: { status: 'inactive' } }
