import { useTranslation } from "react-i18next";
import CategoryNames from "components/CategoryNames";
import LangLink from "utils/LangLink";
import styles from "./index.module.scss";

const CatalogHeader = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <div className={styles.catalogHeader}>
      <div className={styles.lickBox}>
        <LangLink to="/product-category" className={styles.link}>
          {t("catalog")}
        </LangLink>
      </div>
      <div className={styles.subMenu}>
        <ul>
          {list.map(({ key, label }) => (
            <li key={key}>
              <LangLink to={`/product-category/${key}`}>{label}</LangLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatalogHeader;
