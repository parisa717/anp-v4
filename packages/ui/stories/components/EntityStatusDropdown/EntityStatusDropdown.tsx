import { useTranslation } from '@nexus-ui/i18n'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type StatusDropdownProps = {
  value: boolean
  onChange: (e: DropdownChangeEvent) => void
}

export const EntityStatusDropdown = ({ value, onChange }: StatusDropdownProps) => {
  const { t } = useTranslation()

  return (
    <Dropdown
      name="isActive"
      value={value}
      options={[
        { value: true, label: t('active'), className: 'capitalize' },
        { value: false, label: t('inactive'), className: 'capitalize' },
      ]}
      className="w-full"
      onChange={onChange}
      pt={{
        input: {
          className: 'capitalize',
        },
        trigger: {
          className: 'text-dropdown-icon',
        },
      }}
    />
  )
}
