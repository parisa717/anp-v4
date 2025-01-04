import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarFormField, InputTextFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { parseCustomerBirthDateCalendarFieldDateTime } from '../../../lib/parseCustomerBirthDateCalendarFieldDateTime'
import { CustomerAndVehicleFormType, searchCustomerAndVehicleFormSchema } from '../../../model/formSchema'

const inputTextFormFieldClassname = { container: 'flex-1', input: 'w-full', error: 'm-0' }

export const SearchForm = ({ onSearch }: { onSearch: (data: CustomerAndVehicleFormType) => void }) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.searchForm.${key}`)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CustomerAndVehicleFormType>({
    resolver: zodResolver(searchCustomerAndVehicleFormSchema(t)),
  })

  return (
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
  )
}
