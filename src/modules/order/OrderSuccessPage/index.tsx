import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

const OrderSuccessPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

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
