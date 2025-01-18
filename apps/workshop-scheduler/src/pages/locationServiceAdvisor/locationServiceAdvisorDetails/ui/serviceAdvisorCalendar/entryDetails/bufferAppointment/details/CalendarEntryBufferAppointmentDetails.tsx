import { useTranslation } from '@nexus-ui/i18n'
import clsx from 'clsx'
import { Button } from 'primereact/button'
import { Event } from 'react-big-calendar'

import { CalendarEntryPeriodEnum } from '@/shared/api/types.generated'

import { toDateDisplay, toTimeRange } from '../../../../../lib'

const rowContainer = 'flex justify-between items-center'
const dataContainer = 'flex flex-col justify-start gap-1'
const headerText = 'm-0 text-base-regular-lineheight-150'
const dataText = 'm-0 text-xl font-semibold leading-6'
const buttonBase = 'capitalize text-base leading-5'

type Props = {
  entry: Event
  onClose: VoidFunction
  onOpenEdit: VoidFunction
}

export const CalendarEntryBufferAppointmentDetails = ({ entry, onClose, onOpenEdit }: Props) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.locationServiceAdvisor.details.bufferAppointments.details.${key}`)
  const isEventPeriodic = entry.resource.period === CalendarEntryPeriodEnum.Weekly

  return (
    <div className="px-20 py-16 flex flex-col gap-9">
      <div className={rowContainer}>
        <p className="m-0 text-bluegray-700 text-text-4xl-semibold-lineheight-100 font-bold">{translate('title')}</p>
        <Button icon="pi pi-times text-bluegray-700" text title={'close'} size="large" onClick={onClose} />
      </div>
      <div className="flex flex-col gap-4">
        <p className="m-0 text-bluegray-700 text-text-3xl-regular-lineheight-150">{translate('bufferDate')}</p>
        <div className={clsx(rowContainer, 'gap-7', !isEventPeriodic && '!justify-start')}>
          <div className={dataContainer}>
            <p className={headerText}>{translate('date')}</p>
            <p className={dataText}>{entry.start && toDateDisplay(entry.start)}</p>
          </div>
          <div className={dataContainer}>
            <p className={headerText}>{translate('time')}</p>
            <p className={dataText}>{toTimeRange(entry.resource)}</p>
          </div>
          {isEventPeriodic && (
            <div className={dataContainer}>
              <p className={headerText}>{translate('endDate')}</p>
              <p className={dataText}>
                {entry.resource.periodicEnd && toDateDisplay(new Date(entry.resource.periodicEnd))}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={clsx(rowContainer, 'gap-32')}>
        <Button
          onClick={() => {}} //TODO: handle remove
          label={translate('delete')}
          className={clsx(buttonBase, 'text-bluegray-500')}
          icon="pi pi-trash"
          iconPos="right"
          outlined
        />
        <Button
          onClick={onOpenEdit}
          label={t('edit')}
          className={clsx(buttonBase, 'bg-teal-700')}
          icon="pi pi-pencil"
          iconPos="right"
        />
      </div>
    </div>
  )
}
