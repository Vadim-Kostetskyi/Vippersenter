import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useCreateVippsPaymentMutation } from "storeRedux/ordersApi";
import vipsImage from "assets/image/vippsIcon.png";
import styles from "./index.module.scss";

interface VippsPaymentButtonProps {
  orderId: string;
  amount: number; // у NOK
  methodType?: "WALLET" | "CARD";
  returnUrl?: string;
}

const VippsPaymentButton: FC<VippsPaymentButtonProps> = ({
  orderId,
  amount,
  methodType = "WALLET", // за замовчуванням Vipps Wallet
  returnUrl = "/order-success",
}) => {
  const [createVippsPayment, { isLoading }] = useCreateVippsPaymentMutation();

  const { t } = useTranslation();

  const handlePay = useCallback(async () => {
    try {
      const { redirectUrl } = await createVippsPayment({
        orderId,
        amount,
        returnUrl,
        methodType,
      }).unwrap();

      if (!redirectUrl) throw new Error("Vipps redirectUrl missing");
      localStorage.setItem("paymentSuccess", "true");

      // Редірект на сторінку Vipps або Card
      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Vipps payment error:", err);
      alert(t("payment.createError"));
    }
  }, [createVippsPayment, orderId, amount, returnUrl, methodType]);

  return (
    <button onClick={handlePay} disabled={isLoading} className={styles.button}>
      <img src={vipsImage} alt="Vipps" className={styles.icon} />
      {isLoading
        ? t("payment.pleaseWait")
        : methodType === "CARD"
          ? t("payment.cardPayment")
          : `${t("payment.payWithVipps")} / MobilePay`}
    </button>
  );
};

export default VippsPaymentButton;
