import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { useState } from 'react'

import { CustomerVehicleDetailsEntity } from '@/entities/customerVehicle'

import { CustomerAndVehicleFormType } from '../../../model/formSchema'
import { StepFooter, StepFooterProps } from '../../stepFooter'
import { StepWrapper } from '../../stepWrapper'
import { DetailsView } from './detailsView'
import { ResultsList } from './resultsList'
import { SearchForm } from './searchForm'

export const CustomerAndVehicleStep = ({ stepFooterProps = {} }: { stepFooterProps?: Partial<StepFooterProps> }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<CustomerVehicleDetailsEntity | null>(null)
  const [showSelectVehicleErrorMessage, setShowSelectVehicleErrorMessage] = useState(false)
  const [filters, setFilters] = useState<CustomerAndVehicleFormType | null>(null)
  const [isDetailsView, setIsDetailsView] = useState(false)
  const [customerId, setCustomerId] = useState('')
  const [vehicleId, setVehicleId] = useState('')

  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.${key}`)

  const handleSelectVehicleErrorMessageShow = () => setShowSelectVehicleErrorMessage(true)
  const handleSelectVehicleErrorMessageHide = () => setShowSelectVehicleErrorMessage(false)

  const handleVehicleSelect = (vehicle: CustomerVehicleDetailsEntity) => {
    setSelectedVehicle(vehicle)
    handleSelectVehicleErrorMessageHide()
  }

  const handleCustomerSearch = (data: CustomerAndVehicleFormType) => setFilters(data)

  const handleDetailsViewEnter = ({ customerId, vehicleId }: { customerId: string; vehicleId: string }) => {
    setCustomerId(customerId)
    setVehicleId(vehicleId)
    setIsDetailsView(true)
    handleSelectVehicleErrorMessageHide()
  }
  const handleDetailsViewLeave = () => setIsDetailsView(false)

  const disableNextButton = Boolean(!selectedVehicle)

  return (
    <StepWrapper
      className={{ root: 'h-[1312px]', children: 'justify-between' }}
      footer={
        <StepFooter
          {...stepFooterProps}
          onNext={disableNextButton ? handleSelectVehicleErrorMessageShow : stepFooterProps.onNext}
          nextButtonPt={disableNextButton ? { root: { className: 'opacity-60 cursor-default' } } : {}}
        />
      }
    >
      {isDetailsView ? (
        <DetailsView onBack={handleDetailsViewLeave} customerId={customerId} vehicleId={vehicleId} />
      ) : (
        <>
          <div className="flex flex-col gap-6 text-bluegray-700 ">
            <h1 className="text-[28px] mt-0 mb-1 font-semibold">{translate('steps.customerAndVehicle.title')}</h1>
            <div className="flex justify-between items-center">
              <h3 className="text-[24px] m-0 font-semibold">{translate('steps.customerAndVehicle.subtitle')}</h3>
              <Button
                label={translate('buttons.addDraft')}
                className="capitalize"
                icon="pi pi-plus"
                iconPos="right"
                text
              />
            </div>
            <SearchForm onSearch={handleCustomerSearch} />
          </div>
          {filters && (
            <ResultsList
              searchFilters={filters}
              selectedVehicle={selectedVehicle}
              onVehicleSelect={handleVehicleSelect}
              onDetailsClick={handleDetailsViewEnter}
            />
          )}
          {showSelectVehicleErrorMessage && (
            <Message
              severity="warn"
              text={translate('steps.customerAndVehicle.messages.warn.unselectedVehicle')}
              pt={{
                root: { className: 'justify-start' },
                text: { className: 'text-orange-500' },
                icon: { className: 'text-orange-500' },
              }}
            />
          )}
        </>
      )}
    </StepWrapper>
  )
}
