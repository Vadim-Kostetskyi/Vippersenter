import { useState } from "react";
import CustomerDetails from "../CustomerDetails";
import OrderReview from "../OrderReview";
import Payment from "../Payment";
import styles from "./index.module.scss";

const CheckoutInfo = () => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const onSetDeliveryPrice = (price: number) => {
    setDeliveryPrice(price);
  };

  const onSetTotalPrice = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <div className={styles.checkoutInfo}>
      <CustomerDetails setDeliveryPrice={onSetDeliveryPrice} />
      <div>
        <OrderReview
          deliveryPrice={deliveryPrice}
          setTotalPrice={onSetTotalPrice}
        />
        <Payment totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CheckoutInfo;
