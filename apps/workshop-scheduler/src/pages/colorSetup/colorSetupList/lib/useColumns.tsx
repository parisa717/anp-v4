import { useTranslation } from '@nexus-ui/i18n'
import { ColorPicker } from 'primereact/colorpicker'
import { ColumnProps } from 'primereact/column'

import { AvailabilityColorEntity } from '@/entities/availabilityColor'

export const useColorSetupListPageColumns = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.colorSetup.colorSetupList.table.${key}`)

  const colorTemplate = (cellData: AvailabilityColorEntity) => {
    return (
      <>
        <ColorPicker value={cellData.color} disabled />
        <code className="uppercasetext-text-base-regular-lineheight-150 font-inter">#{cellData.color}</code>
      </>
    )
  }

  const columns: ColumnProps[] = [
    {
      field: 'color',
      header: translate('columnHeaders.color'),
      body: colorTemplate,
      pt: {
        headerCell: {
          className: 'min-w-[392px] bg-surface-0',
        },
        bodyCell: {
          className: 'flex items-center gap-4',
        },
      },
    },
    {
      header: translate('columnHeaders.capacityValue'),
      field: 'capacityValue',
      pt: {
        headerCell: {
          className: 'min-w-[392px] bg-surface-0',
        },
        headerTitle: {
          className: 'w-full text-right',
        },
        bodyCell: {
          className:
            'text-right text-text-xl-semibold-lineheight-150 leading-text-xl-semibold-lineheight-150 font-semibold',
        },
      },
    },
  ]

  return columns
}
