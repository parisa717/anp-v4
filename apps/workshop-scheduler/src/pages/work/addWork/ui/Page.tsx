import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { StepperModal } from '@nexus-ui/ui'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useCreateLocationWorkMutation } from '@/entities/locationWork'
import { useCreateWorkshopWorkMutation } from '@/entities/work'
import { pageUrls } from '@/shared/lib'
import { LocationsAssignment, SelectedLocationEntity } from '@/widgets/locationsAssignment'
import { DefaultWork, WorkSetupFormSchema, workSetupFormSchema } from '@/widgets/workForm'

import { WorkSetup } from './workSetup/WorkSetup'

const AddWorkPage = () => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.${key}`)
  const [snapshotWork, setSnapshotWork] = useState<WorkSetupFormSchema | null>(null)
  const [selectedLocations, setSelectedLocations] = useState<SelectedLocationEntity[]>([])

  const [createWork, { isLoading: isWorkLoadingError, isError: isWorkError }] = useCreateWorkshopWorkMutation()
  const [createLocation, { isLoading: isCreateLocationLoading, isError: isCreateLocationError }] =
    useCreateLocationWorkMutation()

  const {
    formState: { errors },
    handleSubmit,
    control,
    trigger,
    setValue,
    getValues,
  } = useForm<WorkSetupFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(workSetupFormSchema(t)),
    defaultValues: {
      ...DefaultWork,
    },
  })

  const work = useWatch({ control })

  if (isWorkError || isCreateLocationError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const handleStepClick = async (index: number) => {
    if (index > activeIndex) {
      const isValid = await trigger()

      if (isValid) {
        setActiveIndex(index)
      }
    } else {
      const sanitizedWork = {
        name: work.name ?? '',
        qualificationId: work.qualificationId ?? '',
        isActive: work.isActive ?? false,
        isDescriptionEditable: work.isDescriptionEditable ?? false,
        isCapacityEditable: work.isCapacityEditable ?? false,
        brands:
          work.brands?.map((brand) => ({
            id: brand.id ?? '',
            timeUnits: brand.timeUnits ?? 0,
          })) ?? [],
      }

      setSnapshotWork(sanitizedWork)
      setActiveIndex(index)
    }
  }

  const handleNextClick = () => {
    handleStepClick(1)

    // Check if the current works have changed compared to the saved snapshot when transitioning to the second step. If changes are detected, reset the locations list to ensure it reflects the updated works.
    if (JSON.stringify(work) !== JSON.stringify(snapshotWork)) {
      // Set selected locations to be an empty array
      setSelectedLocations([])
    }
  }

  const handleSave = async () => {
    const { data: createdWorks, error: createWorkError } = await createWork({
      works: [
        {
          name: work.name ?? '',
          qualification: { id: work.qualificationId ?? '' },
          isDescriptionEditable: work.isDescriptionEditable ?? false,
          isCapacityEditable: work.isCapacityEditable ?? false,
          isActive: work.isActive ?? true,
          brands:
            work.brands?.map((brand) => ({
              id: brand.id ?? '',
              timeUnits: typeof brand.timeUnits === 'number' ? brand.timeUnits : 0,
            })) ?? [],
        },
      ],
    })

    if (createWorkError) {
      //TODO: Add proper error handling

      console.error('Error creating work: ', createWorkError)
      return
    }

    if (selectedLocations.length === 0) {
      return
    }

    const locationWorks = selectedLocations.map((location) => ({
      locationId: location.id,
      workId: createdWorks?.createWorkshopWork.works[0].id || '',
      isRecommended: location.isRecommended,
      amountPerDayLimit: null,
      capacityPerDayLimit: null,
      brands: location.brandIds.map((brandId) => ({ id: brandId })),
    }))

    await createLocation({ locationWorks })
    navigate(pageUrls.work.root())
  }

  const formSteps = [
    {
      label: translate('defineWorkSetup'),
      content: (
        <WorkSetup
          control={control}
          errors={errors}
          onNext={handleNextClick}
          handleSubmit={handleSubmit}
          setValue={setValue}
        />
      ),
      width: '50%',
    },
    {
      label: translate('assignLocations.title'),
      content: (
        <>
          <h2 className="text-text-3xl-semibold-lineheight-150 leading-text-3xl-semibold-lineheight-150 m-0 mb-8">
            {translate('assignLocations.title')}
          </h2>
          <LocationsAssignment
            selectedLocations={selectedLocations}
            work={getValues()}
            onBack={() => {
              handleStepClick(0)
            }}
            onSave={handleSave}
            isUpdating={isWorkLoadingError || isCreateLocationLoading}
            setSelectedLocations={setSelectedLocations}
          />
        </>
      ),
      width: '83%',
    },
  ]

  return (
    <StepperModal
      activeStepIndex={activeIndex}
      onStepperStepClick={handleStepClick}
      steps={formSteps}
      stepsTitle={translate('title')}
      minWidth={1000}
      pt={{
        root: {
          className: 'gap-0',
        },
      }}
      className={{
        stepperWrapper: 'flex gap-12 mb-[59px]',
      }}
    />
  )
}

export default AddWorkPage
