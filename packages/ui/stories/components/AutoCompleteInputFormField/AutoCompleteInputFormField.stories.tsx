import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'
import { InputIcon } from 'primereact/inputicon'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AutoCompleteInputFormField, AutoCompleteSuggestionItem } from './AutoCompleteInputFormField'

const meta: Meta<typeof AutoCompleteInputFormField> = {
  title: 'Form/AutoCompleteInputFormField',
  component: AutoCompleteInputFormField,
}

export default meta

type Story = StoryObj<typeof AutoCompleteInputFormField>

const initialSuggestions = [
  { label: 'Germany', value: '1' },
  { label: 'Austria', value: '2' },
  { label: 'Switzerland', value: '3' },
]

const formSchema = z.object({
  countryId: z.string().min(1, 'Country is required'),
})

type FormSchema = z.infer<typeof formSchema>

const onSubmitHandler = (data: FormSchema) => console.log(data)

const DefaultStoryComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { countryId: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <AutoCompleteInputFormField
        name="countryId"
        label="Country"
        hasFloatLabel
        initialSuggestions={initialSuggestions}
        control={control}
        error={errors.countryId}
        className={{
          container: 'mb-6',
        }}
      />

      <Button label="Submit" />
    </form>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}

const WithCustomItemTemplateStoryComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { countryId: '' },
  })

  const customItemTemplate = (item: AutoCompleteSuggestionItem) => {
    return <div>-- {item.label}</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <AutoCompleteInputFormField
        name="countryId"
        label="Country"
        hasFloatLabel
        initialSuggestions={initialSuggestions}
        control={control}
        error={errors.countryId}
        itemTemplate={customItemTemplate}
        className={{
          container: 'mb-6',
        }}
      />
    </form>
  )
}

export const WithCustomItemTemplate: Story = {
  render: WithCustomItemTemplateStoryComponent,
}

const WithCustomDropdownIconStoryComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { countryId: '' },
  })

  const customDropdownIcon = <InputIcon className="pi pi-chevron-down text-input-icon" />

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <AutoCompleteInputFormField
        name="countryId"
        label="Country"
        hasFloatLabel
        initialSuggestions={initialSuggestions}
        control={control}
        error={errors.countryId}
        dropdownIcon={customDropdownIcon}
        className={{
          container: 'mb-6',
        }}
      />

      <Button label="Submit" />
    </form>
  )
}

export const WithCustomDropdownIcon: Story = {
  render: WithCustomDropdownIconStoryComponent,
}
