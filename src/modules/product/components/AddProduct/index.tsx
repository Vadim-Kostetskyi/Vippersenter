import Plus from "assets/svg/Plus";
import styles from "./index.module.scss";

const AddProduct = () => {
  return (
    <button className={styles.button}>
      <Plus className={styles.icon} />
    </button>
  );
};

export default AddProduct;
