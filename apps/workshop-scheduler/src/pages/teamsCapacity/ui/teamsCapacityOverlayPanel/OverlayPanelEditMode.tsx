import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { InputNumberFormField } from '@nexus-ui/ui'
import { format, getDay } from 'date-fns'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'

import { mapDayNumberToDayName } from '@/entities/locationCounterCalendar'
import { useGetTeamCapacityQuery, useUpdateTeamCapacityMutation } from '@/entities/teamsCapacity'
import { ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { CapacityFormType, createCapacityFormSchema } from '../../model/formSchema'

interface OverlayPanelEditModeProps {
  onCancel: () => void
  onClose: () => void
  id: string
  startDate: Date
}

export const OverlayPanelEditMode = ({ onCancel, id, startDate, onClose }: OverlayPanelEditModeProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.teamsCapacity.${key}`)

  const { data: teamCapacityQueryData, isLoading: isTeamCapacityQueryDataLoading } = useGetTeamCapacityQuery({
    id,
    startDate: format(new Date(startDate), 'yyyy-MM-dd'),
  })

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CapacityFormType>({
    resolver: zodResolver(createCapacityFormSchema(t)),
    values: {
      capacity: teamCapacityQueryData?.capacity ?? 0,
    },
    defaultValues: {
      capacity: 0,
    },
  })

  const [updateTeamCapacityMutation, { isLoading: isUpdateTeamCapacityMutationLoading }] =
    useUpdateTeamCapacityMutation()

  const onSubmit = async (data: CapacityFormType) => {
    const result = await updateTeamCapacityMutation({ id, startDate: String(startDate), capacity: data.capacity })

    if (result.data && !result.error) {
      onCancel()
    }
  }

  if (isTeamCapacityQueryDataLoading) return <div>Loading...</div>

  const teamCapacityDate = teamCapacityQueryData?.date
    ? `${mapDayNumberToDayName(t)[getDay(new Date(teamCapacityQueryData?.date))]} ${format(new Date(teamCapacityQueryData?.date), 'dd.MM.yyyy')}`
    : '-'

  return (
    <form className="p-4 flex gap-10 flex-col min-w-80 text-bluegray-700" onSubmit={handleSubmit(onSubmit)}>
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.TeamsCapacity.Root} className="mb-8" />
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-bold m-0">{translate('calendar.event.overlayPanel.title')}</p>
        <i data-cy="close-icon" className="pi pi-times cursor-pointer text-base text-bluegray-700" onClick={onClose} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-bluegray-500 capitalize">{t('team')}</p>
          <p className="m-0 font-bold text-xl">{teamCapacityQueryData?.qualificationName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="m-0 text-bluegray-500 capitalize">{t('calendar.day')}</p>
          <p className="m-0 font-bold text-xl">{teamCapacityDate}</p>
        </div>
        <InputNumberFormField
          label={`${translate('capacity')} (${translate('calendar.workUnit')})`}
          control={control}
          error={errors.capacity}
          name="capacity"
        />
        <div className="flex justify-between">
          <Button
            type="button"
            severity="secondary"
            outlined
            onClick={onCancel}
            label={t('cancel')}
            className="capitalize"
          />
          <Button
            loading={isUpdateTeamCapacityMutationLoading}
            type="submit"
            label={t('save')}
            className="capitalize"
          />
        </div>
      </div>
    </form>
  )
}
