import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta } from '@storybook/react'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CheckboxFormField } from './CheckboxFormField'

const meta: Meta<typeof CheckboxFormField> = {
  title: 'CheckboxFormField',
  component: CheckboxFormField,
}

export default meta

const formSchema = z.object({
  isAvailable: z.boolean({ message: 'Field is required' }),
})

type formSchema = z.infer<typeof formSchema>

const onSubmitHandler = (data: formSchema) => console.log(data)

export const Default = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <CheckboxFormField name="isAvailable" label="is available" control={control} error={errors.isAvailable} />
      </div>

      <Button label="Submit" />
    </form>
  )
}

export const DefaultInvalid = () => {
  const { control, handleSubmit } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <CheckboxFormField
          name="isAvailable"
          label="is available"
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

export const Invalid = () => {
  const { control, handleSubmit } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
      <div className="mb-6">
        <CheckboxFormField name="isAvailable" label="is available" control={control} invalid />
      </div>

      <Button label="Submit" />
    </form>
  )
}
