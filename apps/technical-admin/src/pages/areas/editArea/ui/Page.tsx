import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useGetAreaQuery, useUpdateAreaMutation } from '@/entities/area'
import { pageUrls } from '@/shared/lib'

import { EditAreaFormSchema } from '../model/formSchema'
import { EditAreaForm } from './Form'

const EditAreaPage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [updateArea, { isLoading: isUpdating }] = useUpdateAreaMutation()


  const { id = '' } = useParams<{ id: string }>()
  const defaultValues: EditAreaFormSchema = {
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
  }
  const { data: areaData ,isLoading: isAreaDataLoading } = useGetAreaQuery({ id })
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<EditAreaFormSchema>({
    resolver: zodResolver(EditAreaFormSchema(t)),
    values:  {
          code: areaData?.code || '',
          name: areaData?.name || '',
          address: {
            postCode: areaData?.address.postCode || '',
            city: areaData?.address.city || '',
            address: areaData?.address.address || '',
            country: {
              id: areaData?.address.country.id || '',
            },
          },
        }
      , defaultValues,
  })

  const onSubmitHandler = async (data: EditAreaFormSchema) => {
    const result = await updateArea({
      area: {
        id: id,
        name: data.name,
        code: data.code,
        address: data.address,
      },
    })

    if (result.data && !result.error) {
      navigate(pageUrls.areas.detail(id))
    }
  }

  const handleCancelClick = () => {
    navigate(pageUrls.areas.detail(id))
  }

  const handleSaveClick = () => {
    handleSubmit(onSubmitHandler)()
  }

  return (
    <FormModal
      minWidth={896}
      width={"50%"}
      onCancelClick={handleCancelClick}
      onSaveClick={handleSaveClick}
      isUpdating={isUpdating}
      isLoading={isAreaDataLoading}
    >
      <div >
        <div className="basis-1/3">
          <h1 className="text-text-4xl-regular-lineheight-100 leading-text-4xl-regular-lineheight-100 m-0">
            {t('pages.areas.editArea.title')}
          </h1>
        </div>
        <div className="basis-2/3 mt-4">
         
          <EditAreaForm control={control} errors={errors} />
        </div>
      </div>
    </FormModal>
  )
}

export default EditAreaPage
