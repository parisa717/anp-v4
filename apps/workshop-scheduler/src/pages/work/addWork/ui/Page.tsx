import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { Step, StepperModal } from '@nexus-ui/ui'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router'

import {
  useCreateWorkshopWorkMutation,
  useSetWorkshopWorkLocationWorksMutation,
  useUpdateWorkshopWorkMutation,
} from '@/entities/work'
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

  const [createWork, { isLoading: isWorkLoading }] = useCreateWorkshopWorkMutation()
  const [updateWork, { isLoading: isUpdateWorkLoading }] = useUpdateWorkshopWorkMutation()
  const [setWorkLocations, { isLoading: isSetWorkLocationsLoading }] = useSetWorkshopWorkLocationWorksMutation()

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

  const handleStepClick = async (index: number) => {
    if (index > activeIndex) {
      const isValid = await trigger()

      if (isValid) {
        setActiveIndex(index)
      }
    } else {
      const sanitizedWork = {
        id: work.id ?? '',
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

  const handleNextClick = async (data: WorkSetupFormSchema) => {
    if (!snapshotWork) {
      const { data: createdWorks, error: createWorkError } = await createWork({
        workshopWork: {
          works: [
            {
              name: data.name,
              qualification: { id: data.qualificationId },
              isDescriptionEditable: data.isDescriptionEditable,
              isCapacityEditable: data.isCapacityEditable,
              isActive: data.isActive,
              brands:
                data.brands?.map((brand) => ({
                  id: brand.id,
                  timeUnits: typeof brand.timeUnits === 'number' ? brand.timeUnits : 0,
                })) ?? [],
            },
          ],
        },
      })
      if (createWorkError) {
        return
      }

      // Setting the work ID necessary for retrieving the list of locations
      setValue('id', createdWorks?.createWorkshopWork?.works[0].id ?? '')
    }

    handleStepClick(1)

    // Check if the current works have changed compared to the saved snapshot when transitioning to the second step. If changes are detected, reset the locations list to ensure it reflects the updated works.
    if (JSON.stringify(work) !== JSON.stringify(snapshotWork)) {
      // Set selected locations to be an empty array
      setSelectedLocations([])
    }
  }

  const handleSaveLocationsAssignment = async (data: WorkSetupFormSchema) => {
    if (snapshotWork) {
      const result = await updateWork({
        workshopWork: {
          id: data.id,
          name: data.name,
          qualification: { id: data.qualificationId },
          isDescriptionEditable: data.isDescriptionEditable,
          isCapacityEditable: data.isCapacityEditable,
          brands:
            data.brands?.map((brand) => ({
              id: brand.id,
              timeUnits: brand.timeUnits,
            })) ?? [],
        },
      })

      if (result.error) {
        return
      }
    }

    if (selectedLocations.length === 0) {
      return
    }

    const result = await setWorkLocations({
      id: work.id ?? '',
      locationWorks: selectedLocations.map((location) => ({
        locationId: location.id,
        isRecommended: location.isRecommended,
        brands: location.brandIds.map((id) => ({
          id,
        })),
      })),
    })

    if (result.data && !result.error) {
      navigate(pageUrls.work.root())
    }
  }

  const formSteps: Step[] = [
    {
      label: translate('defineWorkSetup'),
      content: (
        <WorkSetup
          control={control}
          errors={errors}
          isLoading={isWorkLoading || isUpdateWorkLoading}
          onNext={handleSubmit(handleNextClick)}
          handleSubmit={handleSubmit}
          setValue={setValue}
        />
      ),
      width: 1000,
    },
    {
      label: translate('assignLocations.title'),
      content: (
        <>
          <h2 className="text-bluegray-700 text-text-3xl-semibold-lineheight-150 leading-text-3xl-semibold-lineheight-150 m-0 mb-8">
            {translate('assignLocations.title')}
          </h2>
          <LocationsAssignment
            selectedLocations={selectedLocations}
            work={getValues()}
            onBack={() => {
              handleStepClick(0)
            }}
            onSave={handleSubmit(handleSaveLocationsAssignment)}
            isUpdating={isWorkLoading || isSetWorkLocationsLoading || isUpdateWorkLoading}
            setSelectedLocations={setSelectedLocations}
          />
        </>
      ),
      width: 1610,
    },
  ]

  return (
    <StepperModal
      activeStepIndex={activeIndex}
      onStepperStepClick={handleStepClick}
      steps={formSteps}
      stepsTitle={translate('title')}
      variant="secondary"
    />
  )
}

export default AddWorkPage
