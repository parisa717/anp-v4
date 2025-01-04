import { RadioButton } from 'primereact/radiobutton'

type Props = {
  title: string
  isChecked: boolean
  isDisabled?: boolean
  onClick: VoidFunction
}

export const LocationFormModeRadioButton = ({ isChecked, isDisabled = false, onClick, title }: Props) => {
  return (
    <label className="flex gap-2 items-center">
      <RadioButton checked={isChecked} onChange={onClick} disabled={isDisabled} />
      {title}
    </label>
  )
}
