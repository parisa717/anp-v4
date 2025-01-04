import { useTranslation } from '@nexus-ui/i18n'
import { AutoCompleteInputFormField, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { capitalize } from '@nexus-ui/utils'
import { Control, FieldErrors } from 'react-hook-form'

import { AREA_STATUSES } from '@/entities/area'

import { useLoadCountries } from '../lib/useLoadCountries'
import { CreateAreaFormSchema } from '../model/formSchema'
import { CreateAreaFormStep } from '../model/types'

export interface CreateAreaFormProps {
  control: Control<CreateAreaFormSchema>
  errors: FieldErrors<CreateAreaFormSchema>
}

export const CreateAreaForm = ({ control, errors }: CreateAreaFormProps) => {
  const { t } = useTranslation()
  const translate = (formStep: CreateAreaFormStep, key: string) => t(`pages.areas.createArea.steps.${formStep}.${key}`)

  const { translatedCountries, isLoading: areCountriesLoading } = useLoadCountries(t)

  const TRANSLATED_AREAS_STATUSES = AREA_STATUSES.map((status) => ({
    value: status,
    label: capitalize(t(status)),
  }))

  return (
    <form className="mt-6 flex flex-col gap-6">
      <div className="flex gap-2">
        <InputTextFormField
          type="text"
          name="code"
          label={translate(CreateAreaFormStep.General, 'form.fields.areaId')}
          hasFloatLabel
          control={control}
          error={errors.code}
          className={{
            input: 'w-40',
          }}
        />
        <InputTextFormField
          type="text"
          name="name"
          label={translate(CreateAreaFormStep.General, 'form.fields.areaName')}
          hasFloatLabel
          control={control}
          error={errors.name}
          className={{
            input: 'w-full',
            container: 'flex-grow',
          }}
        />
      </div>
      <AutoCompleteInputFormField
        name="address.country.id"
        label={translate(CreateAreaFormStep.General, 'form.fields.areaCountry')}
        hasFloatLabel
        initialSuggestions={translatedCountries || []}
        control={control}
        error={errors.address?.country?.id}
        disabled={areCountriesLoading}
        className={{
          input: 'w-full',
        }}
      />
      <div className="flex gap-2">
        <InputTextFormField
          type="text"
          name="address.postCode"
          label={translate(CreateAreaFormStep.General, 'form.fields.areaPostCode')}
          hasFloatLabel
          control={control}
          error={errors.address?.postCode}
          className={{
            input: 'w-40',
          }}
        />
        <InputTextFormField
          type="text"
          name="address.city"
          label={translate(CreateAreaFormStep.General, 'form.fields.areaCity')}
          hasFloatLabel
          control={control}
          error={errors.address?.city}
          className={{
            input: 'w-full',
            container: 'flex-grow',
          }}
        />
      </div>
      <InputTextFormField
        type="text"
        name="address.address"
        label={translate(CreateAreaFormStep.General, 'form.fields.areaAddress')}
        hasFloatLabel
        control={control}
        error={errors.address?.address}
        className={{
          input: 'w-full',
        }}
      />
      <SelectBoxFormField
        name="status"
        label={translate(CreateAreaFormStep.General, 'form.fields.areaStatus')}
        hasFloatLabel
        options={TRANSLATED_AREAS_STATUSES}
        control={control}
        className={{
          input: 'w-full',
        }}
        error={errors.status}
      />
    </form>
  )
}
