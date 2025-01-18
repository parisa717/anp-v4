import { useTranslation } from '@nexus-ui/i18n'
import { SelectBoxFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { SelectItem } from 'primereact/selectitem'
import { BaseSyntheticEvent, Fragment } from 'react'
import { Control, FieldErrors, UseFieldArrayRemove, UseFormWatch } from 'react-hook-form'

import { FORM_ID } from '../config/formId'
import { CreateBusinessStatusByLocationFormSchema } from '../model/formSchema'

export type CreateBusinessStatusByLocationFormProps = {
  isAdditionalBusinessStatus: boolean
  fields: Array<{ id: string }>
  control: Control<CreateBusinessStatusByLocationFormSchema>
  errors: FieldErrors<CreateBusinessStatusByLocationFormSchema>
  watch: UseFormWatch<CreateBusinessStatusByLocationFormSchema>
  onRemove: UseFieldArrayRemove
  onAppend: () => void
  onAddAll: (statuses: SelectItem[]) => void
  statusesSelectBoxOptions: SelectItem[]
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
}

export const CreateBusinessStatusByLocationForm = ({
  isAdditionalBusinessStatus,
  fields,
  control,
  errors,
  watch,
  onRemove,
  onAppend,
  onAddAll,
  statusesSelectBoxOptions,
  onSubmit,
}: CreateBusinessStatusByLocationFormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) =>
    isAdditionalBusinessStatus
      ? t(`pages.businessStatusByLocation.createAdditionalBusinessStatusByLocationForm.${key}`)
      : t(`pages.businessStatusByLocation.createBusinessStatusByLocationForm.${key}`)

  const currentlySelectedStatuses = watch('businessStatuses')

  const filteredStatusesSelectBoxOptions = statusesSelectBoxOptions.map((status) => ({
    ...status,
    disabled: currentlySelectedStatuses.some((selectedStatus) => selectedStatus.id === status.value),
  }))

  return (
    <form className="flex flex-col mt-6" id={FORM_ID} onSubmit={onSubmit}>
      <div className="flex flex-col mb-2">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex flex-row items-start gap-2">
              <SelectBoxFormField
                name={`businessStatuses.${index}.id`}
                label={translate('form.fields.businessStatus')}
                hasFloatLabel
                options={filteredStatusesSelectBoxOptions}
                control={control}
                className={{
                  container: 'grow',
                  input: 'w-full',
                }}
                error={errors.businessStatuses?.[index]?.id}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  outlined
                  severity="secondary"
                  icon="pi pi-trash"
                  onClick={() => onRemove(index)}
                />
              )}
            </div>
            <Divider className="mt-5 mb-7" />
          </Fragment>
        ))}
      </div>

      <div className="flex flex-row gap-2 mb-2.5">
        <Button
          type="button"
          severity="secondary"
          outlined
          label={translate('form.buttons.addStatusButton')}
          disabled={currentlySelectedStatuses.length >= statusesSelectBoxOptions.length}
          onClick={onAppend}
        />
        <Button
          type="button"
          severity="secondary"
          outlined
          label={translate('form.buttons.addAllStatusesButton')}
          disabled={currentlySelectedStatuses.length >= statusesSelectBoxOptions.length}
          onClick={() => onAddAll(statusesSelectBoxOptions)}
        />
      </div>
      <Divider />
    </form>
  )
}
