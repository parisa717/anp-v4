import i18n, { initInternationalization } from '@nexus-ui/i18n'
import React, { useEffect } from 'react'

import '../stories/index.css'

initInternationalization()

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'de', title: 'Deutsch' },
        { value: 'en', title: 'English' },
      ],
      default: 'de',
      showName: true,
    },
  },
}

const withI18next = (Story, context) => {
  const { locale } = context.globals

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return <Story />
}

export const decorators = [withI18next]
