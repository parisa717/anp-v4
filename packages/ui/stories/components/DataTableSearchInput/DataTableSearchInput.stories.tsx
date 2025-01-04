import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { DataTableSearchInput } from './DataTableSearchInput'

const meta: Meta<typeof DataTableSearchInput> = {
  title: 'DataTable/DataTableSearchInput',
  component: DataTableSearchInput,
}

export default meta

type Story = StoryObj<typeof DataTableSearchInput>

const DefaultStoryComponent = () => {
  const [value, setValue] = useState()

  return (
    <DataTableSearchInput
      value={value}
      filterApplyCallback={(query) => {
        console.log(query)
        setValue(query)
      }}
    />
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
