import { useTranslation } from "react-i18next";
import CategoriesHeader from "components/CategoriesHeader";
import LangLink from "utils/LangLink";
import styles from "./index.module.scss";

const HeaderModalNavigation = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.headerModalNavigation}>
      <LangLink to={"/product-category"}>{t("catalog")}</LangLink>
      <CategoriesHeader />
      <LangLink to={"/about-us"}>{t("header.aboutUs")}</LangLink>
    </div>
  );
};

export default HeaderModalNavigation;
