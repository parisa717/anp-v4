import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformCountries } from '../lib/transformCountries'
import { type CountryEntity } from '../model/types'
import { api, GetCountriesQuery } from './Country.generated'

type CountryApi = ApiWithTransformResponse<typeof api, ['GetCountries'], { GetCountries: CountryEntity[] }>
type TagTypes = CountryApi['TagTypes']
type ApiEndpointDefinitions = CountryApi['ApiEndpointDefinitions']

export const countryApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetCountries: {
      transformResponse: (response: GetCountriesQuery) => transformCountries(response.getCountries.countries),
    },
  },
})

export const { useGetCountriesQuery } = countryApi
