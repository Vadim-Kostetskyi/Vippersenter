import ProductCart from "modules/product/components/ProductCart";
import styles from "./index.module.scss";

const Product = () => {
  return (
    <div className={styles.product}>
      <ProductCart />
    </div>
  );
};

export default Product;
