import { useTranslation } from "react-i18next";
import CategoryNames from "components/CategoryNames";
import Dropdown from "components/Dropdown";
import AddProductModalOptions from "modules/product/components/AddProductModalOptions";
import styles from "./index.module.scss";

import image from "assets/image/img_3912-scaled.webp";

const AddProductModal = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);
  return (
    <div className={styles.addProductModal}>
      <div className={styles.wrapper}>
        <Dropdown title={t("category")} list={list} />
        <img src={image} alt="" className={styles.image} />
        <AddProductModalOptions />
      </div>
    </div>
  );
};

export default AddProductModal;
