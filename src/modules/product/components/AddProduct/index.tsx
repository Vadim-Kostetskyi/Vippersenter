import Plus from "assets/svg/Plus";
import styles from "./index.module.scss";
import { FC } from "react";

interface AddProductProps {
  onModalOpen: () => void;
}

const AddProduct: FC<AddProductProps> = ({ onModalOpen }) => {
  return (
    <button className={styles.button} onClick={onModalOpen}>
      <Plus className={styles.icon} />
    </button>
  );
};

export default AddProduct;
