import { FC } from "react";
import { CartItem } from "utils/card";
import ShoppingBagCard from "../ShoppingBagCard";
import styles from "./index.module.scss";
import { Values } from "storeRedux/types";

interface ShoppingBagListProps {
  products: CartItem[];
  setProducts: (items: CartItem[]) => void;
  delProduct: (
    productId: string,
    attributes?: {
      name: string;
      value: Values;
    }[]
  ) => void;
}

const ShoppingBagList: FC<ShoppingBagListProps> = ({
  products,
  setProducts,
  delProduct,
}) => (
  <div className={styles.shoppingBagList}>
    {products.map(({ slug, quantity, attributes }) => (
      <ShoppingBagCard
        slug={slug}
        assignedQuantity={quantity}
        setProducts={setProducts}
        delProduct={delProduct}
        attributes={attributes}
      />
    ))}
  </div>
);

export default ShoppingBagList;
