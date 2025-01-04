import type { Meta, StoryObj } from '@storybook/react'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'
import { useState } from 'react'

import { DataTableDropdown } from './DataTableDropdown'

const Component = DataTableDropdown({
  options: [
    {
      label: 'yes',
      value: 'yes',
    },
    {
      label: 'no',
      value: 'no',
    },
  ],
  optionLabel: 'label',
  optionValue: 'value',
})

const meta: Meta<typeof DataTableDropdown> = {
  title: 'DataTable/DataTableDropdown',
  component: Component,
}

export default meta

type Story = StoryObj<typeof DataTableDropdown>

const DefaultStoryComponent = () => {
  const [value, setValue] = useState()

  const columnFilterElementTemplateOptions: ColumnFilterElementTemplateOptions = {
    value,
    filterApplyCallback: (query) => {
      setValue(query)
    },
    filterModel: {},
    filterCallback: () => {},
    index: 0,
    field: '',
  }

  return (
    <div>
      <Component {...columnFilterElementTemplateOptions} />
      <br />
      <br />
      Selected value: {value}
    </div>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
