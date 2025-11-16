import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import de from "./locales/de.json"
import en from "./locales/en.json"

export const FALLBACK_LANGUAGE = "en"

const getBrowserLanguage = () => {
  const userLang = navigator.language
  return userLang ? userLang.split("-")[0] : FALLBACK_LANGUAGE
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      app: en,
    },
    de: {
      app: de,
    },
  },
  lng: getBrowserLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  defaultNS: "app",
  ns: ["app"],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
