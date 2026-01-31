import { FC } from "react";
import { useTranslation } from "react-i18next";
import { OrderFormData } from "../CheckoutInfo";
import VippsPay from "../VippsPayButton";
import { getCartItems } from "utils/card";
import { OrderPayload } from "storeRedux/types";
import { emptyInputCheck } from "utils/emptyInputCheck";
import styles from "./index.module.scss";

interface PaymentProps {
  deliveryDetails: {
    formData: OrderFormData | null;
    totalPrice: number;
  };
  pay: () => void;
  countError: boolean;
}

const Payment: FC<PaymentProps> = ({ deliveryDetails, pay, countError }) => {
  const { t } = useTranslation();

  const cartItems = getCartItems();

  let customerInfo = null;
  if (deliveryDetails.formData) {
    customerInfo = deliveryDetails.formData;
  }
  if (!customerInfo) return;

  const {
    name,
    lastName,
    phone,
    email,
    town,
    deliveryType,
    orderComments,
    setDeliveryAddress,
  } = customerInfo;

  const totalPrice = deliveryDetails.totalPrice;

  const orderPayload: OrderPayload = {
    paymentIntentId: Number(
      `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`,
    ),
    amount: totalPrice,
    currency: t("currency"),
    customer: {
      name,
      lastName,
      phone,
      email,
      town,
    },
    orderComments,
    deliveryType,
    deliveryAddress: setDeliveryAddress,
    items: cartItems,
  };

  return (
    <section className={styles.payment}>
      <h3>{t("payment.payment")}</h3>
      <VippsPay
        methodType="WALLET"
        orderPayload={orderPayload}
        inputError={() =>
          emptyInputCheck({
            formData: customerInfo,
            t,
            countError,
          })
        }
        pay={pay}
      />
      <VippsPay
        methodType="CARD"
        orderPayload={orderPayload}
        inputError={() =>
          emptyInputCheck({
            formData: customerInfo,
            t,
            countError,
          })
        }
        pay={pay}
      />
    </section>
  );
};

export default Payment;
