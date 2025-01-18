import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'

import { StackView } from './StackView'
import { useStackView } from './StackViewContext'

const meta: Meta<typeof StackView> = {
  title: 'Layout/StackView',
  component: StackView,
}

export default meta

type Story = StoryObj<typeof StackView>

const Controls = () => {
  const { openPreviousView, openNextView, setOpenViewIndex } = useStackView()

  return (
    <div className="flex gap-4">
      <Button onClick={() => setOpenViewIndex(0)}>Open First view</Button>
      <Button onClick={openPreviousView}>Open previous view</Button>
      <Button onClick={openNextView}>Open next view</Button>
      <Button onClick={() => setOpenViewIndex(2)}>Open Third view</Button>
    </div>
  )
}

const First = () => {
  return (
    <div>
      <h1>First view</h1>
      <Controls />
    </div>
  )
}

const Second = () => {
  return (
    <div>
      <h1>Second view</h1>
      <Controls />
    </div>
  )
}

const DefaultStoryComponent = () => {
  return (
    <StackView>
      <First />
      <Second />
      <div>
        <h1>Third view</h1>
        <Controls />
      </div>
    </StackView>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
