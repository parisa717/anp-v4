import type { Meta, StoryObj } from '@storybook/react'

import { ConfirmationModal } from './ConfirmationModal'

const meta: Meta<typeof ConfirmationModal> = {
  title: 'ConfirmationModal',
  component: ConfirmationModal,
}

export default meta

type Story = StoryObj<typeof ConfirmationModal>

export const Default: Story = {
  render: () => (
    <ConfirmationModal title="Are you sure?" width={500} onCancelClick={() => {}} onSaveClick={() => {}}>
      <p>This change will have impact somewhere</p>
    </ConfirmationModal>
  ),
}
