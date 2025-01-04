import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputTextFormField } from './InputTextFormField'

const meta: Meta<typeof InputTextFormField> = {
  title: 'Form/InputTextFormField',
  component: InputTextFormField,
}

export default meta

type Story = StoryObj<typeof InputTextFormField>

const loginFormSchema = z.object({
  username: z.string({ required_error: 'username is required' }).min(3, 'Should include more than 3 letters'),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

const onSubmitHandler = (data: LoginFormSchema) => console.log(data)

const DefaultStoryComponent = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          control={control}
          error={errors.username}
        />
      </div>
      <Button label="Login" />
    </form>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}

const DefaultInvalidStoryComponent = () => {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          control={control}
          error={{
            type: 'minLength',
            message: 'field has invalid length',
          }}
        />
      </div>
      <Button label="Login" />
    </form>
  )
}

export const DefaultInvalid: Story = {
  render: DefaultInvalidStoryComponent,
}

const InvalidStoryComponent = () => {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          control={control}
          invalid
        />
      </div>
      <Button label="Login" />
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
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          label="Username"
          hasFloatLabel
          control={control}
          error={errors.username}
        />
      </div>
      <Button label="Login" />
    </form>
  )
}

export const WithFloatingLabel: Story = {
  render: WithFloatingLabelStoryComponent,
}

const WithFloatingLabelInvalidStoryComponent = () => {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          label="Username"
          hasFloatLabel
          control={control}
          invalid
          error={{
            type: 'minLength',
            message: 'field has invalid length',
          }}
        />
      </div>
      <Button label="Login" />
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
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          placeholder="username"
          control={control}
          error={errors.username}
        />
      </div>
      <Button label="Login" />
    </form>
  )
}

export const NoLabelStory: Story = {
  render: NoLabelStoryComponent,
}

const NoLabelInvalidStoryComponent = () => {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <InputTextFormField
          type="text"
          name="username"
          placeholder="username"
          control={control}
          invalid
          error={{
            type: 'minLength',
            message: 'field has invalid length',
          }}
        />
      </div>
      <Button label="Login" />
    </form>
  )
}

export const NoLabelInvalid: Story = {
  render: NoLabelInvalidStoryComponent,
}
