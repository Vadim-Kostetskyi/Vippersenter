import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

interface LanguageSelectorProps {
  mobile?: boolean;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ mobile }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (lang: string) => {
    const language = lang.toLowerCase();
    i18n.changeLanguage(language);

    const { pathname } = location;
    const segments = pathname.split("/").filter(Boolean);

    if (["en"].includes(segments[0])) {
      segments[0] = language;
    } else {
      segments.unshift(language);
    }

    const newPath =
      language === "nb"
        ? `/${segments.slice(1).join("/")}`
        : `/${segments.join("/")}`;

    navigate(newPath || "/", { replace: true });
  };

  // якщо шлях починається з /en → EN, інакше NL
  const currentLang = location.pathname.startsWith("/en") ? "EN" : "NB";
  const list = ["NB", "EN"];

  return (
    <select
      className={mobile ? styles.dropDownMobile : styles.dropDown}
      value={currentLang}
      onChange={(e) => handleChange(e.target.value)}
    >
      {list.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
