import clsx from 'clsx'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { SelectedLocationEntity, WorkEntry } from '../model/types'
import { Footer } from './Footer'
import { LocationTable } from './LocationTable'

interface Props {
  className?: string
  selectedLocations: SelectedLocationEntity[]
  isUpdating: boolean
  newBrandsNames?: string[]
  onBack: () => void
  onSave: () => void
  setSelectedLocations: Dispatch<SetStateAction<SelectedLocationEntity[]>>
  work: WorkEntry
}

export const LocationsAssignment = ({
  className,
  selectedLocations,
  isUpdating,
  newBrandsNames,
  onBack,
  onSave,
  setSelectedLocations,
  work,
}: Props) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.assignLocations.${key}`)

  const customHeaderTemplate = (workName: string) => {
    const hasNewBrands = !!newBrandsNames && newBrandsNames.length > 0
    const label = hasNewBrands ? translate('forBrand') : translate('forWork')
    const name = hasNewBrands ? newBrandsNames.join(', ') : workName

    return (
      <>
        <span className="text-accordion-header-typography text-accordion-header-active-color">{label}:</span>
        <span className="text-accordion-header-typography text-accordion-header-active-color ml-1">{name}</span>
      </>
    )
  }

  return (
    <div className={clsx('min-w-[1092px]', className)}>
      <Accordion activeIndex={0}>
        <AccordionTab
          headerTemplate={customHeaderTemplate(work.name)}
          pt={{
            headerAction: {
              className: 'bg-teal-50 border border-teal-100',
            },
          }}
        >
          <LocationTable
            work={work}
            onChange={(selectedLocations) => setSelectedLocations(selectedLocations)}
            selectedLocations={selectedLocations}
          />
        </AccordionTab>
      </Accordion>
      <Footer isUpdating={isUpdating} onBack={onBack} onSave={onSave} />
    </div>
  )
}
