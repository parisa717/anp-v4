import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { useGetCustomerVehiclesQuery } from '@/entities/customerVehicle'

import { CustomerAndVehicleFormType } from '../../../model/formSchema'

export const ResultsList = ({ searchFilters: filters }: { searchFilters: CustomerAndVehicleFormType }) => {
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
    <div>
      <p className="text-shade-700">
        {translate('found')} <p className="inline-block">{customerVehiclesQuery.length} items</p>
      </p>
    </div>
  )
}
