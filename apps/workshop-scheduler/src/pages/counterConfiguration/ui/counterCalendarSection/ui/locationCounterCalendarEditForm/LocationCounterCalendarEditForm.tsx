import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'

import { useGetCurrentLocation } from '@/entities/location'
import {
  LocationCounterCalendarWorkDayEntity,
  useUpdateLocationCounterCalendarMutation,
} from '@/entities/locationCounterCalendar'
import { ROUTE_PATHS } from '@/shared/lib'
import { FormValidationMessages } from '@/shared/ui'

import { useFormColumns } from '../../../../lib/useFormColumns'
import {
  createWorkingDaysSchema,
  dayNumberToDayNameSchemaMapper,
  WorkingDaysSchema,
} from '../../../../model/formSchema'

interface LocationCounterCalendarEditFormProps {
  workDaysData: LocationCounterCalendarWorkDayEntity[]
  onCancel: () => void
}

export const LocationCounterCalendarEditForm = ({ workDaysData, onCancel }: LocationCounterCalendarEditFormProps) => {
  const locationId = useGetCurrentLocation()

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.counterConfiguration.sections.counterCalendar.${key}`)

  const defaultValues = workDaysData.reduce(
    (a, v) => ({
      ...a,
      [dayNumberToDayNameSchemaMapper[v.dayNumber]]: {
        ...v,
      },
    }),
    {},
  )

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<WorkingDaysSchema>({
    resolver: zodResolver(createWorkingDaysSchema(t)),
    defaultValues,
  })

  const columns = useFormColumns({ control, errors })

  const [updateLocationCounterCalendar, { isLoading: isUpdateLocationCounterCalendarMutationLoading }] =
    useUpdateLocationCounterCalendarMutation()

  const onSubmitHandler = async (data: WorkingDaysSchema) => {
    const workDays: LocationCounterCalendarWorkDayEntity[] = Object.entries(data).map(([_, value], index) => ({
      dayNumber: index + 1,
      ...value,
    }))

    try {
      await updateLocationCounterCalendar({ locationId, workDays })
    } catch (_) {
      // TODO add error handling
    } finally {
      onCancel()
    }
  }

  return (
    <section className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormValidationMessages page={ROUTE_PATHS.CounterConfiguration.Root} errors={errors} />
        <DataTable removableSort columns={columns} data={workDaysData} emptyMessage={translate('table.empty')} />
        <div className="flex bg-shade-000 p-4 justify-between">
          <Button
            type="button"
            severity="secondary"
            outlined
            onClick={onCancel}
            label={t('cancel')}
            className="capitalize"
          />
          <Button
            disabled={isUpdateLocationCounterCalendarMutationLoading}
            type="submit"
            label={t('save')}
            className="capitalize"
          />
        </div>
      </form>
    </section>
  )
}
