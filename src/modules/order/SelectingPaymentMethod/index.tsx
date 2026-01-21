import { FC } from "react";
import vippsImg from "assets/image/vipps.png";
import cardImg from "assets/image/card.png";
import { PaymentMethod } from "types/types";
import styles from "./index.module.scss";

interface SelectingPaymentMethodProps {
  paymentMethod: PaymentMethod;
  onSetPaymentMethod: (item: PaymentMethod) => void;
}

const SelectingPaymentMethod: FC<SelectingPaymentMethodProps> = ({
  paymentMethod,
  onSetPaymentMethod,
}) => (
  <div className={styles.paymentMethodBox}>
    <label className={styles.post}>
      <input
        type="radio"
        name="paymentMethod"
        value="bank_card"
        checked={paymentMethod === "bank_card"}
        onChange={(e) => onSetPaymentMethod(e.target.value as PaymentMethod)}
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
        onChange={(e) => onSetPaymentMethod(e.target.value as PaymentMethod)}
      />
      <span>
        <img src={vippsImg} alt="vipps" />
      </span>
    </label>
  </div>
);

export default SelectingPaymentMethod;
