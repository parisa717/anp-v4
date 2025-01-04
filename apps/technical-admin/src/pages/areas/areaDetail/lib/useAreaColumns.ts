import { useTranslation } from '@nexus-ui/i18n'
import { ColumnProps } from 'primereact/column'

import { GqlAreaObjectTypeEntity } from '@/entities/area'

export const useAreaColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.areas.areaDetail.details.${key}`)

  const columns: ColumnProps[] = [
    {
      field: 'code',
      header: translate('areaId'),
      pt: {
        bodyCell: {
          className: 'w-[8.35%] min-w-[119px]',
        },
      },
    },
    {
      field: 'name',
      header: translate('areaName'),
      pt: {
        bodyCell: {
          className: 'w-[16.85%] min-w-[240px]',
        },
      },
    },
    {
      field: 'address.country.name',
      header: translate('country'),
      pt: {
        bodyCell: {
          className: 'w-[11.25%] min-w-[160px]',
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
    {
      field: 'isActive',
      header: translate('status'),
      body: (rowData: GqlAreaObjectTypeEntity) => (rowData?.isActive ? t('active') : t('inactive')),
      pt: {
        bodyCell: {
          className: 'capitalize',
        },
      },
    },
  ]
  return columns
}
