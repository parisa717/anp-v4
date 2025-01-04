import { QueryCountries } from '../api/types'
import { type CountryEntity } from '../model/types'

const filterCountries = (country: CountryEntity | null): country is CountryEntity => country !== null

export const transformCountries = (countries: QueryCountries) => {
  return countries?.filter(filterCountries) ?? []
}
