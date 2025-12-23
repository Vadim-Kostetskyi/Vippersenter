import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { PaymentCard } from "components/PaymentCard";
import vippsImg from "assets/image/vipps.png";
import cardImg from "assets/image/card.png";
import styles from "./index.module.scss";

interface PaymentProps {
  totalPrice: number;
}

const Payment: FC<PaymentProps> = ({ totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("banc_card");
  const { t } = useTranslation();

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
        <>vipps</>
      )}
    </section>
  );
};

export default Payment;
