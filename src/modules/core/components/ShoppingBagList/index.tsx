import { FC } from "react";
import { CartItem } from "utils/card";
import ShoppingBagCard from "../ShoppingBagCard";

interface ShoppingBagListProps {
  products: CartItem[];
  setProducts: (items: CartItem[]) => void;
  delProduct: (productId: string) => void;
}

const ShoppingBagList: FC<ShoppingBagListProps> = ({
  products,
  setProducts,
  delProduct,
}) => (
  <>
    {products.map(({ id, quantity }) => (
      <ShoppingBagCard
        id={id}
        quantity={quantity}
        setProducts={setProducts}
        delProduct={delProduct}
      />
    ))}
  </>
);

export default ShoppingBagList;
