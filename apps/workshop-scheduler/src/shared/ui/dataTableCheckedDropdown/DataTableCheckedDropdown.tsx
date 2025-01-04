import { useTranslation } from '@nexus-ui/i18n'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type DataTableCheckedDropdownProps = {
  value: boolean
  onChange: (e: DropdownChangeEvent) => void
}

export const DataTableCheckedDropdown = ({ value, onChange }: DataTableCheckedDropdownProps) => {
  const { t } = useTranslation()

  return (
    <Dropdown
      value={value}
      placeholder={t('select')}
      options={[
        { value: true, label: t('checked'), className: 'capitalize' },
        { value: false, label: t('unchecked'), className: 'capitalize' },
      ]}
      onChange={onChange}
      showClear
      pt={{
        input: {
          className: 'capitalize',
        },
      }}
    />
  )
}
