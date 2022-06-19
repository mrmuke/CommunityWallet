import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { english } from './english'
import { chinese } from './chinese'

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: callback => {
    return AsyncStorage.getItem('setLanguage').then(res=>{
        callback(res)
    })
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18n
.use(languageDetector)
.use(initReactI18next)
.init({
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