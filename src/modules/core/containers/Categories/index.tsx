import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
        <Link to={`/product-category/${categoryName}`} key={categoryName}>
          <CategoryCard
            image={image}
            categoryName={byKey[categoryName]}
            key={categoryName}
          />
        </Link>
      ))}
    </div>
  );
};

export default Categories;
