import { useTranslation } from '@nexus-ui/i18n'

import { EditAreaFormStep } from '../model/types'


export const useFormSteps = () => {
  const { t } = useTranslation()
  const translate = (formStep: EditAreaFormStep, key: string) => t(`pages.areas.editArea.steps.${formStep}.${key}`)

  const formSteps = [
    {
      label: translate(EditAreaFormStep.General, 'title'),
    },
    {
      label: translate(EditAreaFormStep.DMS, 'title'),
    },
    {
      label: translate(EditAreaFormStep.CRM, 'title'),
    },
  ]

  return { formSteps }
}
