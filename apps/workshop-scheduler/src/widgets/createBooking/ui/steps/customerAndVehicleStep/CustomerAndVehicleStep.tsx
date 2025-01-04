import { Button } from 'primereact/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CustomerAndVehicleFormType } from '../../../model/formSchema'
import { ResultsList } from './ResultsList'
import { SearchForm } from './SearchForm'

export const CustomerAndVehicleStep = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.${key}`)

  const [filters, setFilters] = useState<CustomerAndVehicleFormType | null>(null)

  const handleCustomerSearch = (data: CustomerAndVehicleFormType) => setFilters(data)

  return (
    <div className="flex flex-col gap-6 text-bluegray-700">
      <h1 className="text-[28px] mt-0 mb-1 font-semibold">{translate('steps.customerAndVehicle.title')}</h1>
      <div className="flex justify-between items-center">
        <h3 className="text-[24px] m-0 font-semibold">{translate('steps.customerAndVehicle.subtitle')}</h3>
        <Button label={translate('buttons.addDraft')} className="capitalize" icon="pi pi-plus" iconPos="right" text />
      </div>
      <SearchForm onSearch={handleCustomerSearch} />
      {filters && <ResultsList searchFilters={filters} />}
    </div>
  )
}
