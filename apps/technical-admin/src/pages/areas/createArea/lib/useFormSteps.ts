import { useTranslation } from '@nexus-ui/i18n'

import { CreateAreaFormStep } from '../model/types'

export const useFormSteps = () => {
  const { t } = useTranslation()
  const translate = (formStep: CreateAreaFormStep, key: string) => t(`pages.areas.createArea.steps.${formStep}.${key}`)

  const formSteps = [
    {
      label: translate(CreateAreaFormStep.General, 'title'),
    },
    {
      label: translate(CreateAreaFormStep.DMS, 'title'),
    },
    {
      label: translate(CreateAreaFormStep.CRM, 'title'),
    },
  ]

  return { formSteps }
}
