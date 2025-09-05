import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationUn from "./locales/en/translation.json";
import translationNb from "./locales/nb/translation.json";

const resources = {
  en: {
    translation: translationUn,
  },
  nb: {
    translation: translationNb,
  },
};

const path = window.location.pathname;
let pathLang: "en" | "nb" = "nb";

if (path.startsWith("/en")) {
  pathLang = "en";
}
console.log(pathLang);

i18n.use(initReactI18next).init({
  resources,
  // lng: "nb",
  lng: pathLang,
  fallbackLng: "nb",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
