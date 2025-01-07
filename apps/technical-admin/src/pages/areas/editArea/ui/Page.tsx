import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, Steps } from '@nexus-ui/ui'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useGetAreaQuery, useUpdateAreaMutation } from '@/entities/area'
import { pageUrls } from '@/shared/lib'

import { useFormSteps } from '../lib/useFormSteps'
import { EditAreaFormSchema } from '../model/formSchema'
import { EditAreaFormStep } from '../model/types'
import { EditAreaForm } from './Form'
import { EditAreaModalFooter } from './ModalFooter'

const EditAreaPage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [updateArea, { isLoading: isUpdating }] = useUpdateAreaMutation()

  const { formSteps } = useFormSteps()
  const translate = (formStep: EditAreaFormStep, key: string) => t(`pages.areas.editArea.steps.${formStep}.${key}`)


  const { id = '' } = useParams<{ id: string }>()

  const { data: areaData } = useGetAreaQuery({ id })
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<EditAreaFormSchema>({
    resolver: zodResolver(EditAreaFormSchema(t)),
    defaultValues: {
      code: areaData?.code,
      name: areaData?.name,
      address: {
        postCode: areaData?.address.postCode,
        city: areaData?.address.city,
        address: areaData?.address.address ,
        country: {
          id: areaData?.address.country.id ,
        },
      },
    },
  })

  const onSubmitHandler = async (data: EditAreaFormSchema) => {
     await updateArea({
          area: {
            id:id,
            name: data.name,
            code: data.code,
            address: data.address,
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
        <EditAreaModalFooter
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
           {t('pages.areas.editArea.title')}
          </h1>
          <Steps items={formSteps} activeIndex={0} className="pt-8" />
        </div>
        <div className="basis-2/3">
          <h2 className="text-text-3xl-semibold-lineheight-150 leading-text-3xl-semibold-lineheight-150 m-0">
           {translate(EditAreaFormStep.General, 'title')}
          </h2>
          <EditAreaForm control={control} errors={errors} />
        </div>
      </div>
    </FormModal>
  )
}

export default EditAreaPage