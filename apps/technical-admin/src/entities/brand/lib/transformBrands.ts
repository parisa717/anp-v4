import { BrandDTO, QueryBrands } from '../api/types'
import { type BrandEntity } from '../model/types'

const mapBrand = (dto: BrandDTO | null): BrandEntity | null => {
  if (dto === null) {
    return null
  }

  return {
    ...dto,
    name: dto.code,
  }
}

const filterBrand = (brand: BrandEntity | null): brand is BrandEntity => brand !== null

export const transformBrands = (brands: QueryBrands) => {
  return brands?.map(mapBrand).filter(filterBrand) ?? []
}
