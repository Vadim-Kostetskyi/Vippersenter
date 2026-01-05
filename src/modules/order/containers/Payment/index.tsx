import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { PaymentCard } from "components/PaymentCard";
import vippsImg from "assets/image/vipps.png";
import cardImg from "assets/image/card.png";
import { OrderFormData } from "../CheckoutInfo";
import styles from "./index.module.scss";
// import VippsPay from "../VippsPayButton";

interface PaymentProps {
  totalPrice: number;
  deliveryDetails: {
    formData: OrderFormData | null;
    totalPrice: number;
  };
}

const Payment: FC<PaymentProps> = ({ totalPrice, deliveryDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState("banc_card");
  const { t } = useTranslation();
  console.log(deliveryDetails);

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

        <label className={styles.post}>
          <input
            type="radio"
            name="paymentMethod"
            value="vipps"
            checked={paymentMethod === "vipps"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>
            <img src={vippsImg} alt="vipps" />
          </span>
        </label>
      </div>

      {paymentMethod === "banc_card" ? (
        <PaymentCard totalPrice={totalPrice} />
      ) : (
        // <VippsPay
        // amountNok={499}
        // description="Оплата замовлення #123"
        // endpoint="/api/vipps/create-payment"
        // orderId="123"
        // customer={{ email: "test@mail.com" }}
        // />
        "vipps"
      )}
    </section>
  );
};

export default Payment;
