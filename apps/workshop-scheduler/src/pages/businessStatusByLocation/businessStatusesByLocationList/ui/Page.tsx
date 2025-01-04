import { useTranslation } from '@nexus-ui/i18n'
import { useState } from 'react'
import { Outlet } from 'react-router'

import { BusinessStatusMode, StatusDataSection } from '@/widgets/StatusDataSection'

import { LocationOverbookingCapacity } from '../model'
import { LocationOverbooking } from './locationOverbooking/LocationOverbooking'

const LOCATION_ID = '1'
const BusinessStatusesByLocationListPage = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.businessStatusByLocation.businessStatusByLocationList.${key}`)

  const [currentlyEditedOverbooking, setCurrentlyEditedOverbooking] = useState<LocationOverbookingCapacity | null>(null)

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <section className="flex flex-col gap-16">
        <div className="flex flex-row gap-4">
          <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.ByLocation} />
          <StatusDataSection isAdditionalBusinessStatus mode={BusinessStatusMode.ByLocation} />
        </div>
        <div className="flex flex-row gap-4">
          <LocationOverbooking
            type={LocationOverbookingCapacity.Warning}
            locationId={LOCATION_ID}
            isEditingDisabled={currentlyEditedOverbooking === LocationOverbookingCapacity.Maximum}
            onChangeEditedType={setCurrentlyEditedOverbooking}
          />
          <LocationOverbooking
            type={LocationOverbookingCapacity.Maximum}
            locationId={LOCATION_ID}
            isEditingDisabled={currentlyEditedOverbooking === LocationOverbookingCapacity.Warning}
            onChangeEditedType={setCurrentlyEditedOverbooking}
          />
        </div>
      </section>
      <Outlet />
    </main>
  )
}

export default BusinessStatusesByLocationListPage
