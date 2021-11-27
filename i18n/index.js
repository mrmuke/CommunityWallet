import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { english } from './english';
import { chinese } from './chinese';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'cn',

    resources: {
      en: {translation:english},
      cn:{translation:chinese},
    },


    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n