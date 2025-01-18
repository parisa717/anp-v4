import { Dropdown } from 'primereact/dropdown'
import { useParams } from 'react-router'

import { useGetLocationQuery } from '@/entities/location'
import { IdParam } from '@/shared/lib'

import { Brand } from '../Page'

type Props = {
  selectedBrand: Brand | null
  onChange: (brand: Brand) => void
  errorText: string
}

export const CopyLocationWorkForm = ({ selectedBrand, onChange, errorText }: Props) => {
  const { id = '' } = useParams<IdParam>()
  const {
    data: locationDetails,
    isLoading: isLocationDetailsLoading,
    isSuccess: isLocationDetailsSuccess,
  } = useGetLocationQuery({ id })

  if (!isLocationDetailsSuccess) return

  return (
    <>
      <Dropdown
        value={selectedBrand}
        onChange={(e) => onChange(e.value)}
        options={locationDetails.brands}
        loading={isLocationDetailsLoading}
        optionLabel="code"
        className="w-full"
      />
      {errorText && <p className="text-error m-0">{errorText}</p>}
    </>
  )
}
