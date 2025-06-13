import { FC } from "react";
import styles from "./index.module.scss";
import FilterButton from "../FilterButton";

interface ProductCategoryModelProps {
  image: string;
  category: string;
}

const ProductCategoryModel: FC<ProductCategoryModelProps> = ({
  image,
  category,
}) => (
  <>
    <div className={styles.topContainer}>
      <img src={image} alt="" />
      <h1>{category}</h1>
    </div>
    <FilterButton />
  </>
);

export default ProductCategoryModel;
