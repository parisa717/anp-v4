import { useTranslation } from '@nexus-ui/i18n'
import { Modal } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { ChangeEvent, useState } from 'react'

interface TimeUnitsModalProps {
  onCancelClick: () => void
  onSaveClick: (timeUnits: number, shouldOverwriteAll: boolean) => void
  isVisible: boolean
}

export const TimeUnitsModal = ({ onCancelClick, onSaveClick, isVisible }: TimeUnitsModalProps) => {
  const [shouldOverwriteAll, setShouldOverwriteAll] = useState(false)
  const [timeUnits, setTimeUnits] = useState<number>(0)
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.workSetupForm.timeUnitsModal.${key}`)

  const handleSave = () => {
    onSaveClick(timeUnits, shouldOverwriteAll)
  }

  const handleTimeUnitsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTimeUnits(value ? parseInt(value) : 0)
  }

  const footerContent = (
    <div className="flex justify-center gap-28">
      <Button severity="secondary" outlined label={t('cancel')} onClick={onCancelClick} className="capitalize" />
      <Button label={t('confirm')} onClick={handleSave} autoFocus className="capitalize mr-0" />
    </div>
  )

  return (
    <Modal visible={isVisible} minWidth={615} width="32%" onHide={onCancelClick} footer={footerContent}>
      <div className="flex flex-col items-center text-center gap-3">
        <h2 className="text-text-4xl-semibold-lineheight-100 leading-text-4xl-semibold-lineheight-100 m-0 mb-5">
          {translate('title')}
        </h2>
        <p className="text-text-base-semibold-lineheight-150 m-0">{translate('subtitle')}</p>
        <InputText
          data-cy="time-units-input"
          type="number"
          value={timeUnits.toString()}
          onChange={handleTimeUnitsChange}
        />
        <div className="inline-flex items-center my-3">
          <Checkbox
            id="permission"
            checked={shouldOverwriteAll}
            onChange={(e) => setShouldOverwriteAll(!!e.checked)}
            className="shrink-0"
          />
          <label htmlFor="permission" className="ml-2 text-checkbox-label-typography">
            {translate('permission')}
          </label>
        </div>
      </div>
    </Modal>
  )
}
