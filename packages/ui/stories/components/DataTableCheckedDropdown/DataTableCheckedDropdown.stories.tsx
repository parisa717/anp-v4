import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { DataTableCheckedDropdown } from './DataTableCheckedDropdown'

const meta: Meta<typeof DataTableCheckedDropdown> = {
  title: 'DataTable/DataTableCheckedDropdown',
  component: DataTableCheckedDropdown,
}

export default meta

type Story = StoryObj<typeof DataTableCheckedDropdown>

const WrapperComponent = ({ initialValue }: { initialValue: boolean }) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: { value: boolean }) => {
    setValue(e.value)
  }

  return (
    <div className="p-4">
      <DataTableCheckedDropdown value={value} onChange={handleChange} />
      <p className="mt-2">Selected: {value ? 'Checked' : 'Unchecked'}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <WrapperComponent initialValue={false} />,
}
