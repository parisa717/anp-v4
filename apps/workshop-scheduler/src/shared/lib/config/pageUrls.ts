import { ROUTE_PATHS } from './routePaths'

type PascalToCamelCase<S extends string> = S extends `${infer F}${infer R}`
  ? `${F extends Uppercase<F> ? Lowercase<F> : F}${R}`
  : S

type TransformKeys<T> = {
  [K in keyof T as PascalToCamelCase<string & K>]: T[K] extends string
    ? (...args: string[]) => string
    : T[K] extends object
      ? TransformKeys<T[K]>
      : never
}

type PageUrls = TransformKeys<typeof ROUTE_PATHS>

export const pageUrls: PageUrls = {
  root: () => ROUTE_PATHS.Root,
  businessStatus: {
    root: () => ROUTE_PATHS.BusinessStatus.Root,
    create: () => ROUTE_PATHS.BusinessStatus.Create,
    createAdditional: () => ROUTE_PATHS.BusinessStatus.CreateAdditional,
    edit: (id: string) => ROUTE_PATHS.BusinessStatus.Edit.replace(':id', id),
    editAdditional: (id: string) => ROUTE_PATHS.BusinessStatus.EditAdditional.replace(':id', id),
    unselectDefault: (id: string) => ROUTE_PATHS.BusinessStatus.UnselectDefault.replace(':id', id),
    unselectDefaultAdditional: (id: string) => ROUTE_PATHS.BusinessStatus.UnselectDefaultAdditional.replace(':id', id),
    changeStatusConfirmation: (id: string) => ROUTE_PATHS.BusinessStatus.ChangeStatusConfirmation.replace(':id', id),
  },
  location: {
    root: () => ROUTE_PATHS.Location.Root,
    details: {
      root: (id: string) => ROUTE_PATHS.Location.Details.Root.replace(':id', id),
      locationWorks: {
        create: (id: string) => ROUTE_PATHS.Location.Details.LocationWorks.Create.replace(':id', id),
        edit: (locationId: string, locationWorkId: string) =>
          ROUTE_PATHS.Location.Details.LocationWorks.Edit.replace(':id', locationId).replace(
            ':locationWorkId',
            locationWorkId,
          ),
        remove: (locationId: string, locationWorkId: string) =>
          ROUTE_PATHS.Location.Details.LocationWorks.Remove.replace(':id', locationId).replace(
            ':locationWorkId',
            locationWorkId,
          ),
      },
    },
  },
  businessStatusByLocation: {
    root: () => ROUTE_PATHS.BusinessStatusByLocation.Root,
    create: () => ROUTE_PATHS.BusinessStatusByLocation.Create,
    createAdditional: () => ROUTE_PATHS.BusinessStatusByLocation.CreateAdditional,
  },
  colorSetup: {
    root: () => ROUTE_PATHS.ColorSetup.Root,
    edit: () => ROUTE_PATHS.ColorSetup.Edit,
  },
  counterConfiguration: {
    root: () => ROUTE_PATHS.CounterConfiguration.Root,
  },
  teamsCapacity: {
    root: () => ROUTE_PATHS.TeamsCapacity.Root,
  },
  followUpWork: {
    root: () => ROUTE_PATHS.FollowUpWork.Root,
    add: () => ROUTE_PATHS.FollowUpWork.Add,
    edit: (id: string) => ROUTE_PATHS.FollowUpWork.Edit.replace(':id', id),
  },
  work: {
    root: () => ROUTE_PATHS.Work.Root,
    add: () => ROUTE_PATHS.Work.Add,
    edit: (id: string) => ROUTE_PATHS.Work.Edit.replace(':id', id),
    deactivateService: (id: string) => ROUTE_PATHS.Work.DeactivateService.replace(':id', id),
    activateService: (id: string) => ROUTE_PATHS.Work.ActivateService.replace(':id', id),
  },
  locationServiceAdvisor: {
    root: () => ROUTE_PATHS.LocationServiceAdvisor.Root,
    details: (id: string) => ROUTE_PATHS.LocationServiceAdvisor.Details.replace(':id', id),
  },
}
