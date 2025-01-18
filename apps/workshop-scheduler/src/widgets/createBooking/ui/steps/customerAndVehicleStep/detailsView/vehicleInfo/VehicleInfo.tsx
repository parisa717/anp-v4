import { useTranslation } from '@nexus-ui/i18n'
import { format, toDate } from 'date-fns'

import { useGetVehicleQuery } from '@/entities/vehicle'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { LabelValue } from '../../../../labelValue'

export const VehicleInfo = ({ vehicleId }: { vehicleId: string }) => {
  const { t } = useTranslation()
  const translate = (key: string) =>
    t(`widgets.createBooking.steps.customerAndVehicle.detailsView.vehicleInfoSection.${key}`)

  const { data: vehicleQueryData, isLoading: isVehicleQueryLoading } = useGetVehicleQuery({ id: vehicleId })

  // TODO add loading handling
  if (isVehicleQueryLoading) return <div>Loading...</div>
  if (!vehicleQueryData) return <div>No vehicle data found</div>

  const {
    licencePlate,
    brand,
    model,
    type,
    status,
    firstRegistration,
    customerRegistration,
    mileage,
    nextMainInspection,
    nextEmissionsTest,
    vin,
    modelNumber,
    areTyresStored,
  } = vehicleQueryData

  return (
    <div className="flex">
      <ServerSideErrorsMessagesList page="global" className="mb-8" />
      {/* Licence container */}
      <div className="flex flex-1 flex-col gap-2">
        <LabelValue label={translate('registrationNumber')} value={licencePlate} />
        <LabelValue label={translate('brand')} value={brand} />
        <LabelValue label={translate('model')} value={model} />
        <LabelValue label={translate('type')} value={type} />
        <LabelValue label={translate('vehicleStatus')} value={status} />
        <LabelValue label={translate('firstRegistration')} value={format(toDate(firstRegistration), 'dd.MM.yyyy')} />
        <LabelValue
          label={translate('customerRegistrationDate')}
          value={format(toDate(customerRegistration), 'dd.MM.yyyy')}
        />
      </div>
      {/* Mileage container */}
      <div className="flex flex-1 flex-col gap-2">
        <LabelValue label={translate('mileage')} value={mileage} />
        <LabelValue
          label={translate('nextMainInspectionDate')}
          value={format(toDate(nextMainInspection), 'dd.MM.yyyy')}
        />
        <LabelValue
          label={translate('nextEmissionsInspectionDate')}
          value={format(toDate(nextEmissionsTest), 'dd.MM.yyyy')}
        />
        <LabelValue label={translate('chassisNumber')} value={vin} />
        <LabelValue label={translate('vehicleModelNumber')} value={modelNumber} />
        <LabelValue label={translate('tyreStorageStatus')} value={areTyresStored ? t('stored') : t('notStored')} />
      </div>
    </div>
  )
}
