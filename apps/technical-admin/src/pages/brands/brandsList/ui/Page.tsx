import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Outlet, useNavigate } from 'react-router'

import { BrandEntity, useGetBrandsQuery } from '@/entities/brand'
import { pageUrls } from '@/shared/lib'

import { useColumns } from '../lib/useColumns'

const BrandsListPage = () => {
  const navigate = useNavigate()
  const handleAddBrandClick = () => navigate(pageUrls.brands.create())

  const { isLoading, data: brands } = useGetBrandsQuery()
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.brands.brandsList.${key}`)

  const columns = useColumns()

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="leading-headline text-headline font-headline m-0">{translate('title')}</h1>

        <Button severity="secondary" outlined label={translate('addBrandButton')} onClick={handleAddBrandClick} />
      </div>

      <DataTable<BrandEntity[]>
        removableSort
        columns={columns}
        data={brands ?? []}
        filterDisplay="row"
        emptyMessage={translate('table.empty')}
        loading={isLoading}
      />

      <Outlet />
    </div>
  )
}

export default BrandsListPage
