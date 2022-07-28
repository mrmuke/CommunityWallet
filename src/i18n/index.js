import * as SecureStore from 'expo-secure-store'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'

import { english } from './english'
import { chinese } from './chinese'

function callFallbackIfFunc(fallback, callback){
  if(typeof fallback === 'function'){
    return fallback(callback)
  }

  return callback(fallback)
}

i18n
.use(initReactI18next)
.init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: {
    en: { translation:english },
    cn: { translation:chinese },
  },
  interpolation: {
    escapeValue: false
  },
})

export default i18n