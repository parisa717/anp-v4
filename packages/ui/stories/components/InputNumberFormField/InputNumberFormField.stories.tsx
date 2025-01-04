import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputNumberFormField } from './InputNumberFormField'

const meta: Meta<typeof InputNumberFormField> = {
  title: 'Form/InputNumberFormField',
  component: InputNumberFormField,
}

export default meta

type Story = StoryObj<typeof InputNumberFormField>

const numberFormSchema = z.object({
  amount: z.number({ required_error: 'Amount is required' }).min(0, 'Amount must be non-negative'),
})

type NumberFormSchema = z.infer<typeof numberFormSchema>

const onSubmitHandler = (data: NumberFormSchema) => console.log(data)

const DefaultStoryComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: 0 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField
          name="amount"
          label="Amount"
          control={control}
          error={errors.amount}
          placeholder="Enter amount"
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
  const { handleSubmit, control } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: -1 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField
          name="amount"
          label="Amount"
          control={control}
          error={{
            type: 'min',
            message: 'Amount must be non-negative',
          }}
          placeholder="Enter amount"
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
  const { handleSubmit, control } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: -1 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField name="amount" label="Amount" control={control} invalid placeholder="Enter amount" />
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
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: 0 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField
          name="amount"
          label="Amount"
          hasFloatLabel
          control={control}
          error={errors.amount}
          placeholder="Enter amount"
        />
      </div>

      <Button label="Submit" />
    </form>
  )
}

export const WithFloatingLabel: Story = {
  render: WithFloatingLabelStoryComponent,
}

const WithFloatingLabelInvalidStoryComponent = () => {
  const { handleSubmit, control } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: -1 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField
          name="amount"
          label="Amount"
          hasFloatLabel
          control={control}
          error={{
            type: 'min',
            message: 'Amount must be non-negative',
          }}
          placeholder="Enter amount"
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
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: 0 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField name="amount" control={control} placeholder="Enter amount" error={errors.amount} />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const NoLabel: Story = {
  render: NoLabelStoryComponent,
}

const NoLabelInvalidStoryComponent = () => {
  const { handleSubmit, control } = useForm<NumberFormSchema>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: { amount: -1 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputNumberFormField
          name="amount"
          control={control}
          error={{
            type: 'min',
            message: 'Amount must be non-negative',
          }}
          placeholder="Enter amount"
        />
      </div>
      <Button label="Submit" />
    </form>
  )
}

export const NoLabelInvalid: Story = {
  render: NoLabelInvalidStoryComponent,
}
