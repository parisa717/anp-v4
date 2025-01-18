import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'

import { useGetWorkshopFollowUpWorkQuery, useUpdateWorkshopFollowUpWorkMutation } from '@/entities/followUpWork'
import { pageUrls } from '@/shared/lib'
import {
  DefaultFollowUpWork,
  FollowUpWorkForm,
  FollowUpWorkFormSchema,
  followUpWorkFormSchema,
} from '@/widgets/followUpWorkForm'

const EditFollowUpWorkModal = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.worksList.dialogs.editWork.${key}`)

  const { search } = useLocation()

  const { data: followUpWorkDetails, isLoading: isFollowUpWorkDetailsLoading } = useGetWorkshopFollowUpWorkQuery({
    id,
  })
  const [updateWork, { isLoading: isUpdateWorkLoading }] = useUpdateWorkshopFollowUpWorkMutation()

  const isLoading = isFollowUpWorkDetailsLoading || isUpdateWorkLoading

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FollowUpWorkFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(followUpWorkFormSchema(t)),
    defaultValues: {
      ...DefaultFollowUpWork,
    },
    values: {
      name: followUpWorkDetails?.name ?? '',
      qualificationId: followUpWorkDetails?.qualification?.id ?? '',
      timeUnits: followUpWorkDetails?.timeUnits ?? 0,
      isActive: followUpWorkDetails?.isActive ?? false,
      isDescriptionEditable: followUpWorkDetails?.isDescriptionEditable ?? false,
      isCapacityEditable: followUpWorkDetails?.isCapacityEditable ?? false,
    },
  })

  const handleUpdateWork = async (data: FollowUpWorkFormSchema) => {
    const { error } = await updateWork({
      workshopFollowUpWork: {
        id,
        name: data.name,
        qualification: { id: data.qualificationId },
        timeUnits: data.timeUnits,
        isDescriptionEditable: data.isDescriptionEditable,
        isCapacityEditable: data.isCapacityEditable,
      },
    })

    if (error) {
      //TODO: Add proper error handling
      console.error('Error updating work: ', error)
    }

    navigate(pageUrls.work.root() + search)
  }

  return (
    <>
      <FormModal
        minWidth={624}
        width="32%"
        title={translate('title')}
        onSaveClick={handleSubmit(handleUpdateWork)}
        onCancelClick={() => navigate(pageUrls.work.root() + search)}
        isLoading={isLoading}
        data-cy="form-modal"
      >
        <FollowUpWorkForm control={control} errors={errors} isEditMode />
      </FormModal>
    </>
  )
}

export default EditFollowUpWorkModal
