import { useTranslation } from "react-i18next";
import LangLink from "utils/LangLink";
import CategoryCard from "modules/core/components/CategoryCard";
import CategoryNames from "components/CategoryNames";
import { categories } from "./data";
import styles from "./index.module.scss";

const Categories = () => {
  const { t } = useTranslation();
  const { byKey } = CategoryNames(t);

  return (
    <div className={styles.categories}>
      {categories.map(({ image, categoryName }) => (
        <LangLink to={`/product-category/${categoryName}`} key={categoryName}>
          <CategoryCard
            image={image}
            categoryName={byKey[categoryName]}
            key={categoryName}
          />
        </LangLink>
      ))}
    </div>
  );
};

export default Categories;
