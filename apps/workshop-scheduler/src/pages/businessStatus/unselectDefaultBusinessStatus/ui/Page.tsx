import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { RadioButton } from 'primereact/radiobutton'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import {
  useDeactivateAdditionalBusinessStatusMutation,
  useGetAdditionalBusinessStatusesQuery,
} from '@/entities/additionalBusinessStatus'
import { useDeactivateBusinessStatusMutation, useGetBusinessStatusesQuery } from '@/entities/businessStatus'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { UnselectDefaultBusinessStatusFormSchema, unselectDefaultBusinessStatusFormSchema } from '../model/formSchema'

const FORM_ID = 'unselectDefaultBusinessStatusForm'

type UnselectDefaultBusinessStatusPageProps = {
  isAdditionalBusinessStatus: boolean
}

const UnselectDefaultBusinessStatusPage = ({ isAdditionalBusinessStatus }: UnselectDefaultBusinessStatusPageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id = '' } = useParams<{ id: string }>()

  const {
    data: regularBusinessStatuses,
    isLoading: isBusinessStatusesLoading,
    isSuccess: isBusinessStatusesSuccess,
    isError: isBusinessStatusesError,
  } = useGetBusinessStatusesQuery(undefined, {
    skip: isAdditionalBusinessStatus,
    selectFromResult: (result) => ({
      ...result,
      // Filter out inactive business statuses
      data: result.data?.filter((businessStatus) => businessStatus.isActive),
    }),
  })
  const {
    data: additionalBusinessStatuses,
    isLoading: isAdditionalBusinessStatusesLoading,
    isSuccess: isAdditionalBusinessStatusesSuccess,
    isError: isAdditionalBusinessStatusesError,
  } = useGetAdditionalBusinessStatusesQuery(undefined, {
    skip: !isAdditionalBusinessStatus,
    selectFromResult: (result) => ({
      ...result,
      // Filter out inactive business statuses
      data: result.data?.filter((businessStatus) => businessStatus.isActive),
    }),
  })

  const [deactivateBusinessStatus, { isLoading: isDeactivatingBusinessStatus }] = useDeactivateBusinessStatusMutation()
  const [deactivateAdditionalBusinessStatus, { isLoading: isDeactivatingAdditionalBusinessStatus }] =
    useDeactivateAdditionalBusinessStatusMutation()

  const {
    formState: { errors, isDirty },
    handleSubmit,
    control,
  } = useForm<UnselectDefaultBusinessStatusFormSchema>({
    resolver: zodResolver(unselectDefaultBusinessStatusFormSchema(t)),
    defaultValues: {
      defaultBusinessStatusId: '',
    },
  })

  const businessStatuses = isAdditionalBusinessStatus ? additionalBusinessStatuses : regularBusinessStatuses
  const currentDefaultBusinessStatus = businessStatuses?.find((businessStatus) => businessStatus.id === id)
  const filteredBusinessStatuses = businessStatuses?.filter((businessStatus) => businessStatus.id !== id)

  const translate = (key: string) => t(`pages.businessStatus.unselectDefaultBusinessStatus.${key}`)

  const onSubmitHandler = async (data: UnselectDefaultBusinessStatusFormSchema) => {
    let result

    if (isAdditionalBusinessStatus) {
      result = await deactivateAdditionalBusinessStatus({
        id,
        defaultAdditionalBusinessStatusId: data.defaultBusinessStatusId,
      })
    }

    if (!isAdditionalBusinessStatus) {
      result = await deactivateBusinessStatus({ id, defaultBusinessStatusId: data.defaultBusinessStatusId })
    }

    if (!result?.error && result?.data) {
      navigate(pageUrls.businessStatus.root())
    }
  }

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatus.root())
  }

  if (isBusinessStatusesError || isAdditionalBusinessStatusesError) {
    //TODO: Add error handling
    return 'Error while fetching data'
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      formId={FORM_ID}
      width="32%"
      minWidth={636}
      title={translate('title')}
      isUpdating={isDeactivatingBusinessStatus || isDeactivatingAdditionalBusinessStatus}
      isLoading={isBusinessStatusesLoading || isAdditionalBusinessStatusesLoading}
      isSaveButtonDisabled={!isDirty}
    >
      <ServerSideErrorsMessagesList
        page={
          isAdditionalBusinessStatus
            ? ROUTE_PATHS.BusinessStatus.UnselectDefaultAdditional
            : ROUTE_PATHS.BusinessStatus.UnselectDefault
        }
        className="mb-8"
      />
      {(isBusinessStatusesSuccess || isAdditionalBusinessStatusesSuccess) && (
        <>
          <div className="text-center text-bluegray-700 font-semibold">
            <div className="flex flex-col gap-3.5 mb-7">
              <span>{translate('header.youUnselecting')}</span>
              <div>
                <span className="text-bluegray-500 block font-normal">{translate('header.statusName')}</span>
                <span className="text-xl">{currentDefaultBusinessStatus?.name}</span>
              </div>
              <span>
                {translate(
                  `header.${isAdditionalBusinessStatus ? 'asAdditionalStatus' : 'asDefaultAppointmentStatus'}`,
                )}
              </span>
            </div>
            <p className="whitespace-pre-line">{translate('instructions')}</p>
          </div>
          <form className="flex flex-col mt-3.5 items-center" id={FORM_ID} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col gap-4 w-3/4">
              {filteredBusinessStatuses?.map((businessStatus) => (
                <div key={businessStatus.id} className="flex items-center justify-between">
                  <span className="font-bold leading-lineheight-150 text-bluegray-700">{businessStatus.name}</span>
                  <Controller
                    name="defaultBusinessStatusId"
                    control={control}
                    render={({ field: controllerField }) => (
                      <div className="flex items-center gap-3">
                        <RadioButton
                          name="defaultBusinessStatusId"
                          value={businessStatus.id}
                          onChange={(e) => controllerField.onChange(e.value)}
                          checked={controllerField.value === businessStatus.id}
                          invalid={!!errors.defaultBusinessStatusId}
                        />
                        <label htmlFor="defaultBusinessStatusId">{translate('form.fields.isDefault')}</label>
                      </div>
                    )}
                  />
                </div>
              ))}
            </div>
          </form>
        </>
      )}
    </FormModal>
  )
}

export default UnselectDefaultBusinessStatusPage
