import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { capitalize } from '@nexus-ui/utils'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { BRAND_STATUSES, BrandStatus, useCreateBrandMutation } from '@/entities/brand'
import { pageUrls } from '@/shared/lib'

import { CreateBrandFormSchema, createBrandFormSchema } from '../model/formSchema'

const CreateBrandPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.brands.createBrand.${key}`)

  const TRANSLATED_BRANDS_STATUSES = BRAND_STATUSES.map((status) => ({
    value: status,
    label: capitalize(t(status)),
  }))

  const [createBrand, { isLoading: isUpdating }] = useCreateBrandMutation()
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateBrandFormSchema>({
    resolver: zodResolver(createBrandFormSchema(t)),
    defaultValues: { name: '' },
  })

  const onSubmitHandler = async (data: CreateBrandFormSchema) => {
    await createBrand({ brand: { code: data.name, isActive: data.status === BrandStatus.Active } })
    navigate(pageUrls.brands.root())
  }

  const handleCancelClick = () => {
    navigate(pageUrls.brands.root())
  }

  const handleSaveClick = () => {
    handleSubmit(onSubmitHandler)()
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      onSaveClick={handleSaveClick}
      width={464}
      title={translate('title')}
      isUpdating={isUpdating}
    >
      <form className="mt-6 flex flex-col gap-6">
        <InputTextFormField
          type="text"
          name="name"
          label={translate('form.fields.brandName')}
          hasFloatLabel
          control={control}
          error={errors.name}
          className={{
            input: 'w-full',
          }}
        />
        <SelectBoxFormField
          name="status"
          label={translate('form.fields.brandStatus')}
          hasFloatLabel
          options={TRANSLATED_BRANDS_STATUSES}
          control={control}
          className={{
            input: 'w-full',
            container: 'mb-6',
          }}
          error={errors.status}
        />
      </form>
    </FormModal>
  )
}

export default CreateBrandPage
