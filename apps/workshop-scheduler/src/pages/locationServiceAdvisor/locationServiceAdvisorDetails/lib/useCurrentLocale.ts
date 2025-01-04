import { isSupportedLanguage, SupportedLanguages, useTranslation } from '@nexus-ui/i18n'
import { de, Locale, uk } from 'date-fns/locale'

export const locales = {
  de,
  en: uk,
}

const langToLocale: Record<SupportedLanguages, Locale> = {
  en: locales.en,
  de: locales.de,
}

export const useCurrentLocale = () => {
  const {
    i18n: { language },
  } = useTranslation()

  const lang = isSupportedLanguage(language) ? language : 'de'
  const currentLocale = langToLocale[lang]

  return { currentLocale }
}
