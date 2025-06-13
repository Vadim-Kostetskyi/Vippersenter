import { FC } from "react";
import styles from "./index.module.scss";
import FilterButton from "../FilterButton";

export interface FilterItemProps {
  label: string;
  items: string[];
}

interface ProductCategoryModelProps {
  image: string;
  category: string;
  filterItems: FilterItemProps[];
}

const ProductCategoryModel: FC<ProductCategoryModelProps> = ({
  image,
  category,
  filterItems,
}) => (
  <>
    <div className={styles.topContainer}>
      <img src={image} alt="" />
      <h1>{category}</h1>
    </div>
    <FilterButton filterItems={filterItems} />
  </>
);

export default ProductCategoryModel;
