import { FC } from "react";
import ProductListCard from "modules/product/components/ProductListCard";
import { Product } from "storeRedux/types";
import styles from "./index.module.scss";

interface ProductCategoryProps {
  products: Product[] | undefined;
}

const ProductListCategory: FC<ProductCategoryProps> = ({ products }) => (
  <div className={styles.productListCategory}>
    {products?.map(({ image, price, name, slug }) => (
      <ProductListCard image={image} price={price} name={name} slug={slug} />
    ))}
  </div>
);

export default ProductListCategory;
