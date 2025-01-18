import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import {
  CreateLocationWorkFormSchema,
  createLocationWorkFormSchemaInitValues,
} from '../../model/createLocationWorkFormSchema'
import { LocationWork } from './ui/locationWork/LocationWork'

export const NewLocationWorkForm = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.create.${key}`)

  const { control } = useFormContext<CreateLocationWorkFormSchema>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'works',
  })
  const watchWorks = useWatch({ control, name: 'works' })
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchWorks[index],
    }
  })

  return (
    <form>
      {controlledFields.map((field, idx) => (
        <LocationWork
          key={idx}
          field={field}
          idx={idx}
          isRemovingDisabled={fields.length <= 1}
          onRemove={() => remove(idx)}
        />
      ))}
      <Button
        severity="secondary"
        outlined
        type="button"
        onClick={() => append({ ...createLocationWorkFormSchemaInitValues })}
      >
        {translate(`addService`)}
      </Button>
      <Divider />
    </form>
  )
}
