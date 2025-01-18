import { useTranslation } from '@nexus-ui/i18n'
import { format } from 'date-fns'
import { Divider } from 'primereact/divider'

import { CustomerVehicleDetailsEntity, useGetCustomerVehiclesQuery } from '@/entities/customerVehicle'

import { CustomerAndVehicleFormType } from '../../../../model/formSchema'
import { ResultItem } from '../resultItem'

interface ResultsList {
  selectedVehicle: CustomerVehicleDetailsEntity | null
  onVehicleSelect: (vehicle: CustomerVehicleDetailsEntity) => void
  searchFilters: CustomerAndVehicleFormType
  onDetailsClick: ({ customerId, vehicleId }: { customerId: string; vehicleId: string }) => void
}

export const ResultsList = ({
  searchFilters: filters,
  onVehicleSelect,
  selectedVehicle,
  onDetailsClick,
}: ResultsList) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.resultsList.${key}`)

  const filter = {
    ...filters,
    customerBirthDate: filters.customerBirthDate ? format(filters.customerBirthDate, 'yyyy-MM-dd') : undefined,
  }

  const {
    data: customerVehiclesQuery,
    isLoading: isCustomerVehiclesQueryLoading,
    isError: isCustomerVehiclesQueryError,
  } = useGetCustomerVehiclesQuery({ filter }, { skip: Boolean(!filters) })

  // TODO add error/loading handling
  if (isCustomerVehiclesQueryLoading) return <div>Loading...</div>
  if (isCustomerVehiclesQueryError) return <div>Error occured!</div>
  if (!customerVehiclesQuery?.length) return <div>No results found</div>

  return (
    <>
      <Divider />
      <p className="text-shade-700 m-0 text-bluegray-700 mb-5">
        {translate('found')}{' '}
        <span className="text-teal-700 font-semibold m-0">
          {customerVehiclesQuery.length} {customerVehiclesQuery.length === 1 ? t('item') : t('items')}
        </span>
      </p>
      <div className="flex flex-col overflow-scroll h-full flex-[1_1_0] gap-2.5">
        {customerVehiclesQuery.map((queryItem) => (
          <ResultItem
            key={queryItem.id}
            data={queryItem}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={onVehicleSelect}
            onDetailsClick={onDetailsClick}
          />
        ))}
      </div>
    </>
  )
}
