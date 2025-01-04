import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router'

import {
  AVAILABILITY_COLORS_CREATION_LIMIT,
  parseCapacityValue,
  useAvailabilityColorsListData,
  useUpdateAvailabilityColorsMutation,
} from '@/entities/availabilityColor'
import { pageUrls } from '@/shared/lib'

import { useEditColorSetupForm } from '../lib/useForm'
import { EditColorSetupFormSchema } from '../model/formSchema'
import { EditColorSetupForm } from './Form'

const EditColorSetupPage = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.colorSetup.colorSetupList.${key}`)

  const { availabilityColors, isLoading } = useAvailabilityColorsListData()
  const [updateAvailabilityColors, { isLoading: isLoadingUpdateAvailabilityColors }] =
    useUpdateAvailabilityColorsMutation()

  const { control, fields, errors, handleAddNewColor, remove, handleSubmit } = useEditColorSetupForm({
    availabilityColors,
  })
  const isAddNewColorButtonDisabled = fields.length >= AVAILABILITY_COLORS_CREATION_LIMIT

  const onSubmitHandler = async (formData: EditColorSetupFormSchema) => {
    // TODO: Add error handling

    const updatedAvailabilityColorsData = formData.availabilityColors.map((color) => {
      return {
        color: color.color,
        ...parseCapacityValue(color.capacityValueWithoutPercentages),
      }
    })

    await updateAvailabilityColors({
      availabilityColors: updatedAvailabilityColorsData,
    })

    navigate(pageUrls.colorSetup.root())
  }

  const handleCancelClick = () => {
    navigate(pageUrls.colorSetup.root())
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <section className="flex flex-col gap-9 w-[55%] min-w-[784px]">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-3xl text-bluegray-700 m-0 font-normal">{translate('capacitiesColors')}</h3>
          <div className="flex flex-row gap-2">
            <Button
              label={translate('addColor')}
              severity="secondary"
              outlined
              onClick={handleAddNewColor}
              disabled={isAddNewColorButtonDisabled}
            />
          </div>
        </div>
        <EditColorSetupForm
          control={control}
          fields={fields}
          errors={errors}
          onSubmit={handleSubmit(onSubmitHandler)}
          onCancel={handleCancelClick}
          onRemove={remove}
          isUpdating={isLoadingUpdateAvailabilityColors}
        />
      </section>
    </main>
  )
}

export default EditColorSetupPage
