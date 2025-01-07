import { GetAreasQuery } from '@/entities/area/api/Area.generated'
import { GetCountriesQuery } from '@/entities/country/api/Country.generated'

export const CREATE_LOCATION_OPERATION_DEFAULT_RESPONSE = {
  id: '123',
}

export const UPDATE_AREA_OPERATION_DEFAULT_RESPONSE = {
  id: 'mocked_area_1',
  code: 'Test Area',
}

export const GET_AREAS_OPERATION_DEFAULT_RESPONSE: GetAreasQuery = {
  getAreas: {
    areas: [
      {
        id: '94',
        code: '832',
        name: 'Konklux',
        address: {
          city: 'Tarnawatka',
          address: '968 Kensington Terrace',
          postCode: '22-604',
          country: {
            id: '10',
            name: 'Poland',
          },
        },
        isActive: false,
      },
      {
        id: '07',
        code: '770',
        name: 'Hatity',
        address: {
          city: 'Rogów',
          address: '27 Arkansas Circle',
          postCode: '95-063',
          country: {
            id: '11',
            name: 'Poland',
          },
        },
        isActive: false,
      },
      {
        id: '14',
        code: '111',
        name: 'Lotstring',
        address: {
          city: 'Stanisław Dolny',
          address: '72810 Kings Street',
          postCode: '34-143',
          country: {
            id: '92',
            name: 'Poland',
          },
        },
        isActive: false,
      },
      {
        id: '33',
        code: '734',
        name: 'Solarbreeze',
        address: {
          city: 'Kołaczyce',
          address: '629 Hayes Park',
          postCode: '38-213',
          country: {
            id: '39',
            name: 'Austria',
          },
        },
        isActive: false,
      },
      {
        id: '27',
        code: '370',
        name: 'Namfix',
        address: {
          city: 'Wilczyce',
          address: '7228 East Road',
          postCode: '27-612',
          country: {
            id: '66',
            name: 'Germany',
          },
        },
        isActive: false,
      },
      {
        id: '64',
        code: '512',
        name: 'Lotlux',
        address: {
          city: 'Ochota',
          address: '411 Pawling Alley',
          postCode: '05-090',
          country: {
            id: '70',
            name: 'Poland',
          },
        },
        isActive: false,
      },
      {
        id: '69',
        code: '246',
        name: 'Alpha',
        address: {
          city: 'Łęczyce',
          address: '12430 Elmside Plaza',
          postCode: '84-218',
          country: {
            id: '05',
            name: 'Germany',
          },
        },
        isActive: true,
      },
      {
        id: '02',
        code: '752',
        name: 'Mat Lam Tam',
        address: {
          city: 'Olsztyn',
          address: '550 Logan Court',
          postCode: '42-256',
          country: {
            id: '98',
            name: 'Austria',
          },
        },
        isActive: true,
      },
      {
        id: '33',
        code: '212',
        name: 'Trippledex',
        address: {
          city: 'Lubichowo',
          address: '9 Springview Drive',
          postCode: '83-240',
          country: {
            id: '62',
            name: 'Poland',
          },
        },
        isActive: false,
      },
      {
        id: '80',
        code: '229',
        name: 'Stim',
        address: {
          city: 'Reda',
          address: '03590 Delaware Drive',
          postCode: '84-240',
          country: {
            id: '06',
            name: 'Austria',
          },
        },
        isActive: true,
      },
    ],
  },
}

export const GET_COUNTRIES_DEFAULT_RESPONSE: GetCountriesQuery = {
  getCountries: {
    countries: [
      {
        id: '1',
        name: 'Germany',
        code: 'DE',
      },
      {
        id: '2',
        name: 'Austria',
        code: 'AT',
      },
    ],
  },
}

export const CREATE_AREA_OPERATION_DEFAULT_RESPONSE = {
  id: 'mocked_area_1',
  code: 'Test Area',
}

export const GET_AREA_OPERATION_DEFAULT_RESPONSE = {
  getArea: {
    id: '1',
    code: '001',
    name: 'AAC Albert Sigg GmbH',
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

    isActive: false,
  },
}
