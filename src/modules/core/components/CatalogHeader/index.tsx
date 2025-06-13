import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import CategoryNames from "components/CategoryNames";

const CatalogHeader = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <div className={styles.catalogHeader}>
      <div className={styles.lickBox}>
        <a href="#" className={styles.link}>
          {t("catalog")}
        </a>
      </div>
      <div className={styles.subMenu}>
        <ul>
          {list.map(({ key, label }) => (
            <li key={key}>
              <a href={`/product-category/${key}`}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatalogHeader;
