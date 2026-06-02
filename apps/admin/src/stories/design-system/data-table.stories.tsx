import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, Badge } from '@template/design-system'
import type { SampleItem } from '@template/api-client'

const sampleData: SampleItem[] = [
  {
    id: '1',
    title: 'Item One',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Item Two',
    status: 'draft',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    title: 'Long title that might overflow in some narrow layouts',
    status: 'inactive',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
]

const columns = [
  { key: 'title' as keyof SampleItem, header: 'Title' },
  {
    key: 'status' as keyof SampleItem,
    header: 'Status',
    cell: (value: SampleItem[keyof SampleItem]) => <Badge>{String(value)}</Badge>,
  },
]

const meta: Meta<typeof DataTable<SampleItem>> = {
  title: 'Design System/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DataTable<SampleItem>>

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    keyExtractor: (row) => row.id,
  },
}
export const Empty: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (row) => row.id,
  },
}
