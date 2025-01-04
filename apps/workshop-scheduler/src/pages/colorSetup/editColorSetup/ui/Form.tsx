import { useTranslation } from '@nexus-ui/i18n'
import { DataTable, InputTextFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { ColorPicker } from 'primereact/colorpicker'
import { ColumnProps } from 'primereact/column'
import { BaseSyntheticEvent } from 'react'
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove } from 'react-hook-form'

import { AvailabilityColorEntity } from '@/entities/availabilityColor'
import { ROUTE_PATHS } from '@/shared/lib'
import { FormValidationMessages } from '@/shared/ui'

import { EditColorSetupFormSchema } from '../model/formSchema'

type EditColorSetupFormProps = {
  control: Control<EditColorSetupFormSchema>
  fields: FieldArrayWithId<EditColorSetupFormSchema, 'availabilityColors', 'id'>[]
  errors: FieldErrors<EditColorSetupFormSchema>
  onRemove: UseFieldArrayRemove
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
  onCancel: () => void
  isUpdating: boolean
}

export const EditColorSetupForm = ({
  control,
  fields,
  errors,
  onSubmit,
  onCancel,
  onRemove,
  isUpdating,
}: EditColorSetupFormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.colorSetup.colorSetupList.table.${key}`)

  const colorPickerTemplate = (_: AvailabilityColorEntity, { rowIndex }: { rowIndex: number }) => (
    <Controller
      name={`availabilityColors.${rowIndex}.color`}
      control={control}
      render={({ field: controllerField }) => (
        <div className="flex items-center gap-4">
          <ColorPicker
            value={controllerField.value}
            onChange={(e) => controllerField.onChange(e.value)}
            onBlur={controllerField.onBlur}
          />
          <code className="uppercase text-text-base-regular-lineheight-150 font-inter">#{controllerField.value}</code>
        </div>
      )}
    />
  )

  const capacityValueWithoutPercentagesTemplate = (_: AvailabilityColorEntity, { rowIndex }: { rowIndex: number }) => (
    <InputTextFormField
      name={`availabilityColors.${rowIndex}.capacityValueWithoutPercentages`}
      control={control}
      className={{ input: 'w-full', error: 'pt-0 my-1' }}
      invalid={Boolean(errors.availabilityColors?.[rowIndex]?.capacityValueWithoutPercentages)}
    />
  )

  const deleteButtonTemplate = (_: AvailabilityColorEntity, { rowIndex }: { rowIndex: number }) =>
    fields.length > 2 ? (
      <Button
        type="button"
        outlined
        severity="secondary"
        icon="pi pi-trash"
        onClick={() => {
          onRemove(rowIndex)
        }}
      />
    ) : null

  const columns: ColumnProps[] = [
    {
      header: translate('columnHeaders.color'),
      body: colorPickerTemplate,
      pt: {
        headerCell: {
          className: 'min-w-[140px] bg-surface-0',
        },
      },
    },
    {
      header: translate('columnHeaders.capacityValue'),
      body: capacityValueWithoutPercentagesTemplate,
      pt: {
        headerCell: {
          className: 'min-w-[210px] bg-surface-0',
        },
        headerTitle: {
          className: 'w-full text-right',
        },
      },
    },
    {
      body: deleteButtonTemplate,
      pt: {
        headerCell: {
          className: 'min-w-[400px] bg-surface-0',
        },
        bodyCell: {
          className: 'text-right',
        },
      },
    },
  ]

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormValidationMessages
        page={ROUTE_PATHS.ColorSetup.Edit}
        errors={errors}
        ignoredMessages={[t('validation.required')]}
      />
      <DataTable
        columns={columns}
        data={fields}
        emptyMessage={translate('empty')}
        cellClassName={() => 'border-none'}
        dataKey="id"
      />
      <div className="flex justify-between">
        <Button
          type="button"
          severity="secondary"
          outlined
          onClick={onCancel}
          label={t('cancel')}
          className="capitalize"
          disabled={isUpdating}
        />
        <Button type="submit" label={t('save')} className="capitalize" disabled={isUpdating} />
      </div>
    </form>
  )
}
