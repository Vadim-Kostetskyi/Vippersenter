import ProductCart from "modules/product/components/ProductCart";
import AlsoLike from "modules/product/components/AlsoLike";
import styles from "./index.module.scss";

const Product = () => {
  return (
    <div className={styles.product}>
      <ProductCart />
      <AlsoLike />
    </div>
  );
};

export default Product;
