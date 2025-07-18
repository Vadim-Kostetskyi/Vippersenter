import ProductCard from "modules/product/components/ProductCard";
import AlsoLike from "../AlsoLike";
import styles from "./index.module.scss";

const Product = () => {
  return (
    <div className={styles.product}>
      <ProductCard />
      <AlsoLike />
    </div>
  );
};

export default Product;
