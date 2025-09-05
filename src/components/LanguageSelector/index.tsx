import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (lang: string) => {
    const language = lang.toLocaleLowerCase();
    i18n.changeLanguage(language);

    if (language === "nl") {
      navigate("/", { replace: true });
    } else {
      navigate(`/${language}`, { replace: true });
    }
  };

  const currentLang = location.pathname.startsWith("/en") ? "EN" : "NL";

  const list = ["NL", "EN"];

  return (
    <select
      className={styles.dropDown}
      defaultValue={currentLang}
      onChange={(e) => handleChange?.(e.target.value)}
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
