import { useState } from "react";
import CustomerDetails from "../CustomerDetails";
import OrderReview from "../OrderReview";
import Payment from "../Payment";
import styles from "./index.module.scss";

const CheckoutInfo = () => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isDelivery, setIsdelivery] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const onSetDeliveryPrice = (price: number) => {
    setDeliveryPrice(price);
  };

  const onSetIsDelivery = (type: boolean) => {
    setIsdelivery(type);
  };

  const onSetTotalPrice = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <div className={styles.checkoutInfo}>
      <CustomerDetails
        setDeliveryPrice={onSetDeliveryPrice}
        setIsSetDelivery={onSetIsDelivery}
      />
      <div>
        <OrderReview
          deliveryPrice={deliveryPrice}
          setTotalPrice={onSetTotalPrice}
          isDelivery={isDelivery}
        />
        <Payment totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CheckoutInfo;
