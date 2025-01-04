import { WorkEntity } from '@/entities/work'

export type SelectedLocationEntity = {
  id: string
  isRecommended: boolean
  brandIds: string[]
}

export type WorkEntry = Omit<WorkEntity, 'brands' | 'qualification' | 'id'> & {
  brands: Pick<WorkEntity['brands'][number], 'id'>[]
  qualificationId: string
}
