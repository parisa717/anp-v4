import { TFunction } from 'i18next'

import { useGetCountriesQuery } from '@/entities/country'

export const useLoadCountries = (t: TFunction) => {
  const { data: countries, ...rest } = useGetCountriesQuery()

  const translatedCountries = countries?.map((country) => ({
    value: country.id,
    label: t(`countries.${country.name}`),
  }))

  return {
    ...rest,
    countries,
    translatedCountries,
  }
}
