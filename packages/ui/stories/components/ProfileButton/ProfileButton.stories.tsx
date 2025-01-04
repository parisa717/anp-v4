import type { Meta, StoryObj } from '@storybook/react'

import { ProfileButton } from './ProfileButton'

const meta: Meta<typeof ProfileButton> = {
  title: 'Misc/ProfileButton',
  component: ProfileButton,
}

export default meta

type Story = StoryObj<typeof ProfileButton>

export const Default: Story = {
  render: () => <ProfileButton fullName="Edmund Blackadder" />,
}
