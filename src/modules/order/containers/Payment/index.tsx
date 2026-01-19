import { FC } from "react";
import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
// import { PaymentCard } from "components/PaymentCard";
// import vippsImg from "assets/image/vipps.png";
// import cardImg from "assets/image/card.png";
import { OrderFormData } from "../CheckoutInfo";
import VippsPay from "../VippsPayButton";
import { getCartItems } from "utils/card";
import styles from "./index.module.scss";
import { OrderPayload } from "storeRedux/types";

interface PaymentProps {
  deliveryDetails: {
    formData: OrderFormData | null;
    totalPrice: number;
  };
}

const Payment: FC<PaymentProps> = ({ deliveryDetails }) => {
  // const [paymentMethod, setPaymentMethod] = useState("banc_card");
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

  // const emptyInputCheck = (): boolean => {
  //   const hasError =
  //     name.trim().length === 0 ||
  //     lastName.trim().length === 0 ||
  //     phone.trim().length === 0 ||
  //     email.trim().length === 0 ||
  //     town.trim().length === 0;

  //   if (hasError) {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //     toast.error(t("payment.fillError"));
  //     return true;
  //   }

  //   if (deliveryType === "post" && setDeliveryAddress.length === 0) {
  //     window.scrollTo({ top: 200, behavior: "smooth" });
  //     toast.error(t("payment.deliveryError"));
  //     return true;
  //   }

  //   return false;
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
      <div className={styles.paymentMethodBox}>
        {/* <label className={styles.post}>
          <input
            type="radio"
            name="paymentMethod"
            value="banc_card"
            checked={paymentMethod === "banc_card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>
            <img src={cardImg} alt="banc_card" />
          </span>
        </label> */}

        {/* <label className={styles.post}>
          <input
            type="radio"
            name="paymentMethod"
            value="vipps"
            checked={paymentMethod === "vipps"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Levering
            <img src={vippsImg} alt="vipps" />
          </span>
        </label> */}
      </div>
      {/* {paymentMethod === "banc_card" ? ( */}
      {/* <PaymentCard orderPayload={orderPayload} inputError={emptyInputCheck} /> */}
      {/* ) : ( */}
      <VippsPay
        amount={orderPayload.amount}
        orderId={orderPayload.paymentIntentId.toString()}
      />
      {/* впвпа
      <VippsPay
        amount={orderPayload.amount}
        orderId={orderPayload.paymentIntentId.toString()}
        methodType="WALLET" // або "CARD"
        returnUrl="/order-success"
      /> */}
      {/* // "vipps" */}
      {/* )} */}
      {/* <button onClick={emptyInputCheck}>emptyInputCheck</button> */}
    </section>
  );
};

export default Payment;
