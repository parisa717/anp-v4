import { GraphQLError } from 'graphql/error'

import { AreaErrorCode } from '@/entities/area'

export const GET_AREA_OPERATION_DEFAULT_RESPONSE = {
  getArea: {
    id: '1',
    code: '001',
    name: 'AAC Albert Sigg GmbH',
    isActive: true,
    address: {
      country: {
        id: '1',
        name: 'Germany',
      },
      postCode: '00000',
      city: 'Markkleeberg',
      address: 'Magdeborner Str. 12',
    },
    dms: 'DMS System',
    crm: 'CRM System',
  },
}

export const CREATE_AREA_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Area already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['createArea'],
  extensions: {
    code: AreaErrorCode.AREA_ALREADY_EXISTS,
    message: 'Area already exists.',
    context: {
      name: 'Area 1',
    },
  },
}
