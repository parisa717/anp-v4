import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'

import { useCreateWorkshopFollowUpWorkMutation } from '@/entities/followUpWork'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'
import {
  DefaultFollowUpWork,
  FollowUpWorkForm,
  FollowUpWorkFormSchema,
  followUpWorkFormSchema,
} from '@/widgets/followUpWorkForm'

const CreateFollowUpWork = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.${key}`)

  const { search } = useLocation()

  const [createFollowUpWork, { isLoading: isFollowUpWorkLoading }] = useCreateWorkshopFollowUpWorkMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FollowUpWorkFormSchema>({
    resolver: zodResolver(followUpWorkFormSchema(t)),
    defaultValues: { ...DefaultFollowUpWork },
  })

  const handleCancelClick = () => {
    navigate(pageUrls.work.root() + search)
  }

  const onSubmitHandler = async (data: FollowUpWorkFormSchema) => {
    const result = await createFollowUpWork({
      workshopFollowUpWork: {
        name: data.name,
        qualification: { id: data.qualificationId },
        timeUnits: data.timeUnits,
        isDescriptionEditable: data.isDescriptionEditable,
        isCapacityEditable: data.isCapacityEditable,
        isActive: data.isActive,
      },
    })

    if (result.data && !result.error) {
      navigate(pageUrls.work.root() + search)
    }
  }

  return (
    <FormModal
      onSaveClick={handleSubmit(onSubmitHandler)}
      onCancelClick={handleCancelClick}
      width="33%"
      minWidth={624}
      title={translate('title')}
      data-cy="form-modal"
      isUpdating={isFollowUpWorkLoading}
    >
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.FollowUpWork.Add} className="mb-8" />
      <FollowUpWorkForm control={control} errors={errors} />
    </FormModal>
  )
}

export default CreateFollowUpWork
