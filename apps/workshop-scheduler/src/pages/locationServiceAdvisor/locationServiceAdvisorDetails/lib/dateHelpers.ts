import { format, formatISO } from 'date-fns'

export const toISODate = (date: Date) => formatISO(date, { representation: 'date' })
export const toHours = (date: Date) => format(date, 'HH:mm')
export const toDateDisplay = (date: Date) => format(date, 'dd.MM.yyyy')
export const toTimeRange = (entry: { startTime: string | undefined; endTime: string | undefined }) =>
  `${entry.startTime}-${entry.endTime}`
