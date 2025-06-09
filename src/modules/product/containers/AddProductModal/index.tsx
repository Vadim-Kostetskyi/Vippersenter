import { useTranslation } from "react-i18next";
import { FC } from "react";
import CategoryNames from "components/CategoryNames";
import Dropdown from "components/Dropdown";
import AddProductModalOptions from "modules/product/components/AddProductModalOptions";
import Cross from "assets/svg/Cross";
import styles from "./index.module.scss";

import image from "assets/image/img_3912-scaled.webp";

interface AddProductModalProps {
  onModalClose: () => void;
}

const AddProductModal: FC<AddProductModalProps> = ({ onModalClose }) => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <div className={styles.addProductModal}>
      <div className={styles.wrapper}>
        <button className={styles.closeBtn} onClick={onModalClose}>
          <Cross />
        </button>
        <Dropdown title={t("category")} list={list} />
        <img src={image} alt="" className={styles.image} />
        <AddProductModalOptions onModalClose={onModalClose} />
      </div>
    </div>
  );
};

export default AddProductModal;
