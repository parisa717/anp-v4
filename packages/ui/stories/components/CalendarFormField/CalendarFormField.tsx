import clsx from 'clsx'
import { Calendar, CalendarBaseProps } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import { memo, RefAttributes } from 'react'
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

interface BaseCalendarProps extends Omit<CalendarBaseProps, 'className'> {
  error?: FieldError
  label?: string
  hasFloatLabel?: boolean
  className?: {
    container?: string
    calendar?: string
    label?: string
    floatLabelContainer?: string
    error?: string
  }
}

interface CalendarFormFieldProps<T extends FieldValues> extends BaseCalendarProps, RefAttributes<HTMLInputElement> {
  control: Control<T>
  name: Path<T>
}

interface MemoizedCalendarProps<T extends FieldValues> extends BaseCalendarProps {
  field: ControllerRenderProps<T, Path<T>>
}

function MemoizedCalendar<T extends FieldValues>({
  field,
  error,
  hasFloatLabel,
  label,
  className,
  invalid,
  ...otherProps
}: MemoizedCalendarProps<T>) {
  const calendarElement = (
    <Calendar
      id={field.name}
      {...otherProps}
      {...field}
      onChange={(event) => field.onChange(event.value)}
      invalid={Boolean(invalid || error?.message)}
      inputClassName={className?.calendar}
    />
  )

  if (hasFloatLabel) {
    return (
      <FloatLabel
        pt={{
          root: {
            className: className?.floatLabelContainer,
          },
        }}
      >
        {calendarElement}
        {label && (
          <label htmlFor={field.name} className={clsx(className?.label)}>
            {label}
          </label>
        )}
      </FloatLabel>
    )
  }

  return (
    <>
      {label && (
        <label htmlFor={field.name} className={clsx('pb-2 block', className?.label)}>
          {label}
        </label>
      )}
      {calendarElement}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const MemoizedCalendarComponent = memo(MemoizedCalendar) as typeof MemoizedCalendar

export const CalendarFormField = <T extends FieldValues>({
  control,
  name,
  error,
  label,
  hasFloatLabel,
  className,
  ...otherProps
}: CalendarFormFieldProps<T>) => {
  return (
    <div className={className?.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MemoizedCalendarComponent<T>
            field={field}
            error={error}
            hasFloatLabel={hasFloatLabel}
            label={label}
            className={className}
            {...otherProps}
          />
        )}
      />
      {error && <p className={clsx('text-error pt-1', className?.error)}>{error.message}</p>}
    </div>
  )
}
