import { useTranslation } from '@nexus-ui/i18n'
import { ColumnProps } from 'primereact/column'

import { LocationCounterCalendarWorkDayEntity, mapDayNumberToDayName } from '@/entities/locationCounterCalendar'

export const useColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.counterConfiguration.sections.counterCalendar.table.columnHeaders.${key}`)

  const breaksBodyTemplate = (entity: LocationCounterCalendarWorkDayEntity) => {
    if (!entity.breaks.length) return <>&#8213;</>

    return entity.breaks.map((b, index) => <div key={index}>{`${b?.startTime} - ${b?.endTime}`}</div>)
  }

  const workingHoursBodyTemplate = (entity: LocationCounterCalendarWorkDayEntity) =>
    `${entity.startTime} - ${entity.endTime}`

  const dayNumberBodyTemplate = (entity: LocationCounterCalendarWorkDayEntity) => (
    <p className="capitalize m-0">{mapDayNumberToDayName(t)[entity.dayNumber]}</p>
  )

  const columns: ColumnProps[] = [
    {
      body: dayNumberBodyTemplate,
      field: 'dayNumber',
      header: translate('dayNumber'),
      sortable: false,
      filter: false,
    },
    {
      body: workingHoursBodyTemplate,
      field: 'workingHours',
      header: translate('workingHours'),
      sortable: false,
      filter: false,
    },
    {
      body: breaksBodyTemplate,
      field: 'breaks',
      header: translate('breaks'),
      sortable: false,
      filter: false,
    },
  ]

  return columns
}
