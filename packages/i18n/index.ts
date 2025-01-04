import i18n, { ResourceLanguage } from 'i18next'
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next'

import commonDeTranslations from './commonTranslations/de.json'
import commonEnTranslations from './commonTranslations/en.json'

const commonLanguages = ['de', 'en'] as const

export type SupportedLanguages = (typeof commonLanguages)[number]

export function isSupportedLanguage(language: string): language is SupportedLanguages {
  return commonLanguages.some((commonLanguage) => commonLanguage === language)
}

type NestedTranslationRecord = {
  [key: string]: string | NestedTranslationRecord
}

type CommonTranslations = Record<SupportedLanguages, NestedTranslationRecord>

const commonTranslations: CommonTranslations = {
  en: commonEnTranslations,
  de: commonDeTranslations,
}

export function initInternationalization(
  translations?: Record<SupportedLanguages, ResourceLanguage>,
  config = {
    lng: 'de',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
  },
) {
  const commonResources = commonLanguages.reduce(
    (acc, languageKey) => ({
      ...acc,
      [languageKey]: {
        translation: {
          ...commonTranslations[languageKey],
        },
      },
    }),
    {},
  )

  i18n.use(initReactI18next).init({
    resources: commonResources,
    ...config,
  })

  if (translations) {
    Object.keys(translations)
      .filter(isSupportedLanguage)
      .forEach((language) => {
        i18n.addResourceBundle(language, 'translation', { ...translations[language] }, true, true)
      })
  }
}

export { I18nextProvider, useTranslation }
export default i18n
