import i18n from 'i18n-js'
import * as Localization from 'expo-localization';
import { english } from './english'
import { chinese } from './chinese'

i18n.translations = {
    en: english,
    cn: chinese,
}

i18n.locale = Localization.locale

export default i18n