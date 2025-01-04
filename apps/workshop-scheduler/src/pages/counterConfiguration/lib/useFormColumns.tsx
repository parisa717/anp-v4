import { useTranslation } from '@nexus-ui/i18n'
import { CalendarTimeOnlyField } from '@nexus-ui/ui'
import { ColumnProps } from 'primereact/column'
import { type Control, FieldErrors } from 'react-hook-form'

import { LocationCounterCalendarWorkDayEntity, mapDayNumberToDayName } from '@/entities/locationCounterCalendar'

import { dayNumberToDayNameSchemaMapper, WorkingDaysSchema } from '../model/formSchema'
import { BreaksBodyTemplate } from '../ui/counterCalendarSection/ui'

const WORKING_DAY_STEP_MINUTE = 5

export const useFormColumns = ({
  control,
  errors,
}: {
  control: Control<WorkingDaysSchema>
  errors: FieldErrors<WorkingDaysSchema>
}) => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.counterConfiguration.sections.counterCalendar.table.columnHeaders.${key}`)

  const workingHoursBodyTemplate = (entity: LocationCounterCalendarWorkDayEntity) => {
    const workingDayName = dayNumberToDayNameSchemaMapper[entity.dayNumber]
    const invalid = Boolean(errors[workingDayName]?.root?.message)

    return (
      <div className="flex gap-1">
        <CalendarTimeOnlyField
          data-cy={`${workingDayName}-startTime`}
          name={`${workingDayName}.startTime`}
          control={control}
          invalid={invalid}
          stepMinute={WORKING_DAY_STEP_MINUTE}
        />
        <CalendarTimeOnlyField
          data-cy={`${workingDayName}-endTime`}
          name={`${workingDayName}.endTime`}
          control={control}
          invalid={invalid}
          stepMinute={WORKING_DAY_STEP_MINUTE}
        />
      </div>
    )
  }

  const dayNumberBodyTemplate = (entity: LocationCounterCalendarWorkDayEntity) => {
    return <p className="capitalize m-0">{mapDayNumberToDayName(t)[entity.dayNumber]}</p>
  }

  const columns: ColumnProps[] = [
    {
      body: dayNumberBodyTemplate,
      field: 'dayNumber',
      header: translate('dayNumber'),
      sortable: false,
      filter: false,
      pt: {
        bodyCell: {
          className: 'align-top',
        },
      },
    },
    {
      body: workingHoursBodyTemplate,
      field: 'workingHours',
      header: translate('workingHours'),
      sortable: false,
      filter: false,
      pt: {
        bodyCell: {
          className: 'align-top',
        },
      },
    },
    {
      body: (entity: LocationCounterCalendarWorkDayEntity) => (
        <BreaksBodyTemplate
          control={control}
          errors={errors}
          workingDayName={dayNumberToDayNameSchemaMapper[entity.dayNumber]}
        />
      ),
      field: 'breaks',
      header: translate('breaks'),
      sortable: false,
      filter: false,
    },
  ]

  return columns
}
