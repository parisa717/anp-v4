import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'
import React, { useState } from 'react'

import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
}

export default meta

type Story = StoryObj<typeof Modal>

const DefaultStoryComponent = () => {
  const [isModalOpen, setIsOpenModal] = useState(false)
  const handleOpenModal = () => setIsOpenModal(true)

  const handleOnHide = () => {
    setIsOpenModal(false)
  }

  const footerContent = (
    <section className="flex justify-between items-center w-full">
      <Button severity="secondary" outlined label="Cancel" onClick={handleOnHide} />
      <Button label="Save" onClick={handleOnHide} autoFocus />
    </section>
  )

  return (
    <>
      <Button label="Open Modal" onClick={handleOpenModal} />

      <Modal onHide={handleOnHide} width="464" visible={isModalOpen} title="Modal title" footer={footerContent}>
        <p className="my-0 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
