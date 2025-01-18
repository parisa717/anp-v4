import { useTranslation } from '@nexus-ui/i18n'
import clsx from 'clsx'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react'

import { useGetWorkshopWorkLocationWorksQuery } from '@/entities/work'

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
  const hasRun = useRef(false)
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.assignLocations.${key}`)

  const {
    data: locationWorks,
    isLoading: isLoadingLocations,
    isError: isLocationsError,
  } = useGetWorkshopWorkLocationWorksQuery(
    { id: work.id },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.map((locationWork) => ({
          ...locationWork,
          id: locationWork.location.id,
          name: locationWork.location.name,
          code: locationWork.location.code,
          brands: locationWork.location.brands.filter((locationBrand) =>
            work.brands?.some((workBrand) => workBrand.id === locationBrand.id),
          ),
          isSelected: false,
          isRecommended: false,
          brandIds: [],
        })),
      }),
    },
  )

  const alreadySelectedLocations = useMemo(
    () =>
      locationWorks
        ?.filter((location) => location.locationWork)
        .map((location) => ({
          id: location.location.id,
          isRecommended: location.locationWork.isRecommended,
          brandIds: location.locationWork.brands.map(({ id }) => id),
        })),
    [locationWorks],
  )

  useEffect(() => {
    if (alreadySelectedLocations && locationWorks && locationWorks.length > 0 && !hasRun.current) {
      setSelectedLocations(alreadySelectedLocations)
      hasRun.current = true
    }
  }, [alreadySelectedLocations, locationWorks, setSelectedLocations])

  if (isLocationsError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const handleBack = () => {
    setSelectedLocations(alreadySelectedLocations ?? [])
    onBack()
  }

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
            locations={locationWorks ?? []}
            isLoadingLocations={isLoadingLocations}
            work={work}
            onChange={(selectedLocations) => setSelectedLocations(selectedLocations)}
            selectedLocations={selectedLocations}
          />
        </AccordionTab>
      </Accordion>
      <Footer isUpdating={isUpdating} onBack={handleBack} onSave={onSave} />
    </div>
  )
}
