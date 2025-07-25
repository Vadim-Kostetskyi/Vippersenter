import CustomerDetails from "../CustomerDetails";
import styles from "./index.module.scss";

const Checkout = () => {
  return (
    <div className={styles.checkout}>
      <CustomerDetails />
    </div>
  );
};

export default Checkout;