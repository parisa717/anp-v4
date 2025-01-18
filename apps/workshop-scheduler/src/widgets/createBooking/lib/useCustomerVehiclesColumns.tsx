import { useTranslation } from '@nexus-ui/i18n'
import { format, parse, toDate } from 'date-fns'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { RadioButton } from 'primereact/radiobutton'
import { Tag } from 'primereact/tag'

import { CustomerVehicleDetailsEntity } from '@/entities/customerVehicle'

export const useCustomerVehiclesColumns = ({
  onVehicleSelect,
  selectedVehicle,
  onDetailsClick,
  customerId,
}: {
  onVehicleSelect: (vehicle: CustomerVehicleDetailsEntity) => void
  selectedVehicle: CustomerVehicleDetailsEntity | null
  onDetailsClick: ({ customerId, vehicleId }: { customerId: string; vehicleId: string }) => void
  customerId: string
}) => {
  const { t } = useTranslation()

  const translate = (key: string) =>
    t(`widgets.createBooking.steps.customerAndVehicle.resultItem.tables.customerVehicles.${key}`)

  const actionTemplateBody = (entity: CustomerVehicleDetailsEntity) => (
    <Button
      label={t('details')}
      onClick={() => onDetailsClick({ customerId, vehicleId: entity.id })}
      className="capitalize"
      icon="pi pi-chevron-right"
      text
      iconPos="right"
    />
  )

  const radioButtonTemplateBody = (entity: CustomerVehicleDetailsEntity) => (
    <RadioButton checked={selectedVehicle?.id === entity.id} onChange={() => onVehicleSelect(entity)} />
  )

  const inspectionStatusTemplateBody = (entity: CustomerVehicleDetailsEntity) => {
    const currentTimeDate = new Date().getTime()

    const nextEmissionsTestTimeDate =
      entity.nextEmissionsTest && parse(entity.nextEmissionsTest, 'yyyy-MM-dd', Date.now()).getTime()
    const nextMainInspectionTimeDate =
      entity.nextMainInspection && parse(entity.nextMainInspection, 'yyyy-MM-dd', Date.now()).getTime()

    const isNextEmissionsTestDateInPast = nextEmissionsTestTimeDate && nextEmissionsTestTimeDate < currentTimeDate
    const isNextMainInspectionDateInPast = nextMainInspectionTimeDate && nextMainInspectionTimeDate < currentTimeDate

    return (
      <div className="flex flex-col gap-2">
        {Boolean(isNextEmissionsTestDateInPast) && (
          <Tag
            value={`${translate('nextEmissionsTest')}: ${format(toDate(entity.nextEmissionsTest), 'dd.MM.yyyy')}`}
            pt={{ root: { className: 'bg-red-50' }, value: { className: 'text-bluegray-700' } }}
          />
        )}
        {Boolean(isNextMainInspectionDateInPast) && (
          <Tag
            value={`${translate('nextMainInspection')}: ${format(toDate(entity.nextMainInspection), 'dd.MM.yyyy')}`}
            pt={{ root: { className: 'bg-red-50' }, value: { className: 'text-bluegray-700' } }}
          />
        )}
        {Boolean(!isNextEmissionsTestDateInPast) && Boolean(!isNextMainInspectionDateInPast) && (
          <Tag value="OK" pt={{ root: { className: 'bg-green-50' }, value: { className: 'text-bluegray-700' } }} />
        )}
      </div>
    )
  }

  const columns: ColumnProps[] = [
    {
      pt: {
        headerCell: {
          className: 'text-[#55727C] bg-teal-50 border-none p-2',
        },
        bodyCell: {
          className: 'text-shade-700',
        },
      },
      body: radioButtonTemplateBody,
    },
    {
      field: 'licencePlate',
      header: translate('vehicleLicencePlate'),
      pt: {
        headerCell: {
          className: 'text-[#55727C] bg-teal-50 border-none p-2',
        },
        bodyCell: {
          className: 'text-shade-700',
        },
      },
    },
    {
      field: 'vin',
      header: translate('vehicleVin'),
      pt: {
        headerCell: {
          className: 'text-[#55727C] bg-teal-50 border-none p-2',
        },
        bodyCell: {
          className: 'text-shade-700 uppercase',
        },
      },
    },
    {
      field: 'brand',
      header: translate('brand'),
      pt: {
        headerCell: {
          className: 'text-[#55727C] bg-teal-50 border-none p-2',
        },
        bodyCell: {
          className: 'text-shade-700 uppercase',
        },
      },
    },
    {
      field: 'model',
      header: translate('model'),
      pt: {
        headerCell: {
          className: 'text-[#55727C] bg-teal-50 border-none p-2',
        },
        bodyCell: {
          className: 'text-shade-700 uppercase',
        },
      },
    },
    // TODO add a column after backend API changes
    // {
    //   field: 'type',
    //   header: translate('type'),
    //   pt: columnPt,
    // },
    {
      header: translate('inspectionStatus'),
      pt: {
        headerCell: {
          className: 'text-[#55727C] bg-teal-50 border-none flex justify-center',
        },
        bodyCell: {
          className: 'flex items-center justify-center',
        },
      },
      body: inspectionStatusTemplateBody,
    },
    {
      pt: {
        headerCell: {
          className: 'bg-teal-50 border-none p-2',
        },
        bodyCell: {
          className: 'p-0',
        },
      },
      body: actionTemplateBody,
    },
  ]

  return columns
}
