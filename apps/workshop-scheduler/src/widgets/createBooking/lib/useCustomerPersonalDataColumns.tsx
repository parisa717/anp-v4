import { useTranslation } from '@nexus-ui/i18n'
import { ColumnProps } from 'primereact/column'

import { CustomerVehicleEntity } from '@/entities/customerVehicle'

const columnPt = {
  headerCell: {
    className: 'font-normal text-bluegray-500 p-0 border-none',
  },
  bodyCell: {
    className: 'font-bold text-bluegray-700 text-xl p-0 border-none',
  },
}

export const useCustomerPersonalDataColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) =>
    t(`widgets.createBooking.steps.customerAndVehicle.resultItem.tables.customerPersonalData.${key}`)

  const phoneTemplateBody = (entity: CustomerVehicleEntity) => {
    return entity.phones.map((phone) => phone.phone).join(', ')
  }

  const columns: ColumnProps[] = [
    {
      field: 'name',
      header: translate('name'),
      pt: columnPt,
    },
    {
      field: 'birthdate',
      header: translate('birthdate'),
      pt: columnPt,
    },
    {
      field: 'address',
      header: translate('address'),
      pt: columnPt,
    },
    {
      field: 'postCode',
      header: translate('zipCode'),
      pt: columnPt,
    },
    {
      field: 'city',
      header: translate('city'),
      pt: columnPt,
    },
    {
      field: 'phone',
      header: translate('phone'),
      body: phoneTemplateBody,
      pt: columnPt,
    },
  ]

  return columns
}
