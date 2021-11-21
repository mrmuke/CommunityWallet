import i18n from 'i18n-js'
import { english } from './english'
import { chinese } from './chinese'

i18n.translations = {
    en: english,
    ja: chinese,
}

i18n.locale = 'en'

export default i18n