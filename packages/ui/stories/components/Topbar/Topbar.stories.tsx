import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'

import { Topbar } from './Topbar'

const TopbarLeftPart = () => (
  <>
    <Button label="1st" text />
    <Button label="2nd" text />
  </>
)

const TopbarRightPart = () => (
  <>
    <Button label="3rd" text />
    <Button label="4th" text />
  </>
)

const meta: Meta<typeof Topbar> = {
  title: 'Layout/Topbar',
  component: Topbar,
}

export default meta

type Story = StoryObj<typeof Topbar>

export const Default: Story = {
  render: () => <Topbar title="Technical Admin" left={<TopbarLeftPart />} right={<TopbarRightPart />} />,
}
