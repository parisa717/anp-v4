import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField } from '@nexus-ui/ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useGetBrandQuery, useUpdateBrandMutation } from '@/entities/brand'
import { pageUrls } from '@/shared/lib'

import { EditBrandFormSchema, editBrandFormSchema } from '../model/formSchema'
import { ConfirmModal } from './ConfirmModal'

const EditBrandPage = () => {
  const { t } = useTranslation()
  const translate = (key: string): string => t(`pages.brands.editBrand.${key}`)

  const { id = '' } = useParams<{ id: string }>()
  const { data: brand, isLoading, isError } = useGetBrandQuery({ id })

  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation()
  const navigate = useNavigate()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<EditBrandFormSchema>({
    resolver: zodResolver(editBrandFormSchema(t)),
    ...(brand && { values: brand }),
    defaultValues: {
      name: '',
    },
  })

  const openConfirmModal = () => setIsConfirmModalOpen(true)

  const onSubmitHandler = async (data: EditBrandFormSchema) => {
    await updateBrand({ brand: { id, code: data.name } })
    navigate(pageUrls.brands.root())
  }

  const handleCancelClick = () => {
    navigate(pageUrls.brands.root())
  }

  const handleSaveClick = () => {
    /**
     * we still need to execute form validation
     * thus, we execute handleSubmit()
     */

    handleSubmit(openConfirmModal)()
  }

  const handleConfirmModalSaveClick = (): void => {
    handleSubmit(onSubmitHandler)()
    setIsConfirmModalOpen(false)
  }

  const handleConfirmModalCancelClick = (): void => {
    setIsConfirmModalOpen(false)
  }

  if (isError) {
    // TODO: add proper error handling
    return 'Error'
  }

  return (
    <>
      <FormModal
        key={id}
        onCancelClick={handleCancelClick}
        onSaveClick={handleSaveClick}
        width={464}
        title={translate('title')}
        isUpdating={isUpdating}
        isLoading={isLoading}
        notFound={!isLoading && !brand}
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
        </form>
      </FormModal>
      <ConfirmModal
        visible={isConfirmModalOpen}
        onCancelClick={handleConfirmModalCancelClick}
        onConfirmClick={handleConfirmModalSaveClick}
      />
    </>
  )
}

export default EditBrandPage
