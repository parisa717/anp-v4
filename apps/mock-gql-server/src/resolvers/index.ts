import {
  additionalBusinessStatuses,
  additionalBusinessStatusesByLocation,
  addresses,
  areas,
  availabilityColors,
  businessStatuses,
  businessStatusesByLocation,
  countries,
  crms,
  dmss,
  followUpWorks,
  locationCounter,
  locationCounterCalendarWorkDays,
  locationOverbooking,
  locationTeamsCalendar,
  locationWork,
  locationWorks,
  MockedGqlWorkshopFollowUpWork,
  MockedGqlWorkshopWork,
  permissions,
  qualifications,
  simplifiedBrands,
  teamCapacity,
  works,
  workshopBrands,
  workshopConnectedLocations,
  workshopQualifications,
} from '../mockData'
import { Address, Area, Location } from '../types'
import { locationServiceAdvisorsResolver } from './locationServiceAdvisors'
import { workshopFollowUpWorksResolver } from './workshopFollowUpWorks'
import { workshopWorksResolver } from './workshopWorks'

interface CreateAreaInput {
  code: string
  name: string
  address: {
    country: {
      id: string
    }
    postCode: string
    city: string
    address: string
  }
  isActive: boolean
}

interface GqlCreateLocationInputType {
  areaId: string
  id: string
  name: string
  zipCode: string
  city: string
  address: string
  brandIds: string[]
  isActive: boolean
}

const getCountryByAddress = (parent: Address) => countries.find((country) => country.id === parent.countryId)

const getAddressById = (addressId: string) => {
  const address = addresses.find((address) => address.id === addressId)
  if (!address) return null

  const country = countries.find((country) => country.id === address.countryId)

  return {
    ...address,
    country: country ? { id: country.id, name: country.name } : { id: '0', name: 'Unknown' },
  }
}

const getDmsById = (dmsId: string) => {
  const dms = dmss.find((dms) => dms.id === dmsId)
  return dms ? { id: dms.id, name: dms.name } : null
}

const getCrmById = (crmId: string) => {
  const crm = crms.find((crm) => crm.id === crmId)
  return crm ? { id: crm.id, name: crm.name } : null
}

export const resolverMap = {
  Query: {
    areas() {
      return areas
    },
    getArea(_: unknown, { id }: { id: string }) {
      const area = areas.find((area) => area.id === id)

      if (!area) return null

      return {
        id: area.id,
        code: area.code,
        name: area.name,
        isActive: area.isActive,
        address: getAddressById(area.addressId),
        dms: getDmsById(area.dmsId),
        crm: getCrmById(area.crmId),
      }
    },
    addresses() {
      return addresses
    },
    countries() {
      return countries
    },
    dmss() {
      return dmss
    },
    crms() {
      return crms
    },
    getWorkshopAppointmentBusinessStatus() {
      return businessStatuses[0]
    },
    getWorkshopAppointmentAdditionalBusinessStatus() {
      return additionalBusinessStatuses[0]
    },
    getWorkshopAppointmentAdditionalBusinessStatuses() {
      return {
        additionalBusinessStatuses,
      }
    },
    getLocationWorkshopAppointmentBusinessStatuses() {
      return {
        businessStatuses: businessStatusesByLocation,
      }
    },
    getLocationWorkshopAppointmentAdditionalBusinessStatuses() {
      return {
        additionalBusinessStatuses: additionalBusinessStatusesByLocation,
      }
    },
    getWorkshopConnectedLocations() {
      return {
        workshopConnectedLocations: workshopConnectedLocations,
      }
    },
    getAvailabilityColors() {
      return {
        availabilityColors,
      }
    },
    getLocationOverbooking(_: unknown) {
      return {
        locationOverbooking: locationOverbooking[0],
      }
    },
    getLocationTeamsCalendar() {
      return {
        locationTeamsCalendar,
      }
    },
    getTeamCapacity() {
      return {
        teamCapacity,
      }
    },
    getQualifications() {
      return {
        qualifications: qualifications,
      }
    },
    getLocationWorks(_: unknown) {
      return {
        locationWorks,
      }
    },
    getLocationCounter() {
      return {
        locationCounter,
      }
    },
    getLocationCounterCalendar() {
      return {
        workDays: locationCounterCalendarWorkDays,
      }
    },
    getUserPermissions(_: unknown) {
      return { permissions }
    },
    getWorkshopLocationWork(_: unknown) {
      return locationWork
    },
    ...workshopWorksResolver,
    ...workshopFollowUpWorksResolver,
    ...locationServiceAdvisorsResolver,
  },
  Mutation: {
    createArea: (_: unknown, { area }: { area: CreateAreaInput }) => ({
      id: 'mocked-area-id',
      code: area.code,
    }),
    updateTeamCapacity: () => ({
      id: 'mocked-team-capacity',
      status: true,
    }),
    createLocation: (_: unknown, { location }: { location: GqlCreateLocationInputType }) => ({
      operationId: 'mocked-location-id',
      ...location,
      status: true,
    }),
    createAdditionalBusinessStatuses: () => ({
      operationId: 'mocked-additional-business-statuses-id',
      status: true,
    }),
    createWorkshopConnectedLocations: (
      _: unknown,
      {
        connectedLocationId,
      }: {
        connectedLocationId: string
      },
    ) => ({
      operationId: 'mocked-create-workshop-connected-location-id',
      connectedLocationId,
      status: true,
    }),
    createWorkshopWork: () => {
      return {
        operationId: 'mocked-create-workshop-work',
        works,
      }
    },
    updateWorkshopFollowUpWork: () => {
      return {
        operationId: 'mocked-update-workshop-followup-work',
        status: true,
      }
    },
    createWorkshopFollowUpWork: () => {
      return {
        operationId: 'mocked-create-workshop-followup-work',
        followUpWorks,
      }
    },
    deleteWorkshopConnectedLocations: () => ({
      operationId: 'mocked-delete-workshop-connected-location-id',
      status: true,
    }),
    updateWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-edit-business-status-id',
      status: true,
    }),
    updateWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-edit-additional-business-status-id',
      status: true,
    }),
    activateWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-activate-business-status-id',
      status: true,
    }),
    activateWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-activate-additional-business-status-id',
      status: true,
    }),
    deactivateWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-deactivate-business-status-id',
      status: true,
    }),
    deactivateWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-deactivate-additional-business-status-id',
      status: true,
    }),
    assignLocationWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-assign-business-statuses-to-location',
      status: true,
    }),
    unassignLocationWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-unassign-business-statuses-to-location',
      status: true,
    }),
    assignLocationWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-assign-additional-business-statuses-to-location',
      status: true,
    }),
    unassignLocationWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-unassign-additional-business-statuses-from-location',
      status: true,
    }),
    reorderWorkshopAppointmentBusinessStatuses: () => ({
      operationId: 'mocked-reorder-business-statuses',
      status: true,
    }),
    updateAvailabilityColors: () => ({
      operationId: 'mocked-update-availability-color',
      status: true,
    }),
    updateLocationOverbooking: () => {
      return {
        operationId: 'mocked-update-location-overbooking',
        status: true,
      }
    },
    updateLocationMinimalOverbooking: () => {
      return {
        operationId: 'mocked-update-location-minimal-overbooking',
        status: true,
      }
    },
    updateLocationWork: () => ({
      operationId: 'mocked-update-location-work',
      status: true,
    }),
    updateLocationCounterReceptionInterval: () => ({
      operationId: 'mocked-update-location-counter-reception-interval',
      status: true,
    }),
    updateLocationCounterCalendar: () => ({
      operationId: 'mocked-update-location-counter-calendar',
      status: true,
    }),
    createWorkshopLocationWork: () => {
      return {
        operationId: 'mocked-create-workshop-location-work',
        locationWorks: [{ id: '1' }, { id: '2' }],
      }
    },
    updateWorkshopLocationWork: () => ({
      operationId: 'mocked-update-workshop-location-work',
      status: true,
    }),
    deleteWorkshopLocationWork: () => {
      return {
        status: true,
      }
    },
    activateWorkshopWork: () => ({
      operationId: 'mocked-activate-workshop-work',
      status: true,
    }),
    deactivateWorkshopWork: () => ({
      operationId: 'mocked-deactivate-workshop-work',
      status: true,
    }),
  },
  Area: {
    country: (parent: Area) => {
      return countries.find((country) => country.id === parent.countryId)
    },
    address: (parent: Area) => {
      return addresses.find((address) => address.id === parent.addressId)
    },
    dms: (parent: Area) => {
      return dmss.find((dms) => dms.id === parent.dmsId)
    },
    crm: (parent: Area) => {
      return crms.find((crm) => crm.id === parent.crmId)
    },
  },
  Address: {
    country: (parent: Address) => {
      return getCountryByAddress(parent)
    },
  },
  GqlLocationObjectType: {
    address: (parent: Location) => {
      const address = addresses.find((address) => address.id === parent.addressId)

      if (!address) {
        return {
          id: 0,
          country: {
            id: 0,
            name: 'Unknown',
          },
          postCode: 'N/A',
          city: 'Unknown',
          address: 'Unknown',
        }
      }

      return {
        ...address,
        country: getCountryByAddress(address),
      }
    },
    area: (parent: Location) => {
      return areas.find((area) => area.id === parent.areaId)
    },
    brands: (parent: Location) => {
      return simplifiedBrands.filter((brand) => parent.brandIds.includes(brand.id))
    },
  },
  GqlGetWorkObjectType: {
    qualification: (parent: MockedGqlWorkshopWork) => {
      return workshopQualifications.find((qualification) => qualification.id === parent.qualificationId)
    },
    brands: (parent: MockedGqlWorkshopWork) => {
      return workshopBrands.filter((brand) => parent.brandIds.includes(brand.id))
    },
  },
  GqlGetFollowUpWorkObjectType: {
    qualification: (parent: MockedGqlWorkshopFollowUpWork) => {
      return workshopQualifications.find((qualification) => qualification.id === parent.qualificationId)
    },
  },
}
