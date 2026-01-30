import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ShoppingBagList from "modules/core/components/ShoppingBagList";
import { getCartItems } from "utils/card";
import OrderPrice from "modules/order/components/OrderPrice";
import { CartAttributes, CartItem } from "types/types";
import styles from "./index.module.scss";

interface OrderReviewProps {
  deliveryPrice: number;
  setTotalPrice: (price: number) => void;
  isDelivery: boolean;
}

const OrderReview: FC<OrderReviewProps> = ({
  // deliveryPrice,
  setTotalPrice,
  isDelivery,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { t } = useTranslation();

  const cartPrices = cartItems.map((e) => e.price * e.quantity);
  const totalCartPrice = cartPrices.reduce((acc, num) => acc + num, 0);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  useEffect(() => {
    // setTotalPrice(totalCartPrice + deliveryPrice);
    setTotalPrice(totalCartPrice);
  }, [totalCartPrice]);

  const onSetProducts = (items: CartItem[]) => {
    setCartItems(items);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeCartItem = (slug: string, attributes?: CartAttributes[]) => {
    const updatedCart = cartItems.filter((item) => {
      if (item.slug !== slug) return true;

      if (!item.attributes && !attributes) return false;

      if (!item.attributes || !attributes) return true;

      if (item.attributes.length !== attributes.length) return true;

      const isSame = item.attributes.every((attr) =>
        attributes.some(
          (a) => a.attribute === attr.attribute && a.value === attr.value,
        ),
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
      price: isDelivery ? t("order.deliveryPrice") : t("order.free"),
      currency: t("currency"),
    },
    {
      title: t("order.total"),
      price: totalCartPrice,
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
          <OrderPrice key={props.title} {...props} />
        ))}
      </div>
    </div>
  );
};

export default OrderReview;
