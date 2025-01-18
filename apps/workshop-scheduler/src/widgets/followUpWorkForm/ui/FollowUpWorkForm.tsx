import { useTranslation } from '@nexus-ui/i18n'
import { CheckboxFormField, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { Control, FieldErrors } from 'react-hook-form'

import { useGetQualificationsQuery } from '@/entities/qualification'
import { FollowUpWorkFormSchema } from '@/widgets/followUpWorkForm'

export interface FormProps {
  control: Control<FollowUpWorkFormSchema>
  errors: FieldErrors<FollowUpWorkFormSchema>
  isEditMode?: boolean
}

export const FollowUpWorkForm = ({ control, errors, isEditMode = false }: FormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.workSetupForm.${key}`)

  const { data: qualifications } = useGetQualificationsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.map((qualification) => ({ value: qualification.id, label: qualification.name })),
    }),
  })

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
    <form className="flex flex-col mt-6 mb-2 gap-8">
      <InputTextFormField
        type="text"
        name={`name`}
        label={translate('workName')}
        hasFloatLabel
        control={control}
        error={errors.name}
        className={{
          input: 'w-full',
          container: 'flex-grow',
        }}
      />
      <div className="flex gap-3">
        <SelectBoxFormField
          name={`qualificationId`}
          label={translate('qualification')}
          options={qualifications}
          hasFloatLabel
          control={control}
          className={{
            input: 'w-full',
            container: 'flex-[4] min-w-0',
          }}
          error={errors.qualificationId}
        />
        <InputTextFormField
          type="number"
          name={`timeUnits`}
          label={translate('timeUnits')}
          hasFloatLabel
          control={control}
          error={errors.timeUnits}
          className={{
            input: 'w-full',
            container: 'flex-1 min-w-0',
          }}
        />
      </div>
      <div className="flex gap-6">
        <CheckboxFormField
          name={`isDescriptionEditable`}
          label={translate('nameChangeable')}
          control={control}
          error={errors.isDescriptionEditable}
        />
        <CheckboxFormField
          name={`isCapacityEditable`}
          label={translate('capacityChangeable')}
          control={control}
          error={errors.isCapacityEditable}
        />
      </div>
      {!isEditMode && (
        <SelectBoxFormField
          name={`isActive`}
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
    </form>
  )
}
