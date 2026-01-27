import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clearCart } from "utils/card";
import { useGetVippsPaymentStatusQuery } from "storeRedux/paymentApi";
import { useCreateOrderMutation } from "storeRedux/ordersApi";
import { useUpdateProductQuantityDecreaseMutation } from "storeRedux/productsApi";
import styles from "./index.module.scss";

const OrderSuccessPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [decreaseProductQuantity] = useUpdateProductQuantityDecreaseMutation();

  // 🔒 флаг, щоб createOrder виконався ТІЛЬКИ 1 раз
  const createdRef = useRef(false);

  const storedOrder = localStorage.getItem("orderPayload");
  const reference = localStorage.getItem("vippsReference");

  // ❗ перевірки тільки в useEffect
  useEffect(() => {
    if (!storedOrder || !reference) {
      navigate("/checkout", { replace: true });
    }
  }, [navigate]);

  const orderPayload = storedOrder ? JSON.parse(storedOrder) : null;

  const { data } = useGetVippsPaymentStatusQuery(reference ?? "", {
    skip: !reference,
    pollingInterval: 1500, // обовʼязково для картки
  });
  console.log(data);

  useEffect(() => {
    if (!data || createdRef.current) return;

    // ✅ УСПІШНА ОПЛАТА
    const SUCCESS_STATES = ["AUTHORIZED", "CAPTURED", "COMPLETED"];

    if (SUCCESS_STATES.includes(data.state)) {
      createdRef.current = true;

      (async () => {
        try {
          await createOrder(orderPayload).unwrap();
          orderPayload.items.forEach((item: any) => {
            const mainAttr = item.attributes[0]?.attribute ?? "";
            const secondaryAttr = item.attributes[1]?.attribute ?? "";
            const tertiaryAttr = item.attributes[2]?.attribute ?? "";

            decreaseProductQuantity({
              slug: item.slug,
              quantity: item.quantity,
              value_main: mainAttr,
              value_secondary: secondaryAttr,
              value_tertiary: tertiaryAttr,
            });
          });
          clearCart();
          localStorage.removeItem("orderPayload");
          localStorage.removeItem("vippsReference");
          setShow(true);
        } catch (e) {
          console.error("Create order failed", e);
          navigate("/checkout", { replace: true });
        }
      })();

      return;
    }

    // ❌ НЕУСПІШНА ОПЛАТА
    if (["FAILED", "ABORTED"].includes(data.state)) {
      navigate("/checkout", { replace: true });
    }
  }, [data, createOrder, orderPayload, navigate]);

  if (!show) return null;

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
