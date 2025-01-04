import { TFunction } from 'i18next'
import { z } from 'zod'

export const editBusinessStatusFormSchema = (t: TFunction, isAdditionalBusinessStatus: boolean) =>
  z.object({
    name: z.string().min(1, t('validation.required')),
    isDefault: z.boolean(),
    isHighlighted: z
      .boolean()
      .optional()
      .refine(
        (value) => {
          // If it's an additional business status, ensure it's strictly a boolean
          if (isAdditionalBusinessStatus) {
            return typeof value === 'boolean'
          }

          // Otherwise, accept any value; no validation for 'regular' business statuses as the isHighlighted field doesn't exist
          return true
        },
        { message: t('validation.required') },
      ),
  })

export type EditBusinessStatusFormSchema = z.infer<ReturnType<typeof editBusinessStatusFormSchema>>
