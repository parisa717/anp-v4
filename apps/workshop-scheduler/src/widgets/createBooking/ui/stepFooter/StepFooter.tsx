import { useTranslation } from '@nexus-ui/i18n'
import { Button, ButtonPassThroughOptions } from 'primereact/button'

export interface StepFooterProps {
  onCancel: () => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
  disableNextButton?: boolean
  nextButtonPt?: ButtonPassThroughOptions
}

export const StepFooter = ({
  onCancel,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  disableNextButton = false,
  nextButtonPt,
}: Partial<StepFooterProps>) => {
  const { t } = useTranslation()

  return (
    <div className="shrink-0 pl-24 pr-28 h-20 bg-teal-50 w-full rounded flex items-center justify-between">
      <Button
        severity="secondary"
        icon="pi pi-times"
        text
        iconPos="right"
        label={t('cancel')}
        onClick={onCancel}
        className="capitalize"
      />
      <div className="flex gap-2">
        {!isFirstStep && (
          <Button
            severity="secondary"
            icon="pi pi-chevron-left"
            outlined
            label={t('back')}
            onClick={onPrev}
            className="capitalize"
          />
        )}
        {isLastStep ? (
          <Button
            label={t('confirm')}
            // TODO add event handler on confirm
            onClick={() => {}}
            className="capitalize"
          />
        ) : (
          <Button
            icon="pi pi-chevron-right"
            iconPos="right"
            label={t('next')}
            onClick={onNext}
            className="capitalize"
            disabled={disableNextButton}
            pt={nextButtonPt}
          />
        )}
      </div>
    </div>
  )
}
