import { useTranslation } from '@nexus-ui/i18n'
import { format } from 'date-fns'
import { Chip } from 'primereact/chip'

import { CustomerAndVehicleFormType } from '../../../../model/formSchema'

export interface Filter {
  value: string | Date | undefined
  label: keyof CustomerAndVehicleFormType
}

const translateFilterLabels = (
  translate: (key: string) => string,
): Record<keyof CustomerAndVehicleFormType, string> => ({
  customerName: translate('customerName'),
  customerBirthDate: translate('customerBirthDate'),
  customerPhone: translate('customerPhone'),
  vehicleLicencePlate: translate('vehicleLicencePlate'),
  vehicleVin: translate('vehicleVin'),
})

const chipPt = {
  root: {
    className: 'bg-bluegray-50 text-shade-700',
  },
}

export const FilterBadge = ({ filter, onRemove }: { filter: Filter; onRemove: () => void }) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.searchForm.${key}`)

  const filterLabel = translateFilterLabels(translate)[filter.label]
  const filterValue = filter.value instanceof Date ? format(filter.value, 'dd.MM.yyyy') : filter.value

  const chipLabel = `${filterLabel}: ${filterValue}`

  return <Chip label={chipLabel} removable onRemove={onRemove} pt={chipPt} />
}
