import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { Link } from 'react-router'

import { useGetCurrentLocation } from '@/entities/location'
import { useGetLocationServiceAdvisorsQuery } from '@/entities/locationServiceAdvisor'
import { pageUrls } from '@/shared/lib'

const dataContainerClassName = 'flex flex-col gap-1'
const titleClassName = 'text-lg text-bluegray-500 my-0 mx-0'
const dataDisplayClassName = 'text-xl text-bluegray-700 font-bold mt-0 mb-3 mx-0'

const LocationServiceAdvisorListPage = () => {
  const locationId = useGetCurrentLocation()
  const { data, isSuccess, isError, isLoading } = useGetLocationServiceAdvisorsQuery({ locationId })

  const { t } = useTranslation()

  if (isError) return <div>Error...</div>
  if (isLoading) return <div>Loading...</div>
  if (!isSuccess) return null

  const translate = (key: string) => t(`pages.locationServiceAdvisor.${key}`)

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <section className="flex gap-4 flex-wrap">
        {data.map((serviceAdvisor) => (
          <article className="w-[304px] flex flex-col gap-3 p-7 bg-shade-000" key={serviceAdvisor.id}>
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
            <div>
              <Link to={pageUrls.locationServiceAdvisor.details(serviceAdvisor.id)}>
                <Button
                  link
                  label={t('details')}
                  className="capitalize text-teal-700"
                  icon="pi pi-chevron-right"
                  text
                  iconPos="right"
                />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default LocationServiceAdvisorListPage
