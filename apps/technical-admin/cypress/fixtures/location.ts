import { GetLocationsQuery } from '@/entities/location/api/Location.generated'

export const GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE: GetLocationsQuery = {
  getLocations: {
    locations: [
      {
        id: '1',
        code: '001',
        name: 'AAC Albert Sigg GmbH',
        isActive: false,
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
