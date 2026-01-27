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
  methodType = "WALLET",
  returnUrl = "https://vippersenter.no/order-success",
  orderPayload,
  inputError,
}) => {
  const [createVippsPayment, { isLoading }] = useCreateVippsPaymentMutation();

  const { t } = useTranslation();

  const orderId = orderPayload.paymentIntentId.toString();
  const amount = orderPayload.amount;

  const handlePay = useCallback(async () => {
    if (inputError()) return;

    try {
      const { redirectUrl, reference } = await createVippsPayment({
        orderId,
        amount,
        returnUrl,
        methodType,
      }).unwrap();

      if (!redirectUrl || !reference) {
        throw new Error("Vipps response invalid");
      }

      localStorage.setItem("vippsReference", reference);
      localStorage.setItem("orderPayload", JSON.stringify(orderPayload));

      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Vipps payment error:", err);
      alert(t("payment.createError"));
    }
  }, [
    createVippsPayment,
    orderId,
    amount,
    returnUrl,
    methodType,
    orderPayload,
    inputError,
    t,
  ]);

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
