import { FC } from "react";
import { useTranslation } from "react-i18next";
// import { PaymentCard } from "components/PaymentCard";
import { OrderFormData } from "../CheckoutInfo";
import VippsPay from "../VippsPayButton";
import { getCartItems } from "utils/card";
import { OrderPayload } from "storeRedux/types";
// import { PaymentMethod } from "types/types";
// import SelectingPaymentMethod from "modules/order/SelectingPaymentMethod";
import styles from "./index.module.scss";
import { emptyInputCheck } from "utils/emptyInputCheck";

interface PaymentProps {
  deliveryDetails: {
    formData: OrderFormData | null;
    totalPrice: number;
  };
}

const Payment: FC<PaymentProps> = ({ deliveryDetails }) => {
  // const [paymentMethod, setPaymentMethod] =
  //   useState<PaymentMethod>("bank_card");
  const { t } = useTranslation();

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
  const cartItems = getCartItems();

  // const onSetPaymentMethod = (item: PaymentMethod) => {
  //   setPaymentMethod(item);
  // };

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
      {/* <SelectingPaymentMethod
        paymentMethod={paymentMethod}
        onSetPaymentMethod={onSetPaymentMethod}
      /> */}
      {/* {paymentMethod === "banc_card" ? ( */}
      {/* <PaymentCard orderPayload={orderPayload} inputError={emptyInputCheck} /> */}
      {/* ) : ( */}
      <VippsPay
        orderPayload={orderPayload}
        inputError={() =>
          emptyInputCheck({
            formData: customerInfo,
            t,
          })
        }
      />
      <VippsPay
        methodType="CARD"
        orderPayload={orderPayload}
        inputError={() =>
          emptyInputCheck({
            formData: customerInfo,
            t,
          })
        }
      />
      {/* )} */}
    </section>
  );
};

export default Payment;
