import { useState } from "react";
import CustomerDetails from "../CustomerDetails";
import OrderReview from "../OrderReview";
import styles from "./index.module.scss";

const CheckoutInfo = () => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const onSetDeliveryPrice = (price: number) => {
    setDeliveryPrice(price);
  };

  return (
    <div className={styles.checkoutInfo}>
      <CustomerDetails setPrice={onSetDeliveryPrice} />
      <OrderReview deliveryPrice={deliveryPrice} />
    </div>
  );
};

export default CheckoutInfo;