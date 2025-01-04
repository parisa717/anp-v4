import { TFunction } from 'i18next'

export const mapDayNumberToDayName = (t: TFunction): Record<number, string> => ({
  0: t('sunday'),
  1: t('monday'),
  2: t('tuesday'),
  3: t('wednesday'),
  4: t('thursday'),
  5: t('friday'),
  6: t('saturday'),
})
