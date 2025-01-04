import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SelectBoxFormField } from './SelectBoxFormField'

const meta: Meta<typeof SelectBoxFormField> = {
  title: 'Form/SelectBoxFormField',
  component: SelectBoxFormField,
}

export default meta

type Story = StoryObj<typeof SelectBoxFormField>

const cities = ['New York', 'Rome', 'London', 'Istanbul', 'Paris']

const cityFormSchema = z.object({
  city: z.string({ message: 'City is required' }),
})

type CityFormSchema = z.infer<typeof cityFormSchema>

const onSubmitHandler = (data: CityFormSchema) => console.log(data)

const DefaultStoryComponent = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          label="City"
          placeholder="Select value"
          options={cities}
          control={control}
          error={errors.city}
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}

const DefaultInvalidStoryComponent = () => {
  const { control, handleSubmit } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          label="City"
          placeholder="Select value"
          options={cities}
          control={control}
          error={{
            type: 'required',
            message: 'field is invalid',
          }}
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const DefaultInvalid: Story = {
  render: DefaultInvalidStoryComponent,
}

const InvalidStoryComponent = () => {
  const { control, handleSubmit } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          label="City"
          placeholder="Select value"
          options={cities}
          control={control}
          invalid
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const Invalid: Story = {
  render: InvalidStoryComponent,
}

const WithFloatingLabelStoryComponent = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          label="City"
          hasFloatLabel
          options={cities}
          control={control}
          error={errors.city}
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const WithFloatingLabel: Story = {
  render: WithFloatingLabelStoryComponent,
}

export const WithFloatingLabelInvalidStoryComponent = () => {
  const { control, handleSubmit } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          label="City"
          hasFloatLabel
          options={cities}
          control={control}
          error={{
            type: 'required',
            message: 'field is invalid',
          }}
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const WithFloatingLabelInvalid: Story = {
  render: WithFloatingLabelInvalidStoryComponent,
}

const NoLabelStoryComponent = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          placeholder="Select value"
          options={cities}
          control={control}
          error={errors.city}
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const NoLabel: Story = {
  render: NoLabelStoryComponent,
}

const NoLabelInvalidStoryComponent = () => {
  const { control, handleSubmit } = useForm<CityFormSchema>({
    resolver: zodResolver(cityFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <SelectBoxFormField
          name="city"
          placeholder="Select value"
          options={cities}
          control={control}
          error={{
            type: 'required',
            message: 'field is invalid',
          }}
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const NoLabelInvalid: Story = {
  render: NoLabelInvalidStoryComponent,
}
