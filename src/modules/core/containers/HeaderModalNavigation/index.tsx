import { useTranslation } from "react-i18next";
import CategoriesHeader from "components/CategoriesHeader";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const HeaderModalNavigation = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.headerModalNavigation}>
      <Link to={"/product-category"}>{t("catalog")}</Link>
      <CategoriesHeader />
      <Link to={"/about-us"}>{t("header.aboutUs")}</Link>
    </div>
  );
};

export default HeaderModalNavigation