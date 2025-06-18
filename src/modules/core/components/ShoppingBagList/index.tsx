import { FC } from "react";
import { CartItem } from "utils/card";
import ShoppingBagCard from "../ShoppingBagCard";

interface ShoppingBagListProps {
  products: CartItem[];
  setProducts: (items: CartItem[]) => void;
}

const ShoppingBagList: FC<ShoppingBagListProps> = ({
  products,
  setProducts,
}) => (
  <>
    {products.map(({ id, quantity }) => (
      <ShoppingBagCard id={id} quantity={quantity} setProducts={setProducts} />
    ))}
  </>
);

export default ShoppingBagList;
