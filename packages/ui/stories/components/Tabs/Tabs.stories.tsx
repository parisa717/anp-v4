import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './Tabs'

const items = [
  {
    id: '1',
    header: 'Header 1',
    children: 'Content 1',
  },
  {
    id: '2',
    header: 'Header 2',
    children: 'Content 2',
  },
]

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => <Tabs items={items} />,
}
