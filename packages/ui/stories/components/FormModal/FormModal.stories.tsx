import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { InputTextFormField } from '../InputTextFormField'
import { SelectBoxFormField } from '../SelectBoxFormField'
import { FormModal } from './FormModal'

const meta: Meta<typeof FormModal> = {
  title: 'Form/FormModal',
  component: FormModal,
}

export default meta

type Story = StoryObj<typeof FormModal>

const DefaultStoryComponent = () => {
  const {
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { name: '', dropdown: '' },
  })

  return (
    <FormModal title="Form title" width={500} onCancelClick={() => {}} onSaveClick={() => {}}>
      <form className="mt-6 flex flex-col gap-8">
        <InputTextFormField
          type="text"
          name="name"
          label="Name"
          hasFloatLabel
          control={control}
          error={errors.name}
          className={{
            input: 'w-full',
          }}
        />
        <SelectBoxFormField
          name="dropdown"
          label="Status"
          hasFloatLabel
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
          control={control}
          className={{
            input: 'w-full',
            container: 'mb-6',
          }}
          error={errors.dropdown}
        />
      </form>
    </FormModal>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
