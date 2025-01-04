import { useTranslation } from '@nexus-ui/i18n'
import { ColumnProps } from 'primereact/column'

import { LocationEntity } from '@/entities/location'

export const useLocationColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.location.locationDetails.locationTable.headers.${key}`)

  const columns: ColumnProps[] = [
    {
      field: 'code',
      header: translate('locationId'),
      pt: {
        bodyCell: {
          className: 'w-[8.35%] min-w-[119px]',
        },
      },
    },
    {
      field: 'name',
      header: translate('locationName'),
      pt: {
        bodyCell: {
          className: 'w-[16.85%] min-w-[240px]',
        },
      },
    },
    {
      field: 'brands.code',
      header: translate('brands'),
      body: (rowData: LocationEntity) => rowData.brands.map((brand: { code: string }) => brand.code).join(', '),
      pt: {
        bodyCell: {
          className: 'w-[11.25%] min-w-[160px]',
        },
      },
    },
    {
      field: 'empty1',
      header: '',
      pt: {
        bodyCell: {
          className: 'w-[11.25%] min-w-[160px]',
        },
      },
    },
    {
      field: 'empty2',
      header: '',
      pt: {
        bodyCell: {
          className: 'w-[10%] min-w-[143px]',
        },
      },
    },
    {
      field: 'address.postCode',
      header: translate('zipCode'),
      pt: {
        bodyCell: {
          className: 'w-[6.25%] min-w-[89px]',
        },
      },
    },
    {
      field: 'address.city',
      header: translate('city'),
      pt: {
        bodyCell: {
          className: 'w-[12.5%] min-w-[178px]',
        },
      },
    },
    {
      field: 'address.address',
      header: translate('address'),
    },
  ]

  return columns
}
