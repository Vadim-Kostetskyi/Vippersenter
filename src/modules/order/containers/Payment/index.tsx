import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { PaymentCard } from "components/PaymentCard";
// import vippsImg from "assets/image/vipps.png";
import cardImg from "assets/image/card.png";
import { OrderFormData } from "../CheckoutInfo";
// import VippsPay from "../VippsPayButton";
import { getCartItems } from "utils/card";
import styles from "./index.module.scss";

interface PaymentProps {
  deliveryDetails: {
    formData: OrderFormData | null;
    totalPrice: number;
  };
}

const Payment: FC<PaymentProps> = ({ deliveryDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState("banc_card");
  const { t } = useTranslation();
  console.log(deliveryDetails);

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
    setDeliveryAddress,
  } = customerInfo;

  const totalPrice = deliveryDetails.totalPrice;
  console.log(deliveryDetails);

  const emptyInputCheck = (): boolean => {
    const hasError =
      name.trim().length === 0 ||
      lastName.trim().length === 0 ||
      phone.trim().length === 0 ||
      email.trim().length === 0 ||
      town.trim().length === 0;

    if (hasError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.error(t("payment.fillError"));
      return true;
    }

    if (deliveryType === "post" && setDeliveryAddress.length === 0) {
      window.scrollTo({ top: 200, behavior: "smooth" });
      toast.error(t("payment.deliveryError"));
      return true;
    }

    return false;
  };

  const orderPayload = { deliveryDetails, goods: getCartItems() };
  const orderPayload2 = {};///////////////////////////////////fgfhgfgh
  console.log(orderPayload);

  return (
    <section className={styles.payment}>
      <h3>{t("payment.payment")}</h3>
      <div className={styles.paymentMethodBox}>
        <label className={styles.post}>
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
        </label>

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
      <PaymentCard totalPrice={totalPrice} inputError={emptyInputCheck} />
      {/* ) : ( */}
      {/* <VippsPay */}
      {/* // amountNok={499}
        // description="Оплата замовлення #123"
        // endpoint="/api/vipps/create-payment"
        // orderId="123"
        // customer={{ email: "test@mail.com" }}
        /> */}
      {/* // "vipps" */}
      {/* )} */}
      {/* <button onClick={emptyInputCheck}>emptyInputCheck</button> */}
    </section>
  );
};

export default Payment;
