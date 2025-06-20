import { FC } from "react";
import ProductListCard from "modules/product/components/ProductListCard";
import { Product } from "storeRedux/types";
import styles from "./index.module.scss";

interface ProductCategoryProps {
  products: Product[] | undefined;
}

const ProductListCategory: FC<ProductCategoryProps> = ({ products }) => (
  <div className={styles.productListCategory}>
    {products?.map(({ image, price, name, _id }) => (
      <ProductListCard image={image} price={price} name={name} id={_id} />
    ))}
  </div>
);

export default ProductListCategory;
