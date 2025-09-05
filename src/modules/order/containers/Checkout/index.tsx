import { useTranslation } from "react-i18next";
import CheckoutInfo from "../CheckoutInfo";
import styles from "./index.module.scss";

const Checkout = () => {

  const {t} = useTranslation()

  return (
    <div className={styles.checkout}>
      <h1>{t("order.placingOrder")}</h1>
      <CheckoutInfo />
    </div>
  );
};

export default Checkout;