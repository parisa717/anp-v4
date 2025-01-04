import { CalendarTimeOnlyField } from '@nexus-ui/ui'
import clsx from 'clsx'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { type Control, FieldErrors, useFieldArray } from 'react-hook-form'

import { WorkingDay, WorkingDaysSchema } from '../../../../model/formSchema'
import { RemoveBreakConfirmationModal } from '../form/RemoveBreakConfirmationModal'

const defaultWorkingDayBreak = { startTime: '08:00', endTime: '9:00' }

export const BreaksBodyTemplate = ({
  workingDayName,
  control,
  errors,
}: {
  workingDayName: WorkingDay
  control: Control<WorkingDaysSchema>
  errors: FieldErrors<WorkingDaysSchema>
}) => {
  const [isOpenRemoveBreakConfirmationModal, setIsOpenRemoveBreakConfirmationModal] = useState(false)

  const { fields, append, remove } = useFieldArray<WorkingDaysSchema>({
    control,
    name: `${workingDayName}.breaks`,
  })

  if (!fields.length)
    return (
      <Button
        data-cy="add-button"
        type="button"
        outlined
        severity="secondary"
        icon="pi pi-plus"
        onClick={() => append(defaultWorkingDayBreak)}
      />
    )

  const handleCloseRemoveBreakConfirmationModal = () => setIsOpenRemoveBreakConfirmationModal(false)

  const handleOpenRemoveBreakConfirmationModal = () => setIsOpenRemoveBreakConfirmationModal(true)

  return (
    <div className="flex flex-col gap-1">
      {fields.map((field, index, items) => {
        const isLast = items.length === index + 1
        const invalid = Boolean(errors[workingDayName]?.breaks?.[index]?.root?.message)

        const handleRemoveBreak = () => {
          remove(index)
          handleCloseRemoveBreakConfirmationModal()
        }

        return (
          <div data-cy={`${workingDayName}-breaks-${index}-wrapper`} key={field.id} className="flex gap-1">
            <CalendarTimeOnlyField
              data-cy={`${workingDayName}-breaks-${index}-startTime`}
              control={control}
              name={`${workingDayName}.breaks.${index}.startTime`}
              invalid={invalid}
              stepMinute={10}
            />
            <CalendarTimeOnlyField
              data-cy={`${workingDayName}-breaks-${index}-endTime`}
              control={control}
              name={`${workingDayName}.breaks.${index}.endTime`}
              invalid={invalid}
              stepMinute={10}
            />
            <Button
              data-cy="remove-button"
              type="button"
              pt={{
                root: {
                  className: 'shrink-0',
                },
              }}
              outlined
              severity="secondary"
              icon="pi pi-trash"
              onClick={handleOpenRemoveBreakConfirmationModal}
            />
            <Button
              data-cy="add-button"
              pt={{
                root: {
                  className: clsx('shrink-0', isLast ? 'visible' : 'invisible'),
                },
              }}
              type="button"
              outlined
              severity="secondary"
              icon="pi pi-plus"
              onClick={() => append(defaultWorkingDayBreak)}
            />
            <RemoveBreakConfirmationModal
              open={isOpenRemoveBreakConfirmationModal}
              onRemove={handleRemoveBreak}
              onCancel={handleCloseRemoveBreakConfirmationModal}
            />
          </div>
        )
      })}
    </div>
  )
}
