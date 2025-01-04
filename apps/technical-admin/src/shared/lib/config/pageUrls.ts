import { ROUTE_PATHS } from './routePaths'

export const pageUrls = {
  root: ROUTE_PATHS.Root,
  login: () => ROUTE_PATHS.Login,
  brands: {
    root: () => ROUTE_PATHS.Brands.Root,
    create: () => ROUTE_PATHS.Brands.Create,
    edit: (id: string) => ROUTE_PATHS.Brands.Edit.replace(':id', id),
  },
  areas: {
    root: () => ROUTE_PATHS.Areas.Root,
    create: () => ROUTE_PATHS.Areas.Create,
    edit: (id: string) => ROUTE_PATHS.Areas.Edit.replace(':id', id),
    detail: (id: string) => ROUTE_PATHS.Areas.Detail.replace(':id', id),
  },
  locations: {
    root: () => ROUTE_PATHS.Locations.Root,
    create: () => ROUTE_PATHS.Locations.Create,
    edit: (id: string) => ROUTE_PATHS.Locations.Edit.replace(':id', id),
  },
}
