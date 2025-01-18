import { useTranslation } from '@nexus-ui/i18n'
import { format, toDate } from 'date-fns'

import { ContactType, DeviceType, useGetCustomerQuery } from '@/entities/customer'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { LabelValue } from '../../../../labelValue'

export const CustomerInfo = ({ customerId }: { customerId: string }) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.detailsView.${key}`)

  const { data: customerQueryData, isLoading: isCustomerQueryLoading } = useGetCustomerQuery({ id: customerId })

  // TODO add loading handling
  if (isCustomerQueryLoading) return <div>Loading...</div>
  if (!customerQueryData) return <div>No customer data found</div>

  const {
    title,
    salutation,
    name,
    name2,
    birthdate,
    id,
    phones,
    emails,
    countryCode,
    postCode,
    city,
    address,
    address2,
    serviceAdvisor,
  } = customerQueryData

  const mobilePrivatePhone = phones.find(
    (phone) => phone.contactType === ContactType.PRIVATE && phone.deviceType === DeviceType.MOBILE,
  )?.phone
  const mobileBusinessPhone = phones.find(
    (phone) => phone.contactType === ContactType.BUSINESS && phone.deviceType === DeviceType.MOBILE,
  )?.phone
  const homePrivatePhone = phones.find(
    (phone) => phone.contactType === ContactType.PRIVATE && phone.deviceType === DeviceType.HOME,
  )?.phone
  const homeBusinessPhone = phones.find(
    (phone) => phone.contactType === ContactType.BUSINESS && phone.deviceType === DeviceType.HOME,
  )?.phone

  const privateEmail = emails.find((email) => email.contactType === ContactType.PRIVATE)?.email
  const businessEmail = emails.find((email) => email.contactType === ContactType.BUSINESS)?.email

  return (
    <div className="flex">
      <ServerSideErrorsMessagesList page="global" className="mb-8" />
      {/* Title code container */}
      <div className="flex flex-1 flex-col gap-2">
        <LabelValue label={translate('customerInfoSection.titleCode')} value={title} />
        <LabelValue label={translate('customerInfoSection.addressSalutationCode')} value={salutation} />
        <LabelValue label={translate('customerInfoSection.firstName')} value={name.split(' ')[0]} />
        <LabelValue label={translate('customerInfoSection.lastName')} value={name.split(' ')[1]} />
        <LabelValue label={translate('customerInfoSection.name2')} value={name2} />
        <LabelValue
          label={translate('customerInfoSection.birthDate')}
          value={format(toDate(birthdate), 'dd.MM.yyyy')}
        />
      </div>
      {/* Customer ID container */}
      <div className="flex flex-1 flex-col gap-2">
        <LabelValue label={translate('customerInfoSection.customerId')} value={id} />
        <LabelValue label={translate('customerInfoSection.privateMobile')} value={mobilePrivatePhone} />
        <LabelValue label={translate('customerInfoSection.businessMobile')} value={mobileBusinessPhone} />
        <LabelValue label={translate('customerInfoSection.privateTelephone')} value={homePrivatePhone} />
        <LabelValue label={translate('customerInfoSection.businessTelephone')} value={homeBusinessPhone} />
        <LabelValue label={translate('customerInfoSection.privateEmail')} value={privateEmail} />
        <LabelValue label={translate('customerInfoSection.businessEmail')} value={businessEmail} />
      </div>
      {/* Country code container */}
      <div className="flex flex-1 flex-col gap-2">
        <LabelValue
          label={translate('customerInfoSection.countryCode')}
          value={countryCode}
          className={{ label: '!w-48' }}
        />
        <LabelValue label={translate('customerInfoSection.zipCode')} value={postCode} />
        <LabelValue label={translate('customerInfoSection.city')} value={city} />
        <LabelValue label={translate('customerInfoSection.address')} value={address} />
        <LabelValue label={translate('customerInfoSection.address2')} value={address2} />
        <LabelValue label={translate('customerInfoSection.serviceAdvisorName')} value={serviceAdvisor.name} />
        {/* TODO add missing property, need API modification */}
        <LabelValue label={translate('customerInfoSection.blocked')} value="" />
      </div>
    </div>
  )
}
