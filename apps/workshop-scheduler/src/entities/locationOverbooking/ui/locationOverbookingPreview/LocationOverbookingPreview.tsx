import { useTranslation } from '@nexus-ui/i18n'
import { Slider } from '@nexus-ui/ui'
import { Button } from 'primereact/button'

const sliderPt = { handle: { className: 'hidden' } }

interface LocationOverbookingPreviewProps {
  minValue: number
  maxValue: number
  value: number
  onEdit: () => void
  isEditingDisabled?: boolean
}

export const LocationOverbookingPreview = ({
  onEdit,
  minValue,
  maxValue,
  value,
  isEditingDisabled = false,
}: LocationOverbookingPreviewProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-64 w-1/2">
        <p data-cy="min-capacity-overbooking" className="m-0">
          {minValue}%
        </p>
        <Slider value={value} min={minValue} max={maxValue} pt={sliderPt} />
        <p data-cy="max-capacity-overbooking" className="m-0">
          {maxValue}%
        </p>
      </div>
      <p data-cy="capacity-overbooking" className="text-xl text-bluegray-700 font-bold lineheight-150 m-0">
        {value}%
      </p>
      <Button
        data-cy="capacity-overbooking-edit-button"
        onClick={onEdit}
        link
        label={t('edit')}
        className="capitalize text-theme-primary"
        icon="pi pi-pencil"
        text
        iconPos="right"
        disabled={isEditingDisabled}
      />
    </div>
  )
}
