export type MockedGqlArea = {
  id: string
  code: string
  name: string
  addressId: string
  dmsId: string
  crmId: string
  isActive: boolean
}

export const areas: MockedGqlArea[] = [
  {
    id: '1',
    code: '001',
    name: 'AAC Albert Sigg GmbH',
    addressId: '1',
    dmsId: '1',
    crmId: '1',
    isActive: true,
  },
  {
    id: '3',
    code: '003',
    name: 'AMZ Leipzig GmbH',
    addressId: '2',
    dmsId: '2',
    crmId: '2',
    isActive: true,
  },
  {
    id: '5',
    code: '005',
    name: 'Georg Haas GmbH',
    addressId: '3',
    dmsId: '2',
    crmId: '1',
    isActive: true,
  },
  {
    id: '7',
    code: '007',
    name: 'Autohaus Heaberlen GmbH',
    addressId: '4',
    dmsId: '2',
    crmId: '2',
    isActive: true,
  },
]
