import { FC, useCallback } from "react";
import { useCreateVippsPaymentMutation } from "storeRedux/ordersApi";

interface VippsPaymentButtonProps {
  orderId: string;
  amount: number; // NOK
}

const VippsPaymentButton: FC<VippsPaymentButtonProps> = ({
  orderId,
  amount,
}) => {
  const [createVippsPayment, { isLoading }] = useCreateVippsPaymentMutation();

  const handlePay = useCallback(async () => {
    try {
      const { redirectUrl } = await createVippsPayment({
        orderId,
        amount,
        returnUrl: "/",
      }).unwrap();

      if (!redirectUrl) throw new Error("Vipps redirectUrl missing");

      // Редірект на Vipps: сам вибирає телефон/картку
      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Vipps payment error:", err);
      alert("Не вдалося ініціювати платіж Vipps");
    }
  }, [createVippsPayment, orderId, amount]);

  return (
    <button onClick={handlePay} disabled={isLoading} style={styles.button}>
      <img src="/vipps.svg" alt="Vipps" style={styles.icon} />
      {isLoading ? "Перехід до оплати…" : "Оплатити Vipps / карткою"}
    </button>
  );
};

export default VippsPaymentButton;

const styles: Record<string, React.CSSProperties> = {
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 18px",
    backgroundColor: "#ff5b24",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  icon: {
    height: 22,
  },
};
