import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { CalendarFormField } from '@nexus-ui/ui'
import clsx from 'clsx'
import { addMinutes, set } from 'date-fns'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { useMemo } from 'react'
import { Event } from 'react-big-calendar'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { useUpdateServiceAdvisorCalendarEntryMutation } from '@/entities/locationServiceAdvisor'
import { CalendarEntryPeriodEnum, CalendarEntryTypeEnum } from '@/shared/api/types.generated'
import { IdParam } from '@/shared/lib'

import { toHours, toISODate } from '../../../../../lib/dateHelpers'
import {
  EditBufferAppointmentFormSchema,
  editBufferAppointmentFormSchemaInitValues,
  getEditBufferAppointmentFormSchema,
} from '../../../../../model/calendar/entry/editBufferAppointmentFormSchema'

const rowContainer = 'flex justify-between items-center'
const buttonBase = 'capitalize text-base leading-5'

type Props = {
  entry: Event
  onCancel: VoidFunction
  onSave: VoidFunction
}
const ptCalendar = {
  root: { className: 'w-[200px]' },
}
const classNameCalendar = {
  container: 'w-[200px]',
}
const ptTime = {
  root: { className: 'w-[120px]' },
}
const classNameTime = {
  container: 'w-[120px]',
}
const dateFormat = 'dd-mm-yy'
export const CalendarEntryBufferAppointmentEdit = ({ entry, onCancel, onSave }: Props) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.locationServiceAdvisor.details.bufferAppointments.edit.${key}`)
  const { id: serviceAdvisorId = '' } = useParams<IdParam>()

  const [updateServiceAdvisorCalendarEntry, { isLoading }] = useUpdateServiceAdvisorCalendarEntryMutation()
  const values: EditBufferAppointmentFormSchema = useMemo(
    () => ({
      date: entry.start ? new Date(entry.start) : new Date(),
      startTime: set(new Date(), {
        hours: entry.resource.startTime.split(':')[0],
        minutes: entry.resource.startTime.split(':')[1],
      }),
      endTime: set(new Date(), {
        hours: entry.resource.endTime.split(':')[0],
        minutes: entry.resource.endTime.split(':')[1],
      }),
      isPeriodic: entry.resource.period === CalendarEntryPeriodEnum.Weekly,
      periodicEnd: entry.resource.periodicEnd ? new Date(entry.resource.periodicEnd) : null,
    }),
    [entry.start, entry.resource.period, entry.resource.periodicEnd, entry.resource.endTime, entry.resource.startTime],
  )
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditBufferAppointmentFormSchema>({
    values,
    defaultValues: editBufferAppointmentFormSchemaInitValues,
    resolver: zodResolver(getEditBufferAppointmentFormSchema(t)),
  })

  const isEventPeriodic = watch('isPeriodic')

  const handleSubmitForm = async (data: EditBufferAppointmentFormSchema) => {
    const timeZoneOffset = new Date().getTimezoneOffset()
    try {
      await updateServiceAdvisorCalendarEntry({
        advisorId: serviceAdvisorId,
        entryId: entry.resource.id,
        isFullDay: false,
        period: isEventPeriodic ? CalendarEntryPeriodEnum.Weekly : CalendarEntryPeriodEnum.None,
        type: CalendarEntryTypeEnum.AdvisorBuffer,
        endDate: toISODate(data.date),
        startDate: toISODate(data.date),
        endTime: toHours(addMinutes(data.endTime, timeZoneOffset)),
        startTime: toHours(addMinutes(data.startTime, timeZoneOffset)),
        periodicEnd: isEventPeriodic && data.periodicEnd ? toISODate(data.periodicEnd) : null,
      })
      onSave()
    } catch {
      //TODO: handle errors
    }
  }

  //TODO: add proper loading handling
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="px-20 py-16 flex flex-col gap-9">
      <p className="m-0 text-bluegray-700 text-text-4xl-semibold-lineheight-100 font-bold self-center">
        {translate('title')}
      </p>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-7 mb-2">
            <p className="m-0 text-bluegray-700 text-text-3xl-regular-lineheight-150">{translate('bufferDate')}</p>
            <div className="flex flex-row gap-4">
              <CalendarFormField
                hasFloatLabel
                name="date"
                label={translate('date')}
                showIcon
                control={control}
                error={errors.date}
                pt={ptCalendar}
                className={classNameCalendar}
                appendTo={'self'}
                dateFormat={dateFormat}
              />
              <CalendarFormField
                hasFloatLabel
                name="startTime"
                label={translate('startTime')}
                showIcon
                timeOnly
                className={classNameTime}
                control={control}
                error={errors.startTime}
                appendTo={'self'}
                pt={ptTime}
              />
              <CalendarFormField
                hasFloatLabel
                name="endTime"
                label={translate('endTime')}
                showIcon
                className={classNameTime}
                timeOnly
                control={control}
                error={errors.endTime}
                pt={ptTime}
                appendTo={'self'}
              />
            </div>
            <div className="flex flex-row align-middle gap-2 items-baseline">
              <label className="flex items-center gap-4 text-bluegray-500 ">
                {translate('periodic')}
                <Controller
                  name="isPeriodic"
                  control={control}
                  render={({ field }) => (
                    <InputSwitch {...field} checked={field.value} value={field.value.toString()} />
                  )}
                />
              </label>
              {isEventPeriodic && (
                <CalendarFormField
                  hasFloatLabel
                  name="periodicEnd"
                  showIcon
                  label={translate('periodicEndDate')}
                  control={control}
                  error={errors.periodicEnd}
                  pt={ptCalendar}
                  className={classNameCalendar}
                  appendTo={'self'}
                  dateFormat={dateFormat}
                />
              )}
            </div>
          </div>
          <div className={clsx(rowContainer, 'gap-32')}>
            <Button onClick={onCancel} label={t('cancel')} className={clsx(buttonBase, 'text-bluegray-500')} outlined />
            <Button type="submit" label={t('save')} className={clsx(buttonBase, 'bg-teal-700')} />
          </div>
        </div>
      </form>
    </div>
  )
}
