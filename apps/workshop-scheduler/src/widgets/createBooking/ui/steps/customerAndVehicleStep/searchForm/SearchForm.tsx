import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { CalendarFormField, InputTextFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { parseCustomerBirthDateCalendarFieldDateTime } from '../../../../lib/'
import { DEFAULT_CUSTOMER_AND_VEHICLE_STEP_FILTERS } from '../../../../model/consts'
import { CustomerAndVehicleFormType, searchCustomerAndVehicleFormSchema } from '../../../../model/formSchema'
import { FilterBadgesList } from '../filterBadgesList'

const inputTextFormFieldClassname = { container: 'flex-1', input: 'w-full', error: 'm-0' }

interface SearchFormProps {
  onSearch: (data: CustomerAndVehicleFormType) => void
  initialValues?: CustomerAndVehicleFormType | null
}

export const SearchForm = ({ onSearch, initialValues }: SearchFormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.searchForm.${key}`)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    reset,
    setValue,
  } = useForm<CustomerAndVehicleFormType>({
    resolver: zodResolver(searchCustomerAndVehicleFormSchema(t)),
    defaultValues: initialValues
      ? {
          ...initialValues,
          customerBirthDate: initialValues.customerBirthDate ? new Date(initialValues.customerBirthDate) : undefined,
        }
      : { ...DEFAULT_CUSTOMER_AND_VEHICLE_STEP_FILTERS },
  })

  const formValues = getValues()

  function isFormKey(key: string): key is keyof CustomerAndVehicleFormType {
    return Object.keys(formValues).includes(key)
  }

  const appliedFilters = Object.entries(formValues).flatMap(([key, value]) => {
    if (value && isFormKey(key)) {
      return [{ label: key, value }]
    }

    return []
  })

  const handleFilterRemove = (filterName: keyof CustomerAndVehicleFormType) => {
    setValue(filterName, '', {
      shouldValidate: true,
      shouldDirty: true,
    })
    handleSubmit(onSearch)()
  }

  const handleFiltersClear = () => {
    reset({ ...DEFAULT_CUSTOMER_AND_VEHICLE_STEP_FILTERS })
    handleSubmit(onSearch)()
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSearch)} className="grid grid-cols-3 gap-6">
        <InputTextFormField
          name="customerName"
          hasFloatLabel
          label={translate('customerName')}
          control={control}
          error={errors.customerName}
          className={inputTextFormFieldClassname}
        />
        <CalendarFormField
          inputRef={inputRef}
          name="customerBirthDate"
          dateFormat="dd.mm.yy"
          showButtonBar
          hasFloatLabel
          control={control}
          label={translate('customerBirthDate')}
          parseDateTime={parseCustomerBirthDateCalendarFieldDateTime}
          showIcon
          error={errors.customerBirthDate}
          pt={{
            root: {
              className: 'w-full',
              onClick: () => inputRef.current?.focus(),
            },
          }}
        />
        <InputTextFormField
          name="customerPhone"
          hasFloatLabel
          type="tel"
          label={translate('customerPhone')}
          control={control}
          error={errors.customerPhone}
          className={inputTextFormFieldClassname}
        />
        <InputTextFormField
          name="vehicleLicencePlate"
          hasFloatLabel
          label={translate('vehicleLicencePlate')}
          control={control}
          error={errors.vehicleLicencePlate}
          className={inputTextFormFieldClassname}
        />
        <InputTextFormField
          name="vehicleVin"
          hasFloatLabel
          label={translate('vehicleVin')}
          control={control}
          error={errors.vehicleVin}
          className={inputTextFormFieldClassname}
        />
        <Button
          label={t('search')}
          className="capitalize justify-self-end"
          type="submit"
          icon="pi pi-search"
          iconPos="right"
        />
      </form>
      {Boolean(appliedFilters.length) && (
        <FilterBadgesList
          filters={appliedFilters}
          onFiltersClear={handleFiltersClear}
          onFilterRemove={handleFilterRemove}
        />
      )}
    </div>
  )
}
