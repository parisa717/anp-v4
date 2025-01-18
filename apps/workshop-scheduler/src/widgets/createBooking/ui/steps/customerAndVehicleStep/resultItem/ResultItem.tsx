import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'

import { CustomerVehicleDetailsEntity } from '@/entities/customerVehicle'
import { GqlGetCustomerVehiclesCustomerVehiclesObjectType } from '@/shared/api/types.generated'

import { useCustomerPersonalDataColumns } from '../../../../lib/useCustomerPersonalDataColumns'
import { useCustomerVehiclesColumns } from '../../../../lib/useCustomerVehiclesColumns'

interface ResultItemProps {
  selectedVehicle: CustomerVehicleDetailsEntity | null
  data: GqlGetCustomerVehiclesCustomerVehiclesObjectType
  onVehicleSelect: (vehilce: CustomerVehicleDetailsEntity) => void
  onDetailsClick: ({ customerId, vehicleId }: { customerId: string; vehicleId: string }) => void
}

export const ResultItem = ({ onDetailsClick, data, onVehicleSelect, selectedVehicle }: ResultItemProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.resultItem.${key}`)

  const customerPersonalDataColumns = useCustomerPersonalDataColumns()
  const customerVehiclesColumns = useCustomerVehiclesColumns({
    onVehicleSelect,
    selectedVehicle,
    onDetailsClick,
    customerId: data.id,
  })

  return (
    <div className="border-[0.5px] border-solid border-bluegray-100 rounded py-6 px-7">
      <DataTable columns={customerPersonalDataColumns} data={[data]} />
      <Divider />
      <div className="flex items-center gap-3 mb-3">
        <p className="m-0 font-bold">{translate('customerVehicles')}</p>
        <Button
          label={translate('buttons.addVehicleDraft')}
          className="capitalize"
          icon="pi pi-plus"
          iconPos="right"
          text
        />
      </div>
      <DataTable size="small" columns={customerVehiclesColumns} data={data.vehicles} />
    </div>
  )
}
