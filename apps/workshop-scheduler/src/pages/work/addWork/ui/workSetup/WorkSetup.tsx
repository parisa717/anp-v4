import { useTranslation } from '@nexus-ui/i18n'
import { Control, FieldErrors, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useCreateWorkshopWorkMutation } from '@/entities/work'
import { pageUrls } from '@/shared/lib'
import { WorkForm, WorkSetupFormSchema } from '@/widgets/workForm'

import { Footer } from './Footer'

interface WorkSetupProps {
  control: Control<WorkSetupFormSchema>
  errors: FieldErrors<WorkSetupFormSchema>
  onNext: () => void
  handleSubmit: UseFormHandleSubmit<WorkSetupFormSchema>
  setValue: UseFormSetValue<WorkSetupFormSchema>
}

export const WorkSetup = ({ control, errors, onNext, handleSubmit, setValue }: WorkSetupProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.${key}`)
  const [createWork, { isLoading, isError }] = useCreateWorkshopWorkMutation()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const onSubmitHandler = async (data: WorkSetupFormSchema) => {
    await createWork({
      works: [
        {
          name: data.name,
          qualification: { id: data.qualificationId },
          isDescriptionEditable: data.isDescriptionEditable,
          isCapacityEditable: data.isCapacityEditable,
          isActive: data.isActive,
          brands: data.brands.map((brand) => ({
            id: brand.id,
            timeUnits: typeof brand.timeUnits === 'number' ? brand.timeUnits : 0,
          })),
        },
      ],
    })

    navigate(pageUrls.work.root())
  }

  const handleCancel = () => {
    navigate(pageUrls.work.root())
  }

  const handleSkipAndSave = () => {
    handleSubmit(onSubmitHandler)()
  }

  return (
    <div className="min-w-[480px]">
      <h2 className="text-text-3xl-semibold-lineheight-150 leading-text-3xl-semibold-lineheight-150 m-0 mb-8">
        {translate('defineWorkSetup')}
      </h2>
      <WorkForm control={control} errors={errors} setValue={setValue} />
      <Footer isUpdating={isLoading} onCancel={handleCancel} onNext={onNext} onSkipAndSave={handleSkipAndSave} />
    </div>
  )
}
