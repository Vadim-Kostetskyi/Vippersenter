import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationNb from "./locales/nb/translation.json";
import validationEn from "./locales/en/validation.json";
import validationNb from "./locales/nb/validation.json";

const resources = {
  en: {
    translation: translationEn,
    validation: validationEn,
  },
  nb: {
    translation: translationNb,
    validation: validationNb,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "nb",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
