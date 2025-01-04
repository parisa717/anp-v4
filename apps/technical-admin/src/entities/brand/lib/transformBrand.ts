import { QueryBrand } from '../api/types'
import { type BrandEntity } from '../model/types'

export const transformBrand = (brand: QueryBrand): BrandEntity | null => {
  if (!brand) {
    return null
  }

  return {
    ...brand,
    name: brand.code,
  }
}
