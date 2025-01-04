import { hoursAndMinutesToDate } from '@nexus-ui/utils'
import { TFunction } from 'i18next'
import { z } from 'zod'

export type WorkingDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export const dayNumberToDayNameSchemaMapper: Record<number, WorkingDay> = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
}

const createBreakSchema = (t: TFunction) =>
  z
    .object({
      startTime: z.string(),
      endTime: z.string(),
    })
    .superRefine((val, ctx) => {
      // checking if there is a break
      if (val?.startTime && val?.endTime) {
        // checking whether the start and end times are equal
        if (val.startTime === val.endTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('pages.counterConfiguration.sections.counterCalendar.editForm.validationMessages.equalTime'),
          })
        }
        // checking if the start time is later than the end time
        if (hoursAndMinutesToDate(val.startTime) > hoursAndMinutesToDate(val.endTime)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t(
              'pages.counterConfiguration.sections.counterCalendar.editForm.validationMessages.startTimeLaterThanEndTime',
            ),
          })
        }
      }
    })

const createWorkingDaySchema = (t: TFunction) =>
  z
    .object({
      startTime: z.string(),
      endTime: z.string(),
      breaks: z.array(createBreakSchema(t)),
    })
    .superRefine((val, ctx) => {
      // checking whether the start and end times are equal
      if (val.startTime === val.endTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('pages.counterConfiguration.sections.counterCalendar.editForm.validationMessages.equalTime'),
        })
      }
      // checking if the start time is later than the end time
      if (hoursAndMinutesToDate(val.startTime) > hoursAndMinutesToDate(val.endTime)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t(
            'pages.counterConfiguration.sections.counterCalendar.editForm.validationMessages.startTimeLaterThanEndTime',
          ),
        })
      }
      if (val.breaks.length) {
        val.breaks.forEach((b, index) => {
          // checking whether the breaks are between the defined working time for the day
          if (
            hoursAndMinutesToDate(b?.startTime || '') < hoursAndMinutesToDate(val.startTime) ||
            hoursAndMinutesToDate(b?.endTime || '') > hoursAndMinutesToDate(val.endTime)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t(
                'pages.counterConfiguration.sections.counterCalendar.editForm.validationMessages.breakDuringWorkingHours',
              ),
              path: ['breaks', index],
            })
          }
        })
      }
    })

export const createWorkingDaysSchema = (t: TFunction) =>
  z.object({
    monday: createWorkingDaySchema(t),
    tuesday: createWorkingDaySchema(t),
    wednesday: createWorkingDaySchema(t),
    thursday: createWorkingDaySchema(t),
    friday: createWorkingDaySchema(t),
    saturday: createWorkingDaySchema(t),
  })

export type WorkingDaysSchema = z.infer<ReturnType<typeof createWorkingDaysSchema>>
