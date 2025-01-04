import { useTranslation } from '@nexus-ui/i18n'
import { BreadCrumb } from 'primereact/breadcrumb'
import { useState } from 'react'
import { View } from 'react-big-calendar'

import { useGetBreadcrumbItems } from '../lib'
import { ServiceAdvisorCalendar } from './serviceAdvisorCalendar/ServiceAdvisorCalendar'
import { ServiceAdvisorDetails } from './serviceAdvisorDetails/ServiceAdvisorDetails'

const LocationServiceAdvisorDetailsPage = () => {
  const { t } = useTranslation()
  const breadcrumbItems = useGetBreadcrumbItems()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentView, setCurrentView] = useState<View>('month')

  const translate = (key: string) => t(`pages.locationServiceAdvisor.details.${key}`)

  return (
    <main>
      <BreadCrumb model={breadcrumbItems} className="border-none bg-[transparent]" />
      <h1 className="text-headline">{translate('title')}</h1>
      <div className="flex gap-4">
        <section className="shrink-0">
          <ServiceAdvisorDetails selectedDate={selectedDate} currentView={currentView} />
        </section>
        <section className="grow">
          <ServiceAdvisorCalendar
            onChangeSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            currentView={currentView}
            onChangeView={setCurrentView}
          />
        </section>
      </div>
    </main>
  )
}

export default LocationServiceAdvisorDetailsPage
