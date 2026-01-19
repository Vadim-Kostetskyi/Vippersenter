import { useState } from "react";
import CustomerDetails from "../CustomerDetails";
import OrderReview from "../OrderReview";
import Payment from "../Payment";
import styles from "./index.module.scss";

export type DeliveryType = "post" | "pickup";
export type Carrier = "postnord" | "posten" | "selfDelivery" | "";

export type OrderFormData = {
  deliveryType: DeliveryType;
  carrier: Carrier;
  orderComments: string;
} & Record<string, string>;

const CheckoutInfo = () => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isDelivery, setIsdelivery] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState<OrderFormData | null>(null);

  const onSetDeliveryPrice = (price: number) => setDeliveryPrice(price);
  const onSetIsDelivery = (type: boolean) => setIsdelivery(type);
  const onSetTotalPrice = (price: number) => setTotalPrice(price);

  const onChangeForm = (data: OrderFormData) => {
    setFormData(data);
  };

  const orderDetails = {
    formData,
    totalPrice,
  };

  return (
    <div className={styles.checkoutInfo}>
      <CustomerDetails
        setDeliveryPrice={onSetDeliveryPrice}
        setIsSetDelivery={onSetIsDelivery}
        onChangeForm={onChangeForm}
      />

      <div>
        <OrderReview
          deliveryPrice={deliveryPrice}
          setTotalPrice={onSetTotalPrice}
          isDelivery={isDelivery}
        />

        <Payment deliveryDetails={orderDetails} />

        {/* Для перевірки */}
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default CheckoutInfo;
