import { FC } from "react";
import { CartItem } from "utils/card";
import ShoppingBagCard from "../ShoppingBagCard";
import styles from "./index.module.scss";

interface ShoppingBagListProps {
  products: CartItem[];
  setProducts: (items: CartItem[]) => void;
  delProduct: (
    productId: string,
    attributes?: {
      name: string;
      value: string;
    }[]
  ) => void;
}

const ShoppingBagList: FC<ShoppingBagListProps> = ({
  products,
  setProducts,
  delProduct,
}) => (
  <div className={styles.shoppingBagList}>
    {products.map(({ id, quantity, attributes }) => (
      <ShoppingBagCard
        id={id}
        quantity={quantity}
        setProducts={setProducts}
        delProduct={delProduct}
        attributes={attributes}
      />
    ))}
  </div>
);

export default ShoppingBagList;
