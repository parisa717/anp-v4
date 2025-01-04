import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, Steps } from '@nexus-ui/ui'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { AreaStatus, useCreateAreaMutation } from '@/entities/area'
import { pageUrls } from '@/shared/lib'

import { useFormSteps } from '../lib/useFormSteps'
import { CreateAreaFormSchema, createAreaFormSchema } from '../model/formSchema'
import { CreateAreaFormStep } from '../model/types'
import { CreateAreaForm } from './Form'
import { CreateAreaModalFooter } from './ModalFooter'

const CreateAreaPage = () => {
  const { t } = useTranslation()
  const translate = (formStep: CreateAreaFormStep, key: string) => t(`pages.areas.createArea.steps.${formStep}.${key}`)

  const [createArea, { isLoading: isUpdating }] = useCreateAreaMutation()
  const navigate = useNavigate()

  const { formSteps } = useFormSteps()

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateAreaFormSchema>({
    resolver: zodResolver(createAreaFormSchema(t)),
    defaultValues: {
      code: '',
      name: '',
      address: {
        postCode: '',
        city: '',
        address: '',
        country: {
          id: '',
        },
      },
    },
  })

  const onSubmitHandler = async (data: CreateAreaFormSchema) => {
    await createArea({
      area: {
        name: data.name,
        code: data.code,
        address: data.address,
        isActive: data.status === AreaStatus.Active,
      },
    })
    navigate(pageUrls.areas.root())
  }

  const handleCancelClick = () => {
    navigate(pageUrls.areas.root())
  }

  const handleSaveClick = () => {
    handleSubmit(onSubmitHandler)()
  }

  const handleSkipAndSaveClick = () => {
    handleSubmit(onSubmitHandler)()
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      onSaveClick={handleSaveClick}
      width={896}
      footer={
        <CreateAreaModalFooter
          onCancelClick={handleCancelClick}
          onSaveClick={handleSaveClick}
          onSkipAndSaveClick={handleSkipAndSaveClick}
          isUpdating={isUpdating}
        />
      }
      isUpdating={isUpdating}
    >
      <div className="flex gap-12">
        <div className="basis-1/3">
          <h1 className="text-text-4xl-regular-lineheight-100 leading-text-4xl-regular-lineheight-100 m-0">
            {t('pages.areas.createArea.title')}
          </h1>
          <Steps items={formSteps} activeIndex={0} className="pt-8" />
        </div>
        <div className="basis-2/3">
          <h2 className="text-text-3xl-semibold-lineheight-150 leading-text-3xl-semibold-lineheight-150 m-0">
            {translate(CreateAreaFormStep.General, 'title')}
          </h2>
          <CreateAreaForm control={control} errors={errors} />
        </div>
      </div>
    </FormModal>
  )
}

export default CreateAreaPage
