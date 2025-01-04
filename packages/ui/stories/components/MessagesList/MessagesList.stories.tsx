import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { MessagesList } from './MessagesList'

const meta: Meta<typeof MessagesList> = {
  title: 'MessagesList',
  component: MessagesList,
}

export default meta

type Story = StoryObj<typeof MessagesList>

export const Default: Story = {
  render: () => (
    <MessagesList
      messages={[
        { sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
        { sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
        { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
        { sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false },
      ]}
    />
  ),
}

export const ZeroMessages: Story = {
  render: () => <MessagesList messages={[]} />,
}
