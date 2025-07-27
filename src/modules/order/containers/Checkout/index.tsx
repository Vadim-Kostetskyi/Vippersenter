import CustomerDetails from "../CustomerDetails";
import OrderReview from "../OrderReview";
import styles from "./index.module.scss";

const Checkout = () => {
  return (
    <div className={styles.checkout}>
      <CustomerDetails />
      <OrderReview />
    </div>
  );
};

export default Checkout;