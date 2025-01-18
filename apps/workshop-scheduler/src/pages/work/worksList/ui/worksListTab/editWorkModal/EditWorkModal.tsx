import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { Modal } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useGetBrandsQuery } from '@/entities/brand'
import { EditLocationWorkParams } from '@/entities/locationWork'
import { useGetWorkshopWorkQuery, useUpdateWorkshopWorkMutation, WorkEntity } from '@/entities/work'
import { pageUrls } from '@/shared/lib'
import { DefaultWork, WorkForm, WorkSetupFormSchema, workSetupFormSchema } from '@/widgets/workForm'

import { AssignLocationsModal } from './AssignLocationsModal'
import { WarningModal } from './WarningModal'

const EditWorkModal = () => {
  const { id = '' } = useParams<EditLocationWorkParams>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.worksList.dialogs.editWork.${key}`)
  const [newlyAddedBrands, setNewlyAddedBrands] = useState<WorkEntity['brands'][number][]>([])
  const [isAssignLocationsModalOpen, setIsAssignLocationsModalOpen] = useState(false)

  const { data: brands, isError: isBrandsError, isLoading: isBrandsLoading } = useGetBrandsQuery()
  const {
    data: workDetails,
    isError: isWorkDetailsError,
    isLoading: isWorkDetailsLoading,
  } = useGetWorkshopWorkQuery({
    id,
  })
  const [updateWork, { isLoading: isUpdateWorkLoading }] = useUpdateWorkshopWorkMutation()

  const isLoading = isBrandsLoading || isWorkDetailsLoading || isUpdateWorkLoading

  const {
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    setValue,
  } = useForm<WorkSetupFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(workSetupFormSchema(t)),
    defaultValues: {
      ...DefaultWork,
    },
    values: {
      id: workDetails?.id ?? '',
      name: workDetails?.name ?? '',
      qualificationId: workDetails?.qualification?.id ?? '',
      isActive: workDetails?.isActive ?? false,
      isDescriptionEditable: workDetails?.isDescriptionEditable ?? false,
      isCapacityEditable: workDetails?.isCapacityEditable ?? false,
      brands:
        workDetails?.brands?.map((brand) => ({
          id: brand.id,
          timeUnits: brand.timeUnits,
        })) || [],
    },
  })

  if (isWorkDetailsError || isBrandsError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const handleUpdateWork = async (data: WorkSetupFormSchema) => {
    const { error } = await updateWork({
      workshopWork: {
        id,
        name: data.name,
        isCapacityEditable: data.isCapacityEditable,
        isDescriptionEditable: data.isDescriptionEditable,
        qualification: { id: data.qualificationId },
        brands: data.brands.map((brand) => ({
          id: brand.id,
          timeUnits: brand.timeUnits,
        })),
      },
    })

    if (error) {
      //TODO: Add proper error handling
      console.error('Error updating work: ', error)
    }

    navigate(pageUrls.work.root())
  }

  const handleSave = async (data: WorkSetupFormSchema) => {
    const initialBrandIds = workDetails?.brands?.map((brand) => brand.id) || []
    const newBrands = data?.brands.filter((brand) => !initialBrandIds.includes(brand.id))

    if (newBrands.length > 0) {
      const transformedNewBrands = newBrands.flatMap((newBrand) => {
        const matchingBrand = brands?.find((brand) => brand.id === newBrand.id)
        if (matchingBrand) {
          return [
            {
              id: matchingBrand.id,
              name: matchingBrand.code,
              timeUnits: typeof newBrand.timeUnits === 'string' ? parseInt(newBrand.timeUnits) : newBrand.timeUnits,
            },
          ]
        }
        return []
      })

      setNewlyAddedBrands(transformedNewBrands ?? [])
      return
    }

    setIsAssignLocationsModalOpen(true)
  }

  const footerContent = (
    <section className="flex justify-between items-center">
      <Button
        severity="secondary"
        outlined
        label={t('cancel')}
        onClick={() => navigate(pageUrls.work.root())}
        className="capitalize"
        loading={isLoading}
      />
      <div className="flex">
        <Button
          severity="secondary"
          outlined
          label={t('skip and save')}
          onClick={handleSubmit(handleUpdateWork)}
          className="capitalize h-[40px]"
          loading={isLoading}
          type="submit"
        />
        <Button
          label={translate('nextButton')}
          onClick={handleSubmit(handleSave)}
          autoFocus
          className="mr-0"
          loading={isLoading}
          type="submit"
        />
      </div>
    </section>
  )

  const handleSkipAndSave = async () => {
    const formData = getValues()
    await handleUpdateWork(formData)
  }

  return (
    <>
      <Modal
        visible={true}
        minWidth={624}
        width="32%"
        onHide={() => {}}
        footer={footerContent}
        title={translate('title')}
      >
        <WorkForm control={control} errors={errors} isEditMode setValue={setValue} />
      </Modal>
      <WarningModal
        isVisible={newlyAddedBrands.length > 0}
        onCancel={() => setNewlyAddedBrands([])}
        onAssignLocations={() => setIsAssignLocationsModalOpen(true)}
        onSkipAndSave={handleSkipAndSave}
        brandNames={newlyAddedBrands.map((brand) => brand.name)}
      />
      {workDetails && (
        <AssignLocationsModal
          isOpen={isAssignLocationsModalOpen}
          work={{ ...workDetails, brands: newlyAddedBrands.length === 0 ? workDetails.brands : newlyAddedBrands }}
          onClose={() => {
            setNewlyAddedBrands([])
            setIsAssignLocationsModalOpen(false)
          }}
          onSave={handleSkipAndSave}
        />
      )}
    </>
  )
}

export default EditWorkModal
