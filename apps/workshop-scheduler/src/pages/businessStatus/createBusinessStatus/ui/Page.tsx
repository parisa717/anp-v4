import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Divider } from 'primereact/divider'
import { RadioButton } from 'primereact/radiobutton'
import { Fragment } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useCreateAdditionalBusinessStatusesMutation } from '@/entities/additionalBusinessStatus'
import { useCreateBusinessStatusesMutation } from '@/entities/businessStatus'
import { pageUrls, ROUTE_PATHS, useServerSideValidation } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { CreateBusinessStatusFormSchema, createBusinessStatusFormSchema } from '../model/formSchema'

const FORM_ID = 'createBusinessStatusForm'

const DEFAULT_BUSINESS_STATUS: CreateBusinessStatusFormSchema['businessStatuses'][number] = {
  name: '',
  isDefault: false,
  isActive: true,
  isHighlighted: false,
}

type CreateBusinessStatusPageProps = {
  isAdditionalBusinessStatus: boolean
}

const CreateBusinessStatusPage = ({ isAdditionalBusinessStatus }: CreateBusinessStatusPageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [createBusinessStatuses, { isLoading: isUpdatingCreateBusinessStatus }] = useCreateBusinessStatusesMutation()
  const [createAdditionalBusinessStatusesMutation, { isLoading: isUpdatingCreateAdditionalBusinessStatus }] =
    useCreateAdditionalBusinessStatusesMutation()

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    setError,
  } = useForm<CreateBusinessStatusFormSchema>({
    resolver: zodResolver(createBusinessStatusFormSchema(t, isAdditionalBusinessStatus)),
    defaultValues: {
      businessStatuses: [{ ...DEFAULT_BUSINESS_STATUS }],
    },
  })

  useServerSideValidation(
    isAdditionalBusinessStatus ? ROUTE_PATHS.BusinessStatus.CreateAdditional : ROUTE_PATHS.BusinessStatus.Create,
    setError,
    createBusinessStatusFormSchema(t, isAdditionalBusinessStatus),
  )

  const { fields, append, remove } = useFieldArray<CreateBusinessStatusFormSchema>({
    control,
    name: 'businessStatuses',
  })

  const translate = (key: string) => t(`pages.businessStatus.createAndEditBusinessStatusForm.${key}`)

  const onSubmitHandler = async (data: CreateBusinessStatusFormSchema) => {
    let result

    if (isAdditionalBusinessStatus) {
      result = await createAdditionalBusinessStatusesMutation({
        additionalBusinessStatuses: data.businessStatuses,
      })
    } else {
      const updatedBusinessStatuses = data.businessStatuses.map(({ isHighlighted: _, ...rest }) => ({
        ...rest,
      }))
      result = await createBusinessStatuses({ businessStatuses: updatedBusinessStatuses })
    }

    if (result?.data && !result.error) {
      navigate(pageUrls.businessStatus.root())
    }
  }

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatus.root())
  }

  const statuses = [
    {
      value: true,
      label: translate('active'),
    },
    {
      value: false,
      label: translate('inactive'),
    },
  ]

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      formId={FORM_ID}
      width="28%"
      minWidth={624}
      title={translate('createTitle')}
      isUpdating={isUpdatingCreateBusinessStatus || isUpdatingCreateAdditionalBusinessStatus}
    >
      <form className="flex flex-col mt-6" id={FORM_ID} onSubmit={handleSubmit(onSubmitHandler)}>
        <ServerSideErrorsMessagesList
          page={
            isAdditionalBusinessStatus ? ROUTE_PATHS.BusinessStatus.CreateAdditional : ROUTE_PATHS.BusinessStatus.Create
          }
          className="mb-6"
        />
        <div className="flex flex-col mb-2">
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-end gap-2.5">
                  <InputTextFormField
                    name={`businessStatuses.${index}.name`}
                    label={translate('form.fields.name')}
                    control={control}
                    className={{ input: 'w-full', container: 'grow' }}
                    error={errors.businessStatuses?.[index]?.name}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      outlined
                      severity="secondary"
                      icon="pi pi-trash"
                      onClick={() => remove(index)}
                    />
                  )}
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Controller
                    name={`businessStatuses.${index}.isDefault`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <div className="flex items-center gap-3">
                        <RadioButton
                          name={`businessStatuses.${index}.isDefault`}
                          onChange={() => {
                            fields.forEach((_, i) => {
                              setValue(`businessStatuses.${i}.isDefault`, false, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            })
                            controllerField.onChange(true)
                          }}
                          checked={controllerField.value}
                        />
                        <label htmlFor={`businessStatuses.${index}.isDefault`}>
                          {translate('form.fields.isDefault.label')}
                        </label>
                      </div>
                    )}
                  />
                  {isAdditionalBusinessStatus && (
                    <Controller
                      name={`businessStatuses.${index}.isHighlighted`}
                      control={control}
                      render={({ field: controllerField }) => (
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name={`businessStatuses.${index}.isHighlighted`}
                            onChange={(e) => controllerField.onChange(e.checked)}
                            checked={!!controllerField.value}
                          />
                          <label htmlFor={`businessStatuses.${index}.isHighlighted`}>
                            {translate('form.fields.isHighlighted')}
                          </label>
                        </div>
                      )}
                    />
                  )}
                </div>
                <SelectBoxFormField
                  name={`businessStatuses.${index}.isActive`}
                  label={translate('form.fields.isActive')}
                  options={statuses}
                  control={control}
                  className={{
                    input: 'w-full',
                  }}
                  error={errors.businessStatuses?.[index]?.isActive}
                />
              </div>
              <Divider className="my-8 last:my-5" />
            </Fragment>
          ))}
        </div>
        <Button
          type="button"
          className="min-w-80 max-w-2/3 mb-2.5"
          severity="secondary"
          outlined
          label={translate('form.fields.addStatusButton')}
          onClick={() => append({ ...DEFAULT_BUSINESS_STATUS })}
        />
        <Divider />
      </form>
    </FormModal>
  )
}

export default CreateBusinessStatusPage
