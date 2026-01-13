import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CartItem, clearCart } from "utils/card";
import { useCreatePaymentIntentByCreditCardMutation } from "storeRedux/paymentApi";
import { useCreateOrderMutation } from "storeRedux/ordersApi";
import { OrderFormData } from "modules/order/containers/CheckoutInfo";
import styles from "./index.module.scss";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutProps {
  inputError: () => boolean;
  orderPayload: {
    deliveryDetails: {
      formData: OrderFormData | null;
      totalPrice: number;
    };
    goods: CartItem[];
  };
}

interface CheckoutFormProps {
  inputError: () => boolean;
  orderPayload: {
    deliveryDetails: {
      formData: OrderFormData | null;
      totalPrice: number;
    };
    goods: CartItem[];
  };
}

const CheckoutForm: FC<CheckoutFormProps> = ({ inputError, orderPayload }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { isLoading }] =
    useCreatePaymentIntentByCreditCardMutation();

  const [createOrder] = useCreateOrderMutation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const amount = orderPayload.deliveryDetails.totalPrice;

  const handlePay = async () => {
    if (!stripe || !elements) return;

    const hasError = inputError();
    if (hasError) return;

    try {
      const { clientSecret } = await createPaymentIntent({ amount }).unwrap();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        toast.error(t("payment.error", { message: result.error.message }));
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        await createOrder(orderPayload).unwrap();
        // toast.success(t("payment.success"));

        clearCart();

        // ✅ редірект після успішної оплати
        navigate("/order-success", {
          replace: true,
          state: {
            paymentIntentId: result.paymentIntent.id,
          },
        });
      }
    } catch (err) {
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

export const PaymentCard: FC<CheckoutProps> = ({
  inputError,
  orderPayload,
}) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm inputError={inputError} orderPayload={orderPayload} />
  </Elements>
);
