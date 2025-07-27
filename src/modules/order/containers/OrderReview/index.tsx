import { useEffect, useState } from "react";
import ShoppingBagList from "modules/core/components/ShoppingBagList";
import { Attributes, CartItem, getCartItems } from "utils/card";
import styles from "./index.module.scss";

const OrderReview = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const onSetProducts = (items: CartItem[]) => {
    setCartItems(items);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeCartItem = (slug: string, attributes?: Attributes[]) => {
    const updatedCart = cartItems.filter((item) => {
      if (item.slug !== slug) return true;

      if (!item.attributes && !attributes) return true;
      if (!item.attributes || !attributes) return false;
      if (item.attributes.length !== attributes.length) return true;

      const isSame = item.attributes.every((attr) =>
        attributes.some(
          (a) =>
            a.attributeName === attr.name &&
            a.attributeName === attr.attributeName
        )
      );

      return !isSame;
    });

    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  return (
    <div className={styles.orderReview}>
      <ShoppingBagList
        products={cartItems}
        setProducts={onSetProducts}
        delProduct={removeCartItem}
      />
    </div>
  );
};

export default OrderReview;
