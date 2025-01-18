import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Link, useNavigate } from 'react-router'

import {
  addAvailabilityColor,
  AVAILABILITY_COLORS_CREATION_LIMIT,
  useAvailabilityColorsListData,
} from '@/entities/availabilityColor'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { useColorSetupListPageColumns } from '../lib/useColumns'

const NEW_AVAILABILITY_COLOR = {
  id: '',
  color: '#000000',
  capacityValue: '',
  minimalCapacity: 0,
}

const ColorSetupListPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.colorSetup.colorSetupList.${key}`)

  const { availabilityColors, isLoading } = useAvailabilityColorsListData()

  const columns = useColorSetupListPageColumns()
  const isAddNewColorButtonDisabled = availabilityColors.length >= AVAILABILITY_COLORS_CREATION_LIMIT

  const handleAddNewColorAndRedirect = () => {
    dispatch(addAvailabilityColor(NEW_AVAILABILITY_COLOR))
    navigate(pageUrls.colorSetup.edit())
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <section className="flex flex-row">
        <section className="flex flex-col gap-9 basis-1/2">
          <ServerSideErrorsMessagesList page={ROUTE_PATHS.ColorSetup.Root} className="mb-8" />
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl text-bluegray-700 m-0 font-normal">{translate('capacitiesColors')}</h3>
            <div className="flex flex-row gap-2">
              <Button
                label={translate('addColor')}
                disabled={isAddNewColorButtonDisabled}
                severity="secondary"
                outlined
                onClick={handleAddNewColorAndRedirect}
              />
              <Link to={pageUrls.colorSetup.edit()}>
                <Button label={translate('editColors')} severity="secondary" outlined />
              </Link>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={availabilityColors}
            emptyMessage={translate('table.empty')}
            cellClassName={() => 'border-none'}
          />
        </section>
      </section>
    </main>
  )
}

export default ColorSetupListPage
