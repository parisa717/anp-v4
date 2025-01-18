import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { EntityStatusDropdown } from './EntityStatusDropdown'

const meta: Meta<typeof EntityStatusDropdown> = {
  title: 'EntityStatusDropdown',
  component: EntityStatusDropdown,
}

export default meta

type Story = StoryObj<typeof EntityStatusDropdown>

const WrapperComponent = ({ initialValue }: { initialValue: boolean }) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: { value: boolean }) => {
    setValue(e.value)
  }

  return (
    <div className="p-4 w-[200px]">
      <EntityStatusDropdown value={value} onChange={handleChange} />
      <p className="mt-2">Selected: {value ? 'Active' : 'Inactive'}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <WrapperComponent initialValue={true} />,
}
