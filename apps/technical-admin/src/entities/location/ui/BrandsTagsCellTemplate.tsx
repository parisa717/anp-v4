import { Tag } from 'primereact/tag'

import { LocationEntity } from '@/entities/location'

export const BrandsTagsCellTemplate = (cellData: LocationEntity) => {
  return (
    <div className="flex items-center gap-2">
      {cellData.brands.map(({ id, code }) => (
        <Tag key={id} value={code} severity="info" className="uppercase bg-tag text-tag" />
      ))}
    </div>
  )
}
