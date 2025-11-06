import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../locales/en/common.json'
import esCommon from '../locales/es/common.json'

const STORAGE_KEY = 'lang'

const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
const initialLng = saved === 'es' || saved === 'en' ? saved : 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    es: { common: esCommon },
  },
  lng: initialLng,
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export const changeLanguage = (lng: 'en' | 'es') => {
  i18n.changeLanguage(lng)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lng)
  }
}

export default i18n
