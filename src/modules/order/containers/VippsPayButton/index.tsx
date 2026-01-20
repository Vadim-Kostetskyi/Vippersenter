import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useCreateVippsPaymentMutation } from "storeRedux/paymentApi";
import { OrderPayload } from "storeRedux/types";
import vipsImage from "assets/image/vippsIcon.png";
import styles from "./index.module.scss";

interface VippsPaymentButtonProps {
  methodType?: "WALLET" | "CARD";
  returnUrl?: string;
  orderPayload: OrderPayload;
  inputError: () => boolean;
}

const VippsPaymentButton: FC<VippsPaymentButtonProps> = ({
  methodType = "WALLET", // за замовчуванням Vipps Wallet
  returnUrl = "https://vippersenter.no/order-success",
  orderPayload,
  inputError,
}) => {
  const [createVippsPayment, { isLoading }] = useCreateVippsPaymentMutation();

  const { t } = useTranslation();

  const orderId = orderPayload.paymentIntentId.toString();
  const amount = orderPayload.amount;

  const handlePay = useCallback(async () => {
    const hasError = inputError();
    if (hasError) return;
    try {
      const { redirectUrl, reference } = await createVippsPayment({
        orderId,
        amount,
        returnUrl,
        methodType,
      }).unwrap();

      if (!redirectUrl) throw new Error("Vipps redirectUrl missing");
      localStorage.setItem("paymentSuccess", "true");
      localStorage.setItem("orderPayload", JSON.stringify(orderPayload));

      // Редірект на сторінку Vipps або Card
      window.location.href = `${redirectUrl}&returnReference=${encodeURIComponent(reference)}`;
    } catch (err) {
      console.error("Vipps payment error:", err);
      alert(t("payment.createError"));
    }
  }, [createVippsPayment, orderId, amount, returnUrl, methodType]);

  return (
    <button
      className={methodType === "CARD" ? styles.buttonCard : styles.button}
      onClick={handlePay}
      disabled={isLoading}
    >
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
