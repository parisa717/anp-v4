import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Outlet, useNavigate } from 'react-router'

import { AreaEntity, useGetAreasQuery } from '@/entities/area'
import { pageUrls } from '@/shared/lib'

import { useColumns } from '../lib/useColumns'

const AreasListPage = () => {
  const navigate = useNavigate()
  const handleAddAreaClick = () => navigate(pageUrls.areas.create())

  const { data: areas, isLoading } = useGetAreasQuery()
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.areas.areasList.${key}`)

  const columns = useColumns()

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[35px] leading-none">{translate('title')}</h1>

        <Button severity="secondary" outlined label={translate('addAreaButton')} onClick={handleAddAreaClick} />
      </div>

      <DataTable<AreaEntity[]>
        removableSort
        columns={columns}
        data={areas ?? []}
        filterDisplay="row"
        emptyMessage={translate('table.empty')}
        loading={isLoading}
      />

      <Outlet />
    </div>
  )
}

export default AreasListPage
