import {
  additionalBusinessStatuses,
  additionalBusinessStatusesByLocation,
  addresses,
  areas,
  businessStatuses,
  businessStatusesByLocation,
  countries,
  crms,
  dmss,
  MockedGqlWorkshopFollowUpWork,
  MockedGqlWorkshopWork,
  permissions,
  simplifiedBrands,
  works,
  workshopBrands,
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

export const resolverMap = {
  Query: {
    areas() {
      return areas
    },
    addresses() {
      return addresses
    },
    countries() {
      return countries
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
    getUserPermissions(_: unknown) {
      return { permissions }
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
    createLocation: (_: unknown, { location }: { location: GqlCreateLocationInputType }) => ({
      operationId: 'mocked-location-id',
      ...location,
      status: true,
    }),
    createAdditionalBusinessStatuses: () => ({
      operationId: 'mocked-additional-business-statuses-id',
      status: true,
    }),
    createWorkshopWork: () => {
      return {
        operationId: 'mocked-create-workshop-work',
        works,
      }
    },
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
    updateLocationWork: () => ({
      operationId: 'mocked-update-location-work',
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
