import { useTranslation } from '@nexus-ui/i18n'
import { Modal } from '@nexus-ui/ui'
import { useState } from 'react'

import { useCreateLocationWorkMutation } from '@/entities/locationWork'
import { WorkEntity } from '@/entities/work'
import { LocationsAssignment, SelectedLocationEntity } from '@/widgets/locationsAssignment'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  work: WorkEntity
}

export const AssignLocationsModal = ({ isOpen, onClose, onSave, work }: Props) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.worksList.dialogs.assignLocations.${key}`)
  const [selectedLocations, setSelectedLocations] = useState<SelectedLocationEntity[]>([])
  const [_, { isLoading: isCreateLocationLoading, isError: isCreateLocationError }] = useCreateLocationWorkMutation()

  if (isCreateLocationError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const handleSave = async () => {
    // TODO: Handle saving locations when the issue of fetching locations will be resolved

    onSave()
  }

  return (
    <Modal
      data-cy="assign-locations-modal"
      header={
        <div className="flex flex-col items-center text-center">
          <h2 className="text-text-4xl-semibold-lineheight-100 leading-text-4xl-semibold-lineheight-100 text-bluegray-700 mt-0 mb-6">
            {translate('title')}
          </h2>
          <div className="flex">
            <p className="text-text-base-regular-lineheight-150 font-text-base-regular-lineheight-150 text-bluegray-500">
              {translate('subtitle')}:
            </p>
            <p className="text-text-base-semibold-lineheight-150 font-text-base-semibold-lineheight-150 ml-2 mb-6">
              {work?.name ?? ''}
            </p>
          </div>
        </div>
      }
      visible={isOpen}
      minWidth={1236}
      width="64%"
      onHide={onClose}
      footer={null}
    >
      <LocationsAssignment
        className="pb-[40px]"
        selectedLocations={selectedLocations}
        isUpdating={isCreateLocationLoading}
        newBrandsNames={work?.brands.map((brand) => brand.name.toUpperCase()) ?? []}
        onBack={onClose}
        work={{ ...work, qualificationId: work?.qualification.id }}
        onSave={handleSave}
        setSelectedLocations={setSelectedLocations}
      />
    </Modal>
  )
}
