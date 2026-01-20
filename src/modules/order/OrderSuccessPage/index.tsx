import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clearCart } from "utils/card";
import { useGetVippsPaymentStatusQuery } from "storeRedux/paymentApi";
import { useCreateOrderMutation } from "storeRedux/ordersApi";
import styles from "./index.module.scss";

const OrderSuccessPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  const storedOrder = localStorage.getItem("orderPayload");
  const orderPayload = storedOrder ? JSON.parse(storedOrder) : null;

  if (!orderPayload) {
    navigate("/checkout", { replace: true });
    return null;
  }

  const params = new URLSearchParams(location.search);
  const reference = params.get("returnReference");

  const { data, isLoading } = useGetVippsPaymentStatusQuery(reference || "", {
    skip: !reference,
  });

  useEffect(() => {
    if (!reference) {
      navigate("/checkout", { replace: true });
      return;
    }
    if (isLoading) return;
    if (!data) return;

    const handlePayment = async () => {
      // Оплата успішна
      if (data.state === "AUTHORIZED" || data.state === "CAPTURED") {
        setShow(true);
        await createOrder(orderPayload).unwrap();
        localStorage.removeItem("orderPayload");
        clearCart();
        localStorage.removeItem("paymentSuccess");
      } else {
        // Оплата не пройшла → редірект на checkout
        navigate("/checkout", { replace: true });
        return;
      }
    };
    console.log(data);

    handlePayment();
  }, [reference, data, isLoading, navigate, createOrder, orderPayload]);

  if (!show) return <>error</>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>

        <h1>{t("order.thankForPurchase")}</h1>

        <p>
          {t("order.orderHasBeenPaid")}
          <br />
          {t("order.startedProcessingIt")}
        </p>

        <div className={styles.actions}>
          <button className={styles.secondary} onClick={() => navigate("/")}>
            {t("order.toMainPage")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
