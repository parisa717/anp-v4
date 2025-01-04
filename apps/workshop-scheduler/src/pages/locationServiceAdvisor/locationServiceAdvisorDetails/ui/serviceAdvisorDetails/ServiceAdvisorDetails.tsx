import { View } from 'react-big-calendar'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { useGetServiceAdvisorQuery } from '@/entities/locationServiceAdvisor'
import { IdParam } from '@/shared/lib'

import { dataDisplayClassName, titleClassName } from '../../lib'
import { ServiceAdvisorBufferAppointments } from './bufferAppointments/ServiceAdvisorBufferAppointments'

const dataContainerClassName = 'flex flex-col gap-1'

type Props = {
  selectedDate: Date
  currentView: View
}
export const ServiceAdvisorDetails = ({ selectedDate, currentView }: Props) => {
  const { id: serviceAdvisorId = '' } = useParams<IdParam>()
  const { t } = useTranslation()

  const {
    data: serviceAdvisor,
    isSuccess: isGetServiceAdvisorSuccess,
    isError: isGetServiceAdvisorError,
    isLoading: isGetServiceAdvisorLoading,
  } = useGetServiceAdvisorQuery({ id: serviceAdvisorId })
  const translate = (key: string) => t(`pages.locationServiceAdvisor.${key}`)

  // TODO add error/loading handling
  if (isGetServiceAdvisorError) return <div>Error...</div>
  if (isGetServiceAdvisorLoading) return <div>Loading...</div>
  if (!isGetServiceAdvisorSuccess) return null

  return (
    <article className="w-[304px] flex flex-col gap-3 p-7 bg-shade-000">
      <div className={dataContainerClassName}>
        <p className={titleClassName}>{translate('serviceAdvisor.name')}</p>
        <p className={dataDisplayClassName}>
          {serviceAdvisor.name} {serviceAdvisor.surname}
        </p>
      </div>
      <div className={dataContainerClassName}>
        <p className={titleClassName}>{translate('serviceAdvisor.number')}</p>
        <p className={dataDisplayClassName}>{serviceAdvisor.number}</p>
      </div>
      <div className={dataContainerClassName}>
        <p className={titleClassName}>{translate('serviceAdvisor.receptionInterval')}</p>
        <p className={dataDisplayClassName}>
          {serviceAdvisor.receptionInterval} {translate('serviceAdvisor.minutes')}
        </p>
      </div>
      <div className={dataContainerClassName}>
        <ServiceAdvisorBufferAppointments currentView={currentView} selectedDate={selectedDate} />
      </div>
    </article>
  )
}
