import { Button } from 'primereact/button'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface StepWrapperProps {
  children: ReactNode
  onCancel: () => void
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export const StepWrapper = ({ children, onCancel, onNext, onPrev, isFirstStep, isLastStep }: StepWrapperProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col pl-4 gap-6 justify-between h-full">
      <div className="pl-24 pr-28 py-14">{children}</div>
      <div className="pl-24 pr-28 h-20 bg-teal-50 w-full rounded flex items-center justify-between">
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
            />
          )}
        </div>
      </div>
    </div>
  )
}
