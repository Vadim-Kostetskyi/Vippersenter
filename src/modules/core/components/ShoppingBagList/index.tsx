import { FC } from "react";
import ShoppingBagCard from "../ShoppingBagCard";
import { CartAttributes, CartItem } from "types/types";
import styles from "./index.module.scss";

interface ShoppingBagListProps {
  products: CartItem[];
  setProducts: (items: CartItem[]) => void;
  delProduct: (productId: string, attributes?: CartAttributes[]) => void;
  countError?: (isError: boolean) => void;
}

const ShoppingBagList: FC<ShoppingBagListProps> = ({
  products,
  setProducts,
  delProduct,
  countError,
}) => (
  <div className={styles.shoppingBagList}>
    {products.map(
      (
        { slug, quantity, attributes, price, hasChanged, availableQuantity },
        index,
      ) => (
        <ShoppingBagCard
          key={slug + index}
          slug={slug}
          savedPrice={price}
          assignedQuantity={quantity}
          setProducts={setProducts}
          delProduct={delProduct}
          assignedAttributes={attributes}
          hasChanged={hasChanged}
          availableQuantity={availableQuantity}
          countError={countError}
        />
      ),
    )}
  </div>
);

export default ShoppingBagList;
