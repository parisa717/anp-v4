import { GetBrandsQuery } from '@/entities/brand/api/Brand.generated'

export const GET_BRANDS_OPERATION_DEFAULT_RESPONSE: GetBrandsQuery = {
  getBrands: {
    brands: [
      {
        id: 'brand_1',
        code: 'Opel',
        isActive: true,
      },
      {
        id: 'brand_2',
        code: 'Kia',
        isActive: false,
      },
      {
        id: 'brand_3',
        code: 'Nissan',
        isActive: true,
      },
    ],
  },
}
