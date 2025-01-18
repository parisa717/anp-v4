import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField } from '@nexus-ui/ui'
import { Checkbox } from 'primereact/checkbox'
import { RadioButton } from 'primereact/radiobutton'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import {
  useEditAdditionalBusinessStatusMutation,
  useGetAdditionalBusinessStatusQuery,
} from '@/entities/additionalBusinessStatus'
import { useEditBusinessStatusMutation, useGetBusinessStatusQuery } from '@/entities/businessStatus'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { APPLICATION_MESSAGE_TYPE } from '@/shared/model'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { EditBusinessStatusFormSchema, editBusinessStatusFormSchema } from '../model/formSchema'

const FORM_ID = 'editBusinessStatusForm'

type EditBusinessStatusPageProps = {
  isAdditionalBusinessStatus: boolean
}

const EditBusinessStatusPage = ({ isAdditionalBusinessStatus }: EditBusinessStatusPageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id = '' } = useParams<{ id: string }>()

  const {
    data: businessStatus,
    isSuccess: isSuccessGetBusinessStatus,
    isLoading: isLoadingGetBusinessStatus,
  } = useGetBusinessStatusQuery(
    { id },
    {
      skip: isAdditionalBusinessStatus,
    },
  )
  const {
    data: additionalBusinessStatus,
    isSuccess: isSuccessGetAdditionalBusinessStatus,
    isLoading: isLoadingGetAdditionalBusinessStatus,
  } = useGetAdditionalBusinessStatusQuery(
    { id },
    {
      skip: !isAdditionalBusinessStatus,
    },
  )
  const [editBusinessStatus, { isLoading: isUpdatingEditBusinessStatus }] = useEditBusinessStatusMutation()
  const [editAdditionalBusinessStatus, { isLoading: isUpdatingEditAdditionalBusinessStatus }] =
    useEditAdditionalBusinessStatusMutation()

  const initialValues = isAdditionalBusinessStatus ? additionalBusinessStatus : businessStatus

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<EditBusinessStatusFormSchema>({
    resolver: zodResolver(editBusinessStatusFormSchema(t, isAdditionalBusinessStatus)),
    values: initialValues,
    defaultValues: {
      name: '',
      isDefault: false,
      isHighlighted: false,
    },
  })

  const isInitiallyDefault = initialValues?.isDefault

  const translate = (key: string) => t(`pages.businessStatus.createAndEditBusinessStatusForm.${key}`)

  const onSubmitHandler = async (data: EditBusinessStatusFormSchema) => {
    let result

    if (isAdditionalBusinessStatus) {
      result = await editAdditionalBusinessStatus({
        additionalBusinessStatus: { ...data, isHighlighted: data.isHighlighted ?? false, id },
      })
    }

    if (!isAdditionalBusinessStatus) {
      result = await editBusinessStatus({ businessStatus: { ...data, id } })
    }

    if (!result?.error && result?.data) {
      navigate(pageUrls.businessStatus.root())
    }
  }

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatus.root())
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      formId={FORM_ID}
      width="28%"
      minWidth={624}
      title={translate('editTitle')}
      isUpdating={isUpdatingEditBusinessStatus || isUpdatingEditAdditionalBusinessStatus}
      isLoading={isLoadingGetBusinessStatus || isLoadingGetAdditionalBusinessStatus}
    >
      <ServerSideErrorsMessagesList
        page={isAdditionalBusinessStatus ? ROUTE_PATHS.BusinessStatus.EditAdditional : ROUTE_PATHS.BusinessStatus.Edit}
        type={APPLICATION_MESSAGE_TYPE.SERVER_SIDE_GENERIC}
        className="mb-8"
      />
      <ServerSideErrorsMessagesList
        page={isAdditionalBusinessStatus ? ROUTE_PATHS.BusinessStatus.EditAdditional : ROUTE_PATHS.BusinessStatus.Edit}
        type={APPLICATION_MESSAGE_TYPE.SERVER_SIDE_FEATURE_SPECIFIC}
        className="mb-8"
      />
      {(isSuccessGetBusinessStatus || isSuccessGetAdditionalBusinessStatus) && (
        <form className="flex flex-col mt-6" id={FORM_ID} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-4">
            <InputTextFormField
              name="name"
              label={translate('form.fields.name')}
              hasFloatLabel
              control={control}
              className={{ input: 'w-full' }}
              error={errors.name}
            />
            <div className="flex flex-row items-center justify-between">
              <Controller
                name="isDefault"
                control={control}
                render={({ field: controllerField }) => (
                  <div className="flex items-center gap-3">
                    <RadioButton
                      name="isDefault"
                      pt={{
                        input: {
                          onClick: () => {
                            controllerField.onChange(!controllerField.value)
                          },
                        },
                      }}
                      checked={controllerField.value}
                      disabled={isInitiallyDefault}
                      tooltip={isInitiallyDefault ? translate('form.fields.isDefault.tooltip') : undefined}
                      tooltipOptions={{ showOnDisabled: true, position: 'right' }}
                    />
                    <label htmlFor="isDefault">{translate('form.fields.isDefault.label')}</label>
                  </div>
                )}
              />
              {isAdditionalBusinessStatus && (
                <Controller
                  name="isHighlighted"
                  control={control}
                  render={({ field: controllerField }) => (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        name="isHighlighted"
                        onChange={(e) => controllerField.onChange(e.checked)}
                        checked={!!controllerField.value}
                      />
                      <label htmlFor="isHighlighted">{translate('form.fields.isHighlighted')}</label>
                    </div>
                  )}
                />
              )}
            </div>
          </div>
        </form>
      )}
    </FormModal>
  )
}

export default EditBusinessStatusPage
