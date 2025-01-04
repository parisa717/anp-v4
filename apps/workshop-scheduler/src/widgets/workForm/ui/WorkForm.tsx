import { useTranslation } from '@nexus-ui/i18n'
import { CheckboxFormField, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { Divider } from 'primereact/divider'
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'

import { useGetQualificationsQuery } from '@/entities/qualification'

import { WorkSetupFormSchema } from '../model/formSchema'
import { BrandsSection } from './BrandsSection'

export interface FormProps {
  control: Control<WorkSetupFormSchema>
  errors: FieldErrors<WorkSetupFormSchema>
  setValue: UseFormSetValue<WorkSetupFormSchema>
  isEditMode?: boolean
}

export const WorkForm = ({ control, errors, setValue, isEditMode = false }: FormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.workSetupForm.${key}`)

  const { data: qualifications, isError: isQualificationsError } = useGetQualificationsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.map((qualification) => ({ value: qualification.id, label: qualification.name })),
    }),
  })

  if (isQualificationsError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const statuses = [
    {
      value: true,
      label: translate('active'),
    },
    {
      value: false,
      label: translate('inactive'),
    },
  ]

  return (
    <form className="flex flex-col">
      <div className="flex flex-col gap-8">
        <InputTextFormField
          type="text"
          name="name"
          label={translate('workName')}
          hasFloatLabel
          control={control}
          error={errors.name}
          className={{
            input: 'w-full',
            container: 'flex-grow',
          }}
        />
        <SelectBoxFormField
          name="qualificationId"
          label={translate('qualification')}
          options={qualifications}
          hasFloatLabel
          control={control}
          className={{
            input: 'w-full',
          }}
          error={errors.qualificationId}
        />
        {!isEditMode && (
          <SelectBoxFormField
            name="isActive"
            label={translate('status')}
            options={statuses}
            hasFloatLabel
            control={control}
            className={{
              input: 'w-full',
            }}
            error={errors.isActive}
          />
        )}
        <div className="flex gap-6">
          <CheckboxFormField
            name="isDescriptionEditable"
            label={translate('nameChangeable')}
            control={control}
            error={errors.isDescriptionEditable}
          />
          <CheckboxFormField
            name="isCapacityEditable"
            label={translate('capacityChangeable')}
            control={control}
            error={errors.isCapacityEditable}
          />
        </div>

        <BrandsSection control={control} errors={errors} setValue={setValue} />
      </div>
      <Divider className="my-6" />
    </form>
  )
}
