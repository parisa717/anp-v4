import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { useFieldArray, useForm } from 'react-hook-form'

import { AvailabilityColorEntity } from '@/entities/availabilityColor'

import { EditColorSetupFormSchema, editColorSetupFormSchema } from '../model/formSchema'

type useEditColorSetupFormParams = {
  availabilityColors: AvailabilityColorEntity[]
}

const DEFAULT_AVAILABILITY_COLOR: EditColorSetupFormSchema['availabilityColors'][number] = {
  id: '',
  color: '000000',
  capacityValueWithoutPercentages: '',
}

const prepareAvailabilityColorsDefaultValues = (availabilityColors: AvailabilityColorEntity[]) => {
  return (
    availabilityColors?.map((color) => ({
      id: color.id,
      color: color.color,
      capacityValueWithoutPercentages: color.capacityValue.replace(/%/g, ''),
    })) || []
  )
}

export const useEditColorSetupForm = ({ availabilityColors }: useEditColorSetupFormParams) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditColorSetupFormSchema>({
    resolver: zodResolver(editColorSetupFormSchema(t)),
    values: {
      availabilityColors: prepareAvailabilityColorsDefaultValues(availabilityColors),
    },
  })

  const { fields, append, remove } = useFieldArray<EditColorSetupFormSchema>({
    control: control,
    name: 'availabilityColors',
  })

  const handleAddNewColor = () => {
    append({ ...DEFAULT_AVAILABILITY_COLOR })
  }

  return {
    fields,
    errors,
    control,
    handleAddNewColor,
    remove,
    handleSubmit,
  }
}
