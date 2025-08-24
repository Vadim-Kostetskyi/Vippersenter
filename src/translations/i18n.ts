import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationUa from "./locales/ua/translation.json";
import translationNb from "./locales/nb/translation.json";

const resources = {
  ua: {
    translation: translationUa,
  },
  nb: {
    translation: translationNb,
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
