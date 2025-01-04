import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Link } from 'react-router'

import { useGetAdditionalBusinessStatusesQuery } from '@/entities/additionalBusinessStatus'
import { useGetBusinessStatusesQuery, useReorderBusinessStatusesMutation } from '@/entities/businessStatus'
import { pageUrls, ROUTE_PATHS, useOperationFeedbackMessage } from '@/shared/lib'

import { BusinessStatusMode } from '../config/businessStatusModes'
import { useColumns } from '../lib/useColumns'

type StatusDataDefaultModeSectionProps = {
  isAdditionalBusinessStatus: boolean
}

export const StatusDataDefaultModeSection = ({ isAdditionalBusinessStatus }: StatusDataDefaultModeSectionProps) => {
  const { t } = useTranslation()
  const { data: businessStatuses, isLoading: isBusinessStatusesLoading } = useGetBusinessStatusesQuery(undefined, {
    skip: isAdditionalBusinessStatus,
  })
  const { data: additionalBusinessStatuses, isLoading: isAdditionalBusinessStatusesIsLoading } =
    useGetAdditionalBusinessStatusesQuery(undefined, {
      skip: !isAdditionalBusinessStatus,
    })
  const [reorderBusinessStatuses, { isLoading: isReorderBusinessStatusesLoading }] =
    useReorderBusinessStatusesMutation()
  const { replaceOperationFeedback } = useOperationFeedbackMessage(ROUTE_PATHS.BusinessStatus.Root)

  const columns = useColumns({ isAdditionalBusinessStatus, mode: BusinessStatusMode.Default })

  const data = (isAdditionalBusinessStatus ? additionalBusinessStatuses : businessStatuses) ?? []

  const translate = (key: string) => t(`pages.businessStatus.businessStatusList.${key}`)

  return (
    <section className="flex flex-col gap-9 basis-1/2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-3xl text-bluegray-700 m-0 font-normal">
          {translate(isAdditionalBusinessStatus ? 'additionalStatus' : 'appointmentStatus')}
        </h3>
        <Link
          to={
            isAdditionalBusinessStatus ? pageUrls.businessStatus.createAdditional() : pageUrls.businessStatus.create()
          }
        >
          <Button
            label={translate(isAdditionalBusinessStatus ? 'addNewAdditionalStatus' : 'addNewAppointmentStatus')}
            severity="secondary"
            outlined
          />
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={isReorderBusinessStatusesLoading || isBusinessStatusesLoading || isAdditionalBusinessStatusesIsLoading}
        reorderableRows
        showRowReorderElement={(rowData) => !rowData.isDefault}
        onRowReorder={(e) => {
          const isDefaultStatusReordered = data.some(
            (businessStatus, index) => businessStatus.isDefault && [e.dragIndex, e.dropIndex].includes(index),
          )

          if (isDefaultStatusReordered) {
            replaceOperationFeedback([
              {
                title: translate('errors.reorderDefaultStatus.title'),
                message: translate('errors.reorderDefaultStatus.detail'),
              },
            ])

            return
          }

          reorderBusinessStatuses({
            businessStatuses: e.value.map(({ id }) => ({
              id,
            })),
          })
        }}
        emptyMessage={translate('table.empty')}
        rowClassName={(rowData) => (rowData.isActive ? undefined : 'bg-table-body-row-even')}
      />
    </section>
  )
}
