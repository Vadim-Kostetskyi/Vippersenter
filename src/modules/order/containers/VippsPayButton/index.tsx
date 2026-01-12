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
      // unwrap() прокине помилку в RTK Query
    }
  }, [createVippsPayment]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onPay}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200
          ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z"
              ></path>
            </svg>
            Переходимо до Vipps...
          </span>
        ) : (
          "Оплатити Vipps"
        )}
      </button>

      {error && (
        <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-center">
          Помилка створення платежу. Спробуйте ще раз.
        </div>
      )}
    </div>
  );
};

export default VippsButton;
