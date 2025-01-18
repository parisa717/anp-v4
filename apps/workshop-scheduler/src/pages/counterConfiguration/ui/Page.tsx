import { useTranslation } from '@nexus-ui/i18n'
import { Outlet } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { CounterCalendarSection } from './counterCalendarSection/ui/CounterCalendarSection'
import { CounterReceptionIntervalSection } from './counterReceptionIntervalSection/ui/CounterReceptionIntervalSection'

const CounterConfigurationPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.counterConfiguration.${key}`)

  return (
    <main>
      <h1 className="text-headline mt-0" data-cy="counter-configuration-title">
        {translate('title')}
      </h1>
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.CounterConfiguration.Root} className="mb-8" />
      <div className="flex gap-8">
        <CounterCalendarSection />
        <CounterReceptionIntervalSection />
      </div>
      <Outlet />
    </main>
  )
}

export default CounterConfigurationPage
