import type { Meta, StoryObj } from '@storybook/react'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DataTableMultiSelect } from './DataTableMultiSelect'

const Component = DataTableMultiSelect({
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
  className: 'w-52',
})

const meta: Meta<typeof DataTableMultiSelect> = {
  title: 'DataTable/DataTableMultiSelect',
  component: Component,
}

export default meta

type Story = StoryObj<typeof DataTableMultiSelect>

const DefaultStoryComponent = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState([])

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
      <span className="capitalize">
        {t('selectedValue')}: {value.join(', ')}
      </span>
    </div>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
