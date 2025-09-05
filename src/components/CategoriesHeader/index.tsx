import { useTranslation } from "react-i18next";
import LangLink from "utils/LangLink";
import Arrow from "assets/svg/Arrow";
import CategoryNames from "components/CategoryNames";
import styles from "./index.module.scss";

const CategoriesHeader = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <ul className={styles.categoriesHeader}>
      {list.map(({ key, label }) => {
        return (
          <li key={key}>
            <LangLink to={`/product-category/${key}`}>{label}</LangLink>
            <Arrow />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoriesHeader;
