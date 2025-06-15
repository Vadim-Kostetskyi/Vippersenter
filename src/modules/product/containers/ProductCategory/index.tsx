import { useParams } from "react-router-dom";
import ProductCategoryModel from "modules/product/components/ProductCategoryModel";
import ProductListCategory from "../ProductListCategory";
import { images } from "./data";
import FilterButton from "modules/product/components/FilterButton";
import styles from "./index.module.scss";

type CategoryKey = keyof typeof images;

const ProductCategory = () => {
  const { category } = useParams();

  if (!category || !(category in images)) return null;

  return (
    <>
      <ProductCategoryModel
        image={images[category as CategoryKey]}
        category={category}
      />
      <div className={styles.productWrapper}>
        <FilterButton />
        <ProductListCategory />
      </div>
    </>
  );
};

export default ProductCategory;
