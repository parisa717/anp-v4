import { useTranslation } from '@nexus-ui/i18n'
import { Outlet } from 'react-router'

import { CounterCalendarSection } from './counterCalendarSection/ui/CounterCalendarSection'
import { CounterReceptionIntervalSection } from './couterReceptionIntervalSection/ui/CounterReceptionIntervalSection'

const CounterConfigurationPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.counterConfiguration.${key}`)

  return (
    <main>
      <h1 className="text-headline mt-0" data-cy="counter-configuration-title">
        {translate('title')}
      </h1>
      <div className="flex gap-8">
        <CounterCalendarSection />
        <CounterReceptionIntervalSection />
      </div>
      <Outlet />
    </main>
  )
}

export default CounterConfigurationPage
