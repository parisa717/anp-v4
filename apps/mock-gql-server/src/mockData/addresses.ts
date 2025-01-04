export type MockedGqlAddress = {
  id: string
  countryId: string
  postCode: string
  city: string
  address: string
}

export const addresses: MockedGqlAddress[] = [
  {
    id: '1',
    countryId: '1',
    postCode: '00000',
    city: 'Markkleeberg',
    address: 'Magdeborner Str. 12',
  },
  {
    id: '2',
    countryId: '1',
    postCode: '00000',
    city: 'Leipzig',
    address: 'Example street 12',
  },
  {
    id: '3',
    countryId: '1',
    postCode: '00000',
    city: 'Taucha',
    address: 'Äußere Leipziger Str 82',
  },
  {
    id: '4',
    countryId: '1',
    postCode: '00000',
    city: 'Schkeuditz',
    address: 'Example street 12',
  },
]
