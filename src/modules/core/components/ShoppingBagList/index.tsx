import { getCartItems } from "utils/cart";
import ShoppingBagCard from "../ShoppingBagCard";

const ShoppingBagList = () => {
  const cartItems = getCartItems();

  return (
    <>
      {cartItems.map(({ id, quantity }) => (
        <ShoppingBagCard id={id} quantity={quantity} />
      ))}
    </>
  );
};

export default ShoppingBagList;
