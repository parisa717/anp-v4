import { GraphQLError } from 'graphql/error'

import { LocationErrorCode } from '@/entities/location'
import { GetLocationsQuery } from '@/entities/location/api/Location.generated'

export const GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE: GetLocationsQuery = {
  getLocations: {
    locations: [
      {
        id: '1',
        code: '001',
        name: 'AAC Albert Sigg GmbH',
        isActive: true,
        address: {
          country: {
            id: '1',
            name: 'Germany',
          },
          postCode: '00001',
          city: 'Markkleeberg',
          address: 'Magdeborner Str. 12',
        },
        area: {
          id: '1',
          code: '001',
          name: 'AAC Albert Sigg GmbH',
        },
        brands: [
          {
            id: 'brand_1',
            code: 'Opel',
            isWorkshopDefault: true,
          },
          {
            id: 'brand_2',
            code: 'Kia',
            isWorkshopDefault: false,
          },
        ],
      },
      {
        id: '3',
        code: '010',
        name: 'AMZ Leipzig GmbH',
        isActive: true,
        address: {
          country: {
            id: '1',
            name: 'Germany',
          },
          postCode: '00000',
          city: 'Leipzig',
          address: 'Example street 12',
        },
        area: {
          id: '3',
          code: '003',
          name: 'AMZ Leipzig GmbH',
        },
        brands: [
          {
            id: 'brand_1',
            code: 'Opel',
            isWorkshopDefault: true,
          },
        ],
      },
      {
        id: '5',
        code: '011',
        name: 'AMZ Leipzig GmbH',
        isActive: true,
        address: {
          country: {
            id: '1',
            name: 'Germany',
          },
          postCode: '00000',
          city: 'Taucha',
          address: 'Äußere Leipziger Str 82',
        },
        area: {
          id: '3',
          code: '003',
          name: 'AMZ Leipzig GmbH',
        },
        brands: [
          {
            id: 'brand_1',
            code: 'Opel',
            isWorkshopDefault: true,
          },
        ],
      },
      {
        id: '7',
        code: '012',
        name: 'AMZ Leipzig GmbH',
        isActive: true,
        address: {
          country: {
            id: '1',
            name: 'Germany',
          },
          postCode: '00000',
          city: 'Schkeuditz',
          address: 'Example street 12',
        },
        area: {
          id: '3',
          code: '003',
          name: 'AMZ Leipzig GmbH',
        },
        brands: [
          {
            id: 'brand_1',
            code: 'Opel',
            isWorkshopDefault: true,
          },
        ],
      },
    ],
  },
}

export const GET_LOCATION_OPERATION_DEFAULT_RESPONSE = {
  getLocation: {
    id: '1',
    code: '001',
    name: 'AAC Albert Sigg GmbH',
    isActive: true,
    address: {
      id: '1',
      country: {
        id: '1',
        name: 'Germany',
      },
      postCode: '00000',
      city: 'Markkleeberg',
      address: 'Magdeborner Str. 12',
    },
    area: {
      id: '1',
      code: '001',
      name: 'AAC Albert Sigg GmbH',
    },
    brands: [
      {
        id: 'brand_1',
        code: 'Opel',
        isWorkshopDefault: true,
      },
      {
        id: 'brand_2',
        code: 'Kia',
        isWorkshopDefault: false,
      },
    ],
  },
}

export const GET_WORKSHOP_CONNECTED_LOCATIONS_DEFAULT_RESPONSE = {
  getWorkshopConnectedLocations: {
    workshopConnectedLocations: [
      {
        connectedLocationId: '1',
      },
      {
        connectedLocationId: '5',
      },
    ],
  },
}

export const CREATE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE = {
  createWorkshopLocationWork: {
    status: true,
  },
}

export const CREATE_CONNECTED_LOCATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Location already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['createWorkshopConnectedLocations'],
  extensions: {
    code: LocationErrorCode.LOCATION_ALREADY_EXISTS,
    message: 'Location already exists.',
    context: {
      name: 'Location 1',
    },
  },
}
