import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

import { CustomerInfo } from './customerInfo'
import { VehicleInfo } from './vehicleInfo'

interface DetailsViewProps {
  onBack: () => void
  customerId: string
  vehicleId: string
}

export const DetailsView = ({ onBack, customerId, vehicleId }: DetailsViewProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.detailsView.${key}`)

  return (
    <div className="flex flex-col gap-4 text-bluegray-700">
      <div className="flex items-center gap-2 mb-2">
        <Button icon="pi pi-arrow-left" onClick={onBack} severity="secondary" text size="large" />
        <h1 className="text-[28px] m-0 font-semibold">{translate('customerAndVehicleDetails')}</h1>
      </div>
      <div className="flex flex-col rounded border-[0.5px] border-solid border-bluegray-200 p-7 gap-7">
        <div className="flex gap-2.5">
          <h3 className="m-0 text-[28px] font-medium">{translate('customerInfoSection.title')}</h3>
          <Button
            label={translate('buttons.editData')}
            className="capitalize"
            severity="secondary"
            icon="pi pi-pencil"
            text
            iconPos="right"
          />
        </div>
        <CustomerInfo customerId={customerId} />
      </div>
      <div className="flex flex-col rounded border-[0.5px] border-solid border-bluegray-200 p-7 gap-7">
        <div className="flex gap-2.5">
          <h3 className="m-0 text-[28px] font-semibold">{translate('vehicleInfoSection.title')}</h3>
          <Button
            label={translate('buttons.editData')}
            className="capitalize"
            severity="secondary"
            icon="pi pi-pencil"
            text
            iconPos="right"
          />
        </div>
        <VehicleInfo vehicleId={vehicleId} />
      </div>
    </div>
  )
}
