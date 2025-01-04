import { useTranslation } from '@nexus-ui/i18n'
import { Modal } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Fragment } from 'react'

interface Props {
  brandNames: string[]
  isVisible: boolean
  onAssignLocations: () => void
  onCancel: () => void
  onSkipAndSave: () => void
}

export const WarningModal = ({ brandNames, isVisible, onAssignLocations, onCancel, onSkipAndSave }: Props) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.worksList.dialogs.editWorkWarning.${key}`)

  const footerContent = (
    <div className="flex items-center justify-between">
      <Button
        severity="secondary"
        outlined
        label={t('cancel')}
        onClick={onCancel}
        className="whitespace-nowrap capitalize"
      />
      <div>
        <Button
          severity="secondary"
          outlined
          label={translate('skipAndSave')}
          onClick={onSkipAndSave}
          className="whitespace-nowrap capitalize"
        />
        <Button
          label={translate('assignLocations')}
          onClick={onAssignLocations}
          autoFocus
          className="mr-0 whitespace-nowrap capitalize"
        />
      </div>
    </div>
  )

  return (
    <Modal
      data-cy="brands-warning-modal"
      visible={isVisible}
      minWidth={752}
      width="39%"
      onHide={onCancel}
      footer={footerContent}
      title={translate('title')}
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-text-base-semibold-lineheight-150 font-text-base-semibold-lineheight-150 m-0 mt-1">
          {translate('description')}
        </p>
        {brandNames.map((brandName) => (
          <Fragment key={brandName}>
            <p className="text-text-base-regular-lineheight-150 font-text-base-regular-lineheight-150 text-bluegray-500 m-0 mt-3">
              {translate('brandName')}
            </p>
            <p className="uppercase text-text-xl-semibold-lineheight-150 font-text-xl-semibold-lineheight-150 m-0">
              {brandName}
            </p>
          </Fragment>
        ))}
        <p className="text-text-base-semibold-lineheight-150 font-text-base-semibold-lineheight-150 mt-3 mb-1">
          {translate('question')}
        </p>
      </div>
    </Modal>
  )
}
