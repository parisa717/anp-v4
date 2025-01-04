import { Calendar, CalendarBaseProps } from 'primereact/calendar'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { hoursAndMinutesToDate, TIME_SEPARATOR } from '../../../../utils/lib/'

const LEADING_ZERO = '0'

interface CalendarTimeOnlyFieldProps<T extends FieldValues> extends Omit<CalendarBaseProps, 'name'> {
  control: Control<T>
  name: Path<T>
}

export const CalendarTimeOnlyField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: CalendarTimeOnlyFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Calendar
        value={hoursAndMinutesToDate(field.value)}
        onChange={(event) => {
          if (!event.value) return
          const date = new Date(event.value)

          const hours = String(date.getHours()).padStart(2, LEADING_ZERO)
          const minutes = String(date.getMinutes()).padStart(2, LEADING_ZERO)

          field.onChange(`${hours}${TIME_SEPARATOR}${minutes}`)
        }}
        timeOnly
        showIcon
        icon={() => <i className="pi pi-clock" />}
        {...rest}
      />
    )}
  />
)
