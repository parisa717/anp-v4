export interface PaginationInput {
  limit?: number
  offset?: number
}

export interface SortInput {
  field: string
  direction: SortDirection
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
