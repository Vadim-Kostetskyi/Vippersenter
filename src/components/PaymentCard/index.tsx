import { FC, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  amount: number;
}

interface CheckoutProps {
  totalPrice: number;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await fetch("/create-payment-intent.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // конвертуємо в øre
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        toast.error(t("payment.error", { message: result.error.message }));
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success(t("payment.success"));
      }
    } catch (err) {
      toast.error(t("payment.createError"));
    }

    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{t("payment.cardPayment")}</h2>

      <div className={styles.amount}>
        {t("payment.amountPayable")}: {amount} kr
      </div>

      <div className={styles.cardWrapper}>
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        className={styles.payButton}
        onClick={handlePay}
        disabled={!stripe || loading}
      >
        {loading ? t("payment.pleaseWait") : t("payment.pay")}
      </button>

      {/* Контейнер для Toastify */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export const PaymentCard: FC<CheckoutProps> = ({ totalPrice }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={totalPrice} />
    </Elements>
  );
};
