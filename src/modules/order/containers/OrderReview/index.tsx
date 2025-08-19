import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ShoppingBagList from "modules/core/components/ShoppingBagList";
import { Attributes, CartItem, getCartItems } from "utils/card";
import styles from "./index.module.scss";
import OrderPrice from "modules/order/components/OrderPrice";

interface OrderReviewProps {
  deliveryPrice: number;
}

const OrderReview: FC<OrderReviewProps> = ({ deliveryPrice }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { t } = useTranslation();

  const cartPrices = cartItems.map((e) => e.price * e.quantity);
  const totalCartPrice = cartPrices.reduce((acc, num) => acc + num, 0);

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

    if (!item.attributes && !attributes) return false;

    if (!item.attributes || !attributes) return true;

    if (item.attributes.length !== attributes.length) return true;

    const isSame = item.attributes.every((attr) =>
      attributes.some(
        (a) => a.attributeName === attr.attributeName && a.value === attr.value
      )
    );

    return !isSame;
  });

  setCartItems(updatedCart);
  window.dispatchEvent(new Event("cartUpdated"));
};


  const prices = [
    {
      title: t("order.productPrice"),
      price: totalCartPrice,
      currency: t("currency"),
    },
    {
      title: t("order.shippingCost"),
      price: deliveryPrice,
      currency: t("currency"),
    },
    {
      title: t("order.total"),
      price: totalCartPrice + deliveryPrice,
      currency: t("currency"),
    },
  ];

  return (
    <div className={styles.orderReview}>
      <ShoppingBagList
        products={cartItems}
        setProducts={onSetProducts}
        delProduct={removeCartItem}
      />
      <div className={styles.priceBox}>
        {prices.map((props) => (
          <OrderPrice {...props} />
        ))}
      </div>
    </div>
  );
};

export default OrderReview;
