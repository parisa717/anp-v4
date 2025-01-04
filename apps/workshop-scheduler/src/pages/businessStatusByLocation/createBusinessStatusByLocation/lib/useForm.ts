import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { SelectItem } from 'primereact/selectitem'
import { useFieldArray, useForm } from 'react-hook-form'

import { CreateBusinessStatusByLocationFormSchema, createBusinessStatusFormByLocationSchema } from '../model/formSchema'

const DEFAULT_BUSINESS_STATUS: CreateBusinessStatusByLocationFormSchema['businessStatuses'][number] = {
  id: '',
}

export const useCreateBusinessStatusByLocationForm = () => {
  const { t } = useTranslation()

  const { control, formState, handleSubmit } = useForm<CreateBusinessStatusByLocationFormSchema>({
    resolver: zodResolver(createBusinessStatusFormByLocationSchema(t)),
    defaultValues: {
      businessStatuses: [{ id: '' }],
    },
  })

  const { fields, append, remove, replace } = useFieldArray<CreateBusinessStatusByLocationFormSchema>({
    control,
    name: 'businessStatuses',
  })

  const handleAddOneStatus = () => {
    append({ ...DEFAULT_BUSINESS_STATUS })
  }

  const handleAddAllStatuses = (statuses: SelectItem[]) => {
    const allStatuses = statuses.map((status) => ({ id: status.value }))
    replace(allStatuses)
  }

  return {
    fields,
    control,
    formState,
    append,
    remove,
    handleAddAllStatuses,
    handleAddOneStatus,
    handleSubmit,
  }
}
