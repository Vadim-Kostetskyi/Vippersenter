import React, { useCallback } from "react";
import { useCreateVippsPaymentMutation } from "storeRedux/ordersApi";

const VippsButton: React.FC = () => {
  const [createVippsPayment, { isLoading, error }] =
    useCreateVippsPaymentMutation();

  const onPay = useCallback(async () => {
    try {
      const res = await createVippsPayment({
        orderId: "123",
        amount: 499, // NOK
        description: "Order #123",
        returnUrl: `${window.location.origin}/payment-success`,
        metadata: { source: "web" },
      }).unwrap();

      window.location.assign(res.redirectUrl);
    } catch {
      // unwrap() вже прокине помилку в error state RTK Query
      // тут можна нічого не робити, або додати свою аналітику
    }
  }, [createVippsPayment]);

  return (
    <div>
      <button onClick={onPay} disabled={isLoading}>
        {isLoading ? "Переходимо до Vipps..." : "Оплатити Vipps"}
      </button>

      {error && <div>Помилка створення платежу</div>}
    </div>
  );
};

export default VippsButton;
