import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ConfirmDialog, Button } from '@template/design-system'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Design System/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <Story args={{ open, onOpenChange: setOpen, onConfirm: () => setOpen(false) }} />
        </>
      )
    },
  ],
}
export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Default: Story = {
  args: {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    onConfirm: () => {},
  },
}
export const Destructive: Story = {
  args: {
    title: 'Delete item?',
    description: 'This will permanently delete the item.',
    confirmLabel: 'Delete',
    variant: 'destructive',
    onConfirm: () => {},
  },
}
