import { ROUTE_PATHS } from '@/shared/lib'

type ExtractPathValues<T> = T extends string ? T : { [K in keyof T]: ExtractPathValues<T[K]> }[keyof T]

export type AllRoutePaths = ExtractPathValues<typeof ROUTE_PATHS>
