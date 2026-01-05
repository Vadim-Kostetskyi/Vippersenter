import { useCreateVippsPaymentMutation } from "storeRedux/ordersApi";

const VippsButton = () => {
  const [createVippsPayment, { isLoading, error }] =
    useCreateVippsPaymentMutation();

  const onPay = async () => {
    const res = await createVippsPayment({
      orderId: "123",
      amountNok: 499,
      description: "Order #123",
      returnUrl: `${window.location.origin}/payment-success`,
      metadata: { source: "web" },
    }).unwrap();

    window.location.href = res.redirectUrl;
  };

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
