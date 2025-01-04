import type { Meta, StoryObj } from '@storybook/react'

import { Steps } from './Steps'

const meta: Meta<typeof Steps> = {
  title: 'Steps',
  component: Steps,
}

export default meta

type Story = StoryObj<typeof Steps>

const items = [
  {
    label: 'General Data',
  },
  {
    label: 'DMS',
  },
  {
    label: 'CRM',
  },
]

export const Default: Story = {
  render: () => <Steps items={items} activeIndex={1} />,
}
