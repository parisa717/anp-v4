import { WorkEntity, WorkshopWorkLocationWorkEntity } from '@/entities/work'

export type SelectedLocationEntity = {
  id: string
  isRecommended: boolean
  brandIds: string[]
}

export type LocationEntity = {
  id: string
  name: string
  code: string
  brands: WorkshopWorkLocationWorkEntity['location']['brands']
  isSelected: boolean
  isRecommended: boolean
  brandIds: string[]
}

export type WorkEntry = Omit<WorkEntity, 'brands' | 'qualification'> & {
  brands: Pick<WorkEntity['brands'][number], 'id'>[]
  qualificationId: string
}
