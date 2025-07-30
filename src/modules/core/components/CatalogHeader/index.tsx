import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import CategoryNames from "components/CategoryNames";

const CatalogHeader = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <div className={styles.catalogHeader}>
      <div className={styles.lickBox}>
        <Link to="/product-category" className={styles.link}>
          {t("catalog")}
        </Link>
      </div>
      <div className={styles.subMenu}>
        <ul>
          {list.map(({ key, label }) => (
            <li key={key}>
              <Link to={`/product-category/${key}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatalogHeader;
