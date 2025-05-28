import { useTranslation } from "react-i18next";
import CategoryCard from "modules/core/components/CategorieCard";
import CategoryNames from "components/CategoryNames";
import { categories } from "./data";
import styles from "./index.module.scss";

const Categories = () => {
  const { t } = useTranslation();
  const { byKey } = CategoryNames(t);

  return (
    <div className={styles.wrapper}>
      {categories.map(({ image, categoryName }) => (
        <CategoryCard
          image={image}
          categoryName={byKey[categoryName]}
          key={categoryName}
        />
      ))}
    </div>
  );
};

export default Categories;
