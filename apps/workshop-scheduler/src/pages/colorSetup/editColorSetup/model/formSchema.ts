import { TFunction } from 'i18next'
import { z } from 'zod'

import {
  validateCapacityFormat,
  validateFirstCapacityStartsWithZero,
  validateLastCapacityGreaterThanPrevious,
  validateLastCapacityNotGreaterThan100,
  validateNoGapsBetweenCapacities,
  validateNoOverlappingCapacityRanges,
} from './validation'

export const editColorSetupFormSchema = (t: TFunction) =>
  z.object({
    availabilityColors: z
      .array(
        z.object({
          id: z.string(),
          color: z.string().min(1, t('validation.required')),
          capacityValueWithoutPercentages: z.string().min(1, t('validation.required')),
        }),
      )
      .refine((colors) => validateFirstCapacityStartsWithZero(colors), {
        message: t('pages.colorSetup.editColorSetup.form.validation.firstCapacityMustStartWithZero'),
        path: [0, 'capacityValueWithoutPercentages'],
      })
      .refine(
        (colors) => {
          return validateCapacityFormat(colors).isValid
        },
        (colors) => ({
          message: t('pages.colorSetup.editColorSetup.form.validation.capacityShouldHaveASpecifiedFormat'),
          path: [validateCapacityFormat(colors).errorIndex, 'capacityValueWithoutPercentages'],
        }),
      )
      .refine(
        (colors) => validateLastCapacityNotGreaterThan100(colors),
        (colors) => ({
          message: t('pages.colorSetup.editColorSetup.form.validation.lastCapacityShouldNotBeGreaterThan100'),
          path: [colors.length - 1, 'capacityValueWithoutPercentages'],
        }),
      )
      .superRefine((colors, ctx) => {
        if (!validateLastCapacityGreaterThanPrevious(colors)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('pages.colorSetup.editColorSetup.form.validation.lastCapacityShouldBeGreaterThanPrevious'),
            path: [colors.length - 2, 'capacityValueWithoutPercentages'],
          })
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('pages.colorSetup.editColorSetup.form.validation.lastCapacityShouldBeGreaterThanPrevious'),
            path: [colors.length - 1, 'capacityValueWithoutPercentages'],
          })
        }
      })
      .superRefine((colors, ctx) => {
        const { isValid, overlappingPairs } = validateNoOverlappingCapacityRanges(colors)
        if (!isValid) {
          overlappingPairs.forEach(([pairIndex1, pairIndex2]) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('pages.colorSetup.editColorSetup.form.validation.capacitiesShouldNotOverlap'),
              path: [pairIndex1, 'capacityValueWithoutPercentages'],
            })
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('pages.colorSetup.editColorSetup.form.validation.capacitiesShouldNotOverlap'),
              path: [pairIndex2, 'capacityValueWithoutPercentages'],
            })
          })
        }
      })
      .superRefine((colors, ctx) => {
        const { isValid, gapPairs } = validateNoGapsBetweenCapacities(colors)
        if (!isValid) {
          gapPairs.forEach(([pairIndex1, pairIndex2]) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('pages.colorSetup.editColorSetup.form.validation.capacitiesShouldNotHaveGaps'),
              path: [pairIndex1, 'capacityValueWithoutPercentages'],
            })
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('pages.colorSetup.editColorSetup.form.validation.capacitiesShouldNotHaveGaps'),
              path: [pairIndex2, 'capacityValueWithoutPercentages'],
            })
          })
        }
      }),
  })

export type EditColorSetupFormSchema = z.infer<ReturnType<typeof editColorSetupFormSchema>>
