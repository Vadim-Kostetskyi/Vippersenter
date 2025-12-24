import { FC } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCreatePaymentIntentByCreditCardMutation } from "storeRedux/paymentApi";
import styles from "./index.module.scss";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutProps {
  totalPrice: number;
}

const CheckoutForm: FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { isLoading }] =
    useCreatePaymentIntentByCreditCardMutation();

  const { t } = useTranslation();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    try {
      const { clientSecret } = await createPaymentIntent({ amount }).unwrap();

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
    } catch (err: any) {
      toast.error(t("payment.createError"));
    }
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
        disabled={isLoading || !stripe}
      >
        {isLoading ? t("payment.pleaseWait") : t("payment.pay")}
      </button>
    </div>
  );
};

export const PaymentCard: FC<CheckoutProps> = ({ totalPrice }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={totalPrice} />
  </Elements>
);
